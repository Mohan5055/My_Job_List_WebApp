import { useState } from "react";


const Add = () => {
    const [company, setCompany] = useState('');
    const [job, setJob] = useState('');
    const [salary, setSalary] = useState('');
    const [error,setError] = useState(false);

    const emptyList = () =>{
        setCompany("")
        setJob("")
        setSalary("")
        setError("")
    }
    

    const Add = async () => {

        if(!company || !job || !salary)
        {
            setError(true);
            return false
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("https://jobapp-7v2y.onrender.com/add-job", {
            method: "post",
            body: JSON.stringify({ company, job, salary, userId }),
            headers: {
                "Content-type": "application/json"
            }
        });
        result = await result.json();
        emptyList();
        console.warn(result)
    }

    return (
        <div className='job'>
            <h1>Add Job</h1>
            <input type="text" placeholder='Enter Company name' className='inputBox'
                value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
            {error && !company && <span className='invalid-input'>Enter valid name</span>}

            <input type="text" placeholder='Enter Job position' className='inputBox'
                value={job} onChange={(e) => { setJob(e.target.value) }}
            />
            {error && !job && <span className='invalid-input'>Enter valid Job</span>}

            <input type="text" placeholder='Enter Job Salary' className='inputBox'
                value={salary} onChange={(e) => { setSalary(e.target.value) }}
            />
            {error && !salary && <span className='invalid-input'>Enter salary</span>} 

            <button onClick={Add} className='appButton'>Add Job</button>
        </div>
    )
}

export default Add;