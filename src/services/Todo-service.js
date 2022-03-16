import axios from "axios";
const URL = "http://localhost:4000/api/todos"

export const findAllTodos = () => {
    return axios.get(URL);
}

export const deleteTodo = (tid) => {
    return axios.delete(`${URL}/${tid}`)

}
//因為只有一行statement簡寫所以不用return也不用curley bracket
export const createTodo = (newTodo) =>
     axios.post(URL,newTodo)

