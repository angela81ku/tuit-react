// /**
//  * @jest-environment node
//  */
import {createTuit,deleteTuit,deleteTuitByContent} from "../services/tuits-service";
import {deleteUsersByUsername} from "../services/users-service"
// import axios from "axios";
// axios.defaults.adapter = require('axios/lib/adapters/http');

describe('can create tuit with REST API', () => {
    //   let testid;
    const user1 ={
        username: 'ellenripley',
        password: 'lv426',
        email: 'ellenripley@aliens.com',
        _id: 134246
    };
    const tuit1 = {
        tuit: "tuittest1",
        // postedBy: user1,
        postedOn: "2022-03-22",

    };
    beforeAll(() => {
        deleteTuitByContent(tuit1.tuit);
        deleteUsersByUsername(user1.username);

        return
    });

    afterAll(() => {
        return deleteTuitByContent(tuit1.tuit);
    });

    test('can insert with REST API', async () => {

        try {
            const newTuit = await createTuit(user1._id, tuit1);
            // testid = newTuit._id;
            expect(newTuit.tuit)
                .toEqual(tuit1.tuit);
            expect(newTuit.postedBy)
                .toEqual(tuit1.postedBy);
            expect(newTuit.postedOn)
                .toEqual(tuit1.postedOn);
        } catch (err) {
            expect(err).toEqual(new Error());
        }
    });



});

describe('can delete tuit wtih REST API', () => {
  // TODO: implement this
});

describe('can retrieve a tuit by their primary key with REST API', () => {
  // TODO: implement this
});

describe('can retrieve all tuits with REST API', () => {
  // TODO: implement this
});