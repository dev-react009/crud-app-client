import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from "axios";
const URI = process.env.REACT_APP_BACKEND_URL;
const Update = () => {
    const{id}=useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const Navigate = useNavigate();


    useEffect(() => {
        Axios.get("https://crud-app-backend-rho.vercel.app/Getusr/"+id).then((res) => {
            setName(res.data.name);
            setEmail(res.data.email);
            setAge(res.data.age);
        }).catch(er => console.log(er))
    }, [id]);
    console.log(name)

    const Modify= async(e)=>{
        e.preventDefault();
        await Axios.put(`${URI}UpdateUsr/${id}`, { name, email, age })
            .then(res => window.confirm("user updated Succesfully!"))
            .catch(err => console.log(err));
        Navigate('/');
    }
    return (
        <div className='d-flex vh-100 bg-primary  justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
            <h3>Update User!</h3>
                <form onSubmit={Modify}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="Name" 
                        className="form-control" 
                        id="Name" 
                        placeholder="Enter Name" onChange={(e) => setName(e.target.value)}
                        value={name}/>

                    </div>
                    <div className="form-group">
                        <label >Email:</label>
                        <input type="email" 
                        className="form-control" 
                        id="email" placeholder="Enter email" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}/>
                    </div>
                    <div className="form-group">
                        <label>Age:</label>
                        <input type="Age" 
                        className="form-control" 
                        id="Age" placeholder="Enter Age" 
                        onChange={(e) => setAge(e.target.value)}
                        value={age} />
                    </div>
                    <button type="submit" className="btn btn-primary m-3">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Update