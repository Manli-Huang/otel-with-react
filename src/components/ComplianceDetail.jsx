import React from 'react';
// import opentelemetry from '@opentelemetry/api';
// import {getTracer} from "../tracing-helper";
import {Link} from "react-router-dom";

export default function ComplianceDetail(props) {
    // const { rootSpan, name } = props;
    // const tracer = getTracer();
    // let todoItemSpan;
    // if (rootSpan) {
    //     const parentCtx = opentelemetry.context.active();
    //     const subCtx = opentelemetry.trace.setSpan(parentCtx, rootSpan)
    //     todoItemSpan = tracer.startSpan(`TodoItem-Render: ${name}`, undefined, subCtx);
    // }

    const complianceItem = (
        <Link className="compliance-item" to={`/compliances/${props.id}`}>
            <label>
                {props.name}
            </label>
            <button
                type="button"
                className="btn btn__danger"
                onClick={() => props.deleteTask(props.id)}
            >
                Delete <span className="visually-hidden">{props.name}</span>
            </button>
        </Link>
    );

    return <li className="todo">{complianceItem}</li>;
}
