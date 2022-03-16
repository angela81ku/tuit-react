import TodoItem1 from "./TodoItem1";
import {useState, useEffect} from "react";
import * as service from "../services/Todo-service";
// import {findAllTodos} from "../services/Todo-service";
//
// const TODOS = [
//     {title: "Read Dune", done: true, _id: "123"},
//     {title: "Read Foundation", done: true, _id: "234"},
//     {title: "Read Forever war", done: false, _id: "345"}
// ];
const title = "Todo app"
const TodoApp = () => {
    // blurs the line between javascript with xml, html
    const [todos, setTodos] = useState([]);
    const [newTodoTitle, setNewTodoTitle] = useState("New Todo");

    useEffect(() => {
        service.findAllTodos()
            .then((response) => {
                setTodos(response.data)
                // console.log(response.data)
                })
    }, [])

    const addTodo = () => {
        const newTodo = {
            title: newTodoTitle,
            done: false,
            //convert to string use + ""
            _id: new Date().getTime() + ""
        };
        service.createTodo(newTodo)
            .then((status) => {
                const newTodos = [...todos, newTodo];
                setTodos(newTodos);
            })
            .catch(e => {})

    }






    const updateTodo = (updatedTodo)=>{
        const newTodos = todos.map((oldTodo)=>{
            // 下面永遠錯誤 因為是reference copy
            // if(oldTodo === updatedTodo){
            if(oldTodo._id === updatedTodo._id){
                return updatedTodo
            }else{
                return oldTodo;
            }
        });
        setTodos(newTodos);
    }

    const deleteTodo = (todo) => {
        // alert("delete" + todo.title)
        service.deleteTodo(todo._id)
            .then((status) => {
                const newTodos = todos.filter((item) =>{
                    if(item === todo){
                        return false;
                    }else{
                        return true;
                    }
                })
                setTodos(newTodos);
        }).catch((e)=>{
            console.log(e);
        })

    }


    return (
        <div className="container">
            <h1>{title}</h1>
            <ul className="list-group">
                {
                    todos.map(todo =>
                        <TodoItem1
                            updateTodo = {updateTodo}
                            removeTodo = {deleteTodo}
                            todo = {todo}

                        />
                    )
                }
            </ul>
            {/*下面也可以*/}
            {/*<button onClick={addTodo}>Add todo</button>*/}
            <input value = {newTodoTitle}
                   onChange={(e) => {setNewTodoTitle(e.target.value)}}
                placeholder={"new todo"}
                   className="form-control"/>
            <button onClick={() => addTodo()}
                    className="btn btn-success">Add</button>

        </div>
    );
};
export default TodoApp;