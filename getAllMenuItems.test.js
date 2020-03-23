/**
 * @jest-environment node
 */
import "regenerator-runtime/runtime.js";
import getAllMenuItems from './getAllMenuItems'

const db = {
  1: [2,4],
  2: [3],
  3: [],
  4: [],
}

const fetch = url => Promise.resolve(
  JSON.stringify({
    id: url.split('=')[1],
    name: 'John Doe',
    label: 'Main Item',
    children: db[url.split('=')[1]]
  })
)

const expectedResponse = {
  id: '1',
  name: 'John Doe',
  label: 'Main Item',
  children: [
    {
      id: '2',
      name: 'John Doe',
      label: 'Main Item',
      children: [
        {
          id: '3',
          name: 'John Doe',
          label: 'Main Item',
          children: []
        }
      ]
    },
    {
      id: '4',
      name: 'John Doe',
      label: 'Main Item',
      children: []
    }
  ]
}


test('getAllMenuItems returns the correct JSON', async () => {
  expect(await getAllMenuItems(fetch)(1)).toEqual(expectedResponse)
});
