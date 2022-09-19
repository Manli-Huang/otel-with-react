import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
import Form from "../components/Form";
import Todo from "../components/ComplianceDetail";
import {nanoid} from "nanoid";

const CompliancesListPage = () => {
    const [tasks, setTasks] = useState([]);
    const [parentSpan, setParentSpan] = useState(null);

    const deleteTask = (e, id) => {
        e.preventDefault();
        const remainingTasks = tasks.filter(task => id !== task.id);
        setTasks(remainingTasks);
    }

    const taskList = tasks
        .map(task => (
            <Todo
                id={task.id}
                name={task.name}
                key={task.id}
                deleteTask={(e) => deleteTask(e, task.id)}
                rootSpan={parentSpan}
            />
        ));

    function addTask(name) {
        const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
        setTasks([...tasks, newTask]);
    }


    const tasksNoun = taskList.length !== 1 ? 'compliances' : 'compliance';
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    const listHeadingRef = useRef(null);

    useEffect(() => {
        axios.get('http://localhost:5000/compliances').then((res) => {
            setTasks(res.data);
        })
    }, [tasks.length]);

    return (
        <div className="todoapp stack-large">
            <Form addTask={addTask} setParentSpan={(span) => setParentSpan(span)}/>
            <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
                {headingText}
            </h2>
            <ul
                className="todo-list stack-large stack-exception"
                aria-labelledby="list-heading"
            >
                {taskList}
            </ul>
        </div>
    );
}

export default CompliancesListPage;
