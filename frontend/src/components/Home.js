import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Home = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getjobs();
    }, []);

    const getjobs = async () => {
        let result = await fetch('https://jobapp-7v2y.onrender.com/job',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setJobs(result);
    }

    const deletejob = async (id) => {
        console.warn(id)
        let result = await fetch(`https://jobapp-7v2y.onrender.com/job/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getjobs();
        }
    }

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`https://jobapp-7v2y.onrender.com/search/${key}`);
            result = await result.json()
            if(result){
                setJobs(result)
            }
        }else{
            getjobs();
        }
    
    }

    return (
        <div className="job-list">
            <h1>Job List</h1>
            <input type="" className='search-job-box' placeholder='Search Job'
            onChange={searchHandle}
             />
            <ul>
                <li><b>S.No.</b></li>
                <li><b>Company</b></li>
                <li><b>Job</b></li>
                <li><b>Salary</b></li>
                <li><b>Action</b></li>
            </ul>
            {
                jobs.length>0 ? jobs.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.company}</li>
                        <li>{item.job}</li>
                        <li>{item.salary}</li>
                        <li>
                            <button onClick={() => deletejob(item._id)}>Delete</button>
                            <Link to={"/update/"+item._id} ><button>Update</button> </Link>
                            </li>

                    </ul>
                )
                :<h1>No Result Found</h1>
            }
        </div>
    )
}

export default Home;