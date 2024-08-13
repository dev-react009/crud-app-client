import React, { useState } from 'react'
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import ToastNotification from './Toast';
const URI = process.env.REACT_APP_BACKEND_URL;

const Create = () => {
    const [name, setName] = useState("");
    const [email,setEmail]= useState("");
    const [age, setAge] = useState("");
    const [toast, setToast] = useState({ show: false, message: '' });
    const Navigate=useNavigate();

    const SubmitHandler= async(e)=>{
        e.preventDefault();
        if(name !=="" && email !==""&& age !==""){
            Axios.post(`${URI}AddUsr`,{name,email,age})
                .then(_ =>{ 
                    setToast({ show: true, message: "User added successfully!" })
                    setTimeout(() => {
                        Navigate('/');
                    }, 3500);
                })
                .catch(err => { console.log(err); setToast({ show: true, message: "Error adding user." }); });
            
        }
        else{
            setToast({ show: true, message: "Please fill all the fields" });
        }
    }
    return (
        <div className='d-flex vh-100 bg-primary  justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3 justify-content-start'>
                <form onSubmit={SubmitHandler}>
                    <h3 className='d-flex  justify-content-start'>Add User</h3>
                    <div className='mb-2'>
                        {/* <label>Name</label> */}
                        <input type='text' 
                        placeholder='Enter Username' 
                        className='form-control'
                        onChange={(e)=>setName(e.target.value)}
                        />
                
                    </div>
                    <div className='mb-2'>
                        {/* <label>Email</label> */}
                        <input type='email' 
                        placeholder='Enter Email' 
                        className='form-control' 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        {/* <label>Age</label> */}
                        <input type='text' 
                        placeholder='Enter Age' 
                        className='form-control'
                            onChange={(e) => setAge(e.target.value) }/>
                    </div>
                    <button className='btn btn-outline-success my-3 px-4 d-flex w-100'>Add</button>
                </form>
                <ToastNotification
                    show={toast.show}
                    message={toast.message}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            </div>
        </div>
    )
}

export default Create