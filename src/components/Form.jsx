import React, {useState} from "react";
import {getTracer, withTracing} from "../tracing-helper";

const rootSpan = getTracer().startSpan('Todo-root');

function Form(props) {
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) {
            return;
        }
        withTracing(`createTodo: ${name}`,()=>{
            props.addTask(name);
            setName("");
        }, rootSpan);
        props.setParentSpan(rootSpan);

    }


    function handleChange(e) {
        setName(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label className="label__lg">Compliance Listing Page</label>
            </h2>

            <input
                type="text"
                id="new-todo-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn__primary btn__lg add_btn">
                Add
            </button>
        </form>
    );
}

export default Form;
