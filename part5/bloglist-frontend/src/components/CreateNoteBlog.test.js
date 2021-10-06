import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import CreateNewBlog from './CreateNewBlog'

test('5.16 ',()=>{

  // mock func handler
  const createBlog = jest.fn()

  const component = render(
    <CreateNewBlog createBlog={createBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  const form = component.container.querySelector('#create-form')

  fireEvent.change(titleInput,{
    target: { value: 'Title input' }
  })
  fireEvent.change(authorInput,{
    target: { value: 'Author Input' }
  })
  fireEvent.change(urlInput,{
    target: { value: 'URL Input' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls)
  expect(createBlog.mock.calls[0][0].title).toBe('Title input')
  expect(createBlog.mock.calls[0][0].author).toBe('Author Input')
  expect(createBlog.mock.calls[0][0].url).toBe('URL Input')

})

