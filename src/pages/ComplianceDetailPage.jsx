import React, {useEffect, useState} from "react";
import axios from "axios";

const ComplianceDetailPage = () => {
    const [compliance, setCompliance] = useState({name: ''});
    useEffect(() => {
        const complianceId = window.location.href.split('/')[4];
        console.log('w',complianceId);
        axios.get(`http://localhost:5000/compliances/${complianceId}`).then((res) => {
            console.log('res',res);
            setCompliance({name: res.data.name})
        })
    }, [])

    return (
        <>
            <h2>Compliance Detail Page</h2>
            <p>name: {compliance.name}</p>
        </>
    )
}

export default ComplianceDetailPage;
