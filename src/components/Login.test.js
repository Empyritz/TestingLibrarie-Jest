import { fireEvent, render, screen, waitFor, act } from "@testing-library/react"
import Login from "./login/Login.jsx"
import axios from 'axios'
import { fetchUser} from './login/fetchUsers.js'
import React from 'react';
// import mockAxios from 'jest-mock-axios'

jest.mock("axios")


// describe("fetchUser", () =>{
//   afterEach(() => {
//     mockAxios.reset()
//   })
// })

// jest.mock("axios", ()=>({

//   __esModule: true,

//   default: {
//     get: ()=>({
//       data:{id: 1, name:"Leanne Graham"}
//     })
//   }
// }))

test('username input should be rendered', ()=> {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText("Username");
  expect(usernameInputEl).toBeInTheDocument()
})

test('password input should be rendered', ()=> {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText("Password");
  expect(passwordInputEl).toBeInTheDocument()
})

test('button input should be rendered', ()=> {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeInTheDocument()
})

test('password input should be empty', ()=> {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText("Password");
  expect(passwordInputEl.value).toBe("")
})

test('name input should be empty', ()=> {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText("Username");
  expect(usernameInputEl.value).toBe("")
})

test('button input should be disabled', ()=> {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled()
})

test('loading should not be rendered', ()=> {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent("Wait")
})

test('error message should be not visible', ()=> {
  render(<Login/>)
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible()
})

test('password input should change', ()=> {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText("Password");
  const testValue = "test"

  fireEvent.change(passwordInputEl, {target: {value:testValue} })
  expect(passwordInputEl.value).toBe(testValue)
})

test('name input should change', ()=> {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText("Username");
  const testValue = "test"

  fireEvent.change(usernameInputEl, {target: {value:testValue} })
  expect(usernameInputEl.value).toBe(testValue)
})

test('button should not be disabled when inputs exists', ()=> {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText("Username");
  const passwordInputEl = screen.getByPlaceholderText("Password");

  const testValue = "test"

  fireEvent.change(passwordInputEl, {target: {value:testValue} })
  fireEvent.change(usernameInputEl, {target: {value:testValue} })

  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toBeDisabled()
})

test('loading should be rendered when click', ()=> {
  render(<Login />);
  const usernameInputEl = screen.getByPlaceholderText("Username");
  const passwordInputEl = screen.getByPlaceholderText("Password");
  const buttonEl = screen.getByRole("button");

  const testValue = "test"

  fireEvent.change(passwordInputEl, {target: {value:testValue} })
  fireEvent.change(usernameInputEl, {target: {value:testValue} })
  fireEvent.click(buttonEl);

  expect(buttonEl).toHaveTextContent("Wait")
})


test('loading should not be rendered after fetching', async ()=> {
  render(<Login />);
  // const promise = new Promise
  const userMock = { data: { id: 1, name: "Leanne Graham" } }
  axios.get.mockResolvedValue(userMock)
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText("Username");
  const passwordInputEl = screen.getByPlaceholderText("Password");
  // const URL = "https://jsonplaceholder.typicode.com/users/1"
  
  const testValue = "test"
  
  fireEvent.change(passwordInputEl, {target: {value:testValue} })
  fireEvent.change(usernameInputEl, {target: {value:testValue} })
  fireEvent.click(buttonEl);
  
  await act(() => jest.fn())

  // const result = await act(async () => await fetchUser())

  // expect(axios.get).toHaveBeenCalledWith(URL)

  // expect(result).toEqual(userMock)

  await waitFor(() => expect(buttonEl).not.toHaveTextContent("Wait"))
})

test("user should be rendered after fetching", async () => {
  render(<Login/>)
  const userMock = {data: { id: 1, name: "Leanne Graham" }}
  axios.get.mockResolvedValueOnce(userMock)
  // const userMockFail = { id: 2, name: "Nada" }
  // const URL = "https://jsonplaceholder.typicode.com/users/1"
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText("Username");
  const passwordInputEl = screen.getByPlaceholderText("Password");

  const testValue = "test"
  
  fireEvent.change(passwordInputEl, {target: {value:testValue} })
  fireEvent.change(usernameInputEl, {target: {value:testValue} })
  fireEvent.click(buttonEl);

  //given
  

  //when
  // const result = await fetchUser()
  // // expect(result).toEqual(userMock)
  // // then 
  // expect(axios.get).toHaveBeenCalledWith(URL)
  // expect(result).toEqual(userMock)

  const userItem = await screen.findByText('Leanne Graham')
  expect(userItem).toBeInTheDocument()
})