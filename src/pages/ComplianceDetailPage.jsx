import React, {useEffect, useState} from "react";

const ComplianceDetailPage = () => {
    const [compliance, setCompliance] = useState({name: ''});
    useEffect(() => {
        const complianceId = window.location.href.split('/')[4];
        fetch(`http://localhost:5000/compliances/${complianceId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(async (res) => {
            const data = await res.json()
            setCompliance({name: data.name})
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
