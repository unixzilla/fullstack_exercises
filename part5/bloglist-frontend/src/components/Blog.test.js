import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('render title content', ()=>{
  const blog = {
    id:'1',
    title:'Testing 123',
    author:'Unix Chan',
    likes:1,
    url:'',
    user: { username:'Unix C' }

  }
  const user = {
    username:'Unix C'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog key={blog.id} blog={blog} user={user} update={mockHandler} remove={mockHandler}/>
  )

  component.debug()
  const div = component.container.querySelector('.blog-title')
  expect(div).toHaveTextContent('Testing 123')
  expect(div).toHaveTextContent('Unix Chan')

})

test('click show content', ()=>{
  const blog = {
    id:'1',
    title:'Testing 123',
    author:'Unix Chan',
    likes:1,
    url:'http://www.yahoo.com',
    user: { username:'Unix C' }

  }
  const user = {
    username:'Unix C'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog key={blog.id} blog={blog} user={user} update={mockHandler} remove={mockHandler}/>
  )

  const showButton = component.container.querySelector('.show-button').querySelector('button')
  const hideButton = component.container.querySelector('.hide-button')

  expect(hideButton).toHaveStyle('display:none')

  component.debug()

  fireEvent.click(showButton)

  expect(hideButton).toHaveStyle('display:block')

  component.debug()

})

test('click like button twice ', ()=>{
  const blog = {
    id:'1',
    title:'Testing 123',
    author:'Unix Chan',
    likes:1,
    url:'http://www.yahoo.com',
    user: { username:'Unix C' }

  }
  const user = {
    username:'Unix C'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog key={blog.id} blog={blog} user={user} update={mockHandler} remove={mockHandler}/>
  )

  const likeButton = component.container.querySelector('.like-button')
  const showButton = component.container.querySelector('.show-button')
  fireEvent.click(showButton.querySelector('button'))
  expect(showButton).toHaveStyle('display:none')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)

})
