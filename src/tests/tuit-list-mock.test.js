// import {Tuit} from "../components/tuits/tuit";
import Tuits from "../components/tuits/index.js";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import axios from "axios";
import {UserList} from "../components/profile/user-list";
import {findAllUsers} from "../services/users-service";

 jest.mock('axios');

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
    {tuit: "alice's tuit", _id: "12345",postedBy: "61ff2d90d1fc7ec76409f1d4"},
    {tuit: "bob's tuit", _id: "54321", postedBy: "61ff405d9267a798690c7e47"},
    {tuit: "charlie's tuit",_id: "58795", postedBy: "61ff40a69267a798690c7e4a"}
];

const MOCKED_TUITS_String = [
    "alice's tuit","bob's tuit","charlie's tuit"
];


// See tuit-list-mock.test.js
test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
    // the function below can put any other function, it doesn't matter...
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);

    let linkElement = screen.getByText(/alice's tuit/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/bob's tuit/i);
    expect(linkElement).toBeInTheDocument();
    linkElement = screen.getByText(/charlie's tuit/i);
    expect(linkElement).toBeInTheDocument();
});
