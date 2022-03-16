//從母親傳入參數已改變子元素的相應狀態
const TodoItem1 = ({todo, removeTodo, updateTodo}) =>{
    // blurs the line between javascript with xml, html

    return (
                <li className="list-group-item">
                    <input checked={todo.done}
                           type = "checkbox"
                            onClick = {(e) => updateTodo({
                                ...todo, done:e.target.checked
                            })}/>
                    {todo.title}
                    <button
                        onClick={() => removeTodo(todo)}
                        className="btn btn-danger float-end">Delete</button>
                </li>
   );
};
export default TodoItem1;