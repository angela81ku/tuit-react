import {UserList} from "../components/profile/user-list";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllUsers} from "../services/users-service";
import axios from "axios";

//The following would cause error since it would mock everything in this file!!
// which means normal function call such as findAllUsers is forbidden
//jest.mock('axios');

const MOCKED_USERS = [
  {username: 'ellen_ripley', password: 'lv426', email: 'repley@weyland.com', _id: "123"},
  {username: 'sarah_conor', password: 'illbeback', email: 'sarah@bigjeff.com', _id: "234"},
]

test('user list renders static user array', () => {
  render(
    <HashRouter>
      <UserList users={MOCKED_USERS}/>
    </HashRouter>);
  let linkElement = screen.getByText(/ellen_ripley/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/sarah_conor/i);
  expect(linkElement).toBeInTheDocument();
});

test('user list renders async', async () => {
  const users = await findAllUsers();

  // const mock = jest.spyOn(axios, 'get');
  // mock.mockImplementation(() =>
  //     Promise.resolve({data: {users: MOCKED_USERS}}));
  render(
    <HashRouter>
      <UserList users={users}/>
    </HashRouter>);
  let linkElement = screen.getByText(/nasa/i);
  expect(linkElement).toBeInTheDocument();
  linkElement = screen.getByText(/charlie/i);
  expect(linkElement).toBeInTheDocument();
})
// user list renders mocked see user-list-mock.test.js
// test('user list renders mocked', async () => {
//   axios.get.mockImplementation(() =>
//     Promise.resolve({ data: {users: MOCKED_USERS} }));
//   const response = await findAllUsers();
//   const users = response.users;
//
//   render(
//     <HashRouter>
//       <UserList users={users}/>
//     </HashRouter>);
//
//   const user = screen.getByText(/ellen_ripley/i);
//   expect(user).toBeInTheDocument();
// });
