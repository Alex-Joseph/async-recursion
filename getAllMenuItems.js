const getAllMenuItems = client => async id => {
  const parent = await getMenuItem(client)(id)

  return await getAllChildren(client)(parent)
}

const getUrl = id => `/api/getMenuItemById?id=${id}`

const getMenuItem = client => async id =>
  JSON.parse(await client(getUrl(id)))

const getAllChildren = client => async (parent) => {
  let cue = [parent]
  while (cue.length > 0) {
    let node = cue.shift()
    node.children = await loadChildren(client)(node.children)
    node.children.forEach(child => cue.push(child))
  }
  return parent
}

const loadChildren = client => async (arr) =>
  await Promise.all(arr.map(await getMenuItem(client)))

export default getAllMenuItems
