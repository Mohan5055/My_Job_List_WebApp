import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

const Update = () => {
    const [company, setCompany] = useState('');
    const [job, setJob] = useState('');
    const [salary, setSalary] = useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getJobDetails();
    }, [])

    const getJobDetails = async () => {
        console.warn(params)
        let result = await fetch(`https://jobapp-7v2y.onrender.com/job/${params.id}`);
        result = await result.json();
        setCompany(result.company);
        setJob(result.job);
        setSalary(result.salary);
    }

    const Update = async () => {
        console.warn(company, job, salary)
        let result = await fetch(`https://jobapp-7v2y.onrender.com/job/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ company, job, salary }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        result = await result.json();
        if (result) {
            navigate('/')
        }

    }

    return (
        <div className='job'>
            <h1>Update Job</h1>
            <input type="text" placeholder='Enter Company name' className='inputBox'
                value={company} onChange={(e) => { setCompany(e.target.value) }}
            />

            <input type="text" placeholder='Enter Job position' className='inputBox'
                value={job} onChange={(e) => { setJob(e.target.value) }}
            />

            <input type="text" placeholder='Enter Job salary' className='inputBox'
                value={salary} onChange={(e) => { setSalary(e.target.value) }}
            />

            <button onClick={Update} className='appButton'>Update Job</button>
        </div>
    )
}

export default Update;