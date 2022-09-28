import React, {useState, useRef, useEffect} from "react";
import Form from "../components/Form";
import ComplianceDetail from "../components/ComplianceDetail";
import {nanoid} from "nanoid";
import {trace, context} from '@opentelemetry/api';

const CompliancesListPage = () => {
    const [compliances, setCompliances] = useState([]);
    const [parentSpan, setParentSpan] = useState(null);

    const deleteCompliance = (e, id) => {
        e.preventDefault();
        const remainingTasks = compliances.filter(task => id !== task.id);
        setCompliances(remainingTasks);
    }

    const taskList = compliances
        .map(task => (
            <ComplianceDetail
                id={task.id}
                name={task.name}
                key={task.id}
                deleteCompliance={(e) => deleteCompliance(e, task.id)}
                rootSpan={parentSpan}
            />
        ));

    function addTask(name) {
        const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
        setCompliances([...compliances, newTask]);
    }


    const tasksNoun = taskList.length !== 1 ? 'compliances' : 'compliance';
    const headingText = `${taskList.length} ${tasksNoun} remaining`;

    const listHeadingRef = useRef(null);

    useEffect(() => {
        const { webTracer } = window;
        const listSpan = webTracer.startSpan('list-span',{
            attributes: {organization: 'manny'}
        });
        context.with(trace.setSpan(context.active(), listSpan), () => {
            fetch('http://localhost:5000/compliances', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then((res) => {
                setTimeout(async () => {
                    trace.getSpan(context.active()).addEvent('fetched after 1 sec');
                    setTimeout(() => {
                        listSpan.end();
                    }, 500);
                    setCompliances(await res.json());
                }, 1000)
            });
            // fetch('http://localhost:5000/compliances', {
            //     method: 'GET',
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json'
            //     }
            // }).then(async (res) => {
            //    setCompliances(await res.json());
            // });
        });
    }, []);

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
