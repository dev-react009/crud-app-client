import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import ToastNotification from './Toast';

const URI = process.env.REACT_APP_BACKEND_URL;

const Update = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [toast, setToast] = useState({ show: false, message: '' });
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`${URI}Getusr/${id}`).then((res) => {
            setName(res.data.name);
            setEmail(res.data.email);
            setAge(res.data.age);
        }).catch(err =>
            setToast({ show: true, message: err.message })
        );
    }, [id]);

    const Modify = async (e) => {
        e.preventDefault();
        await Axios.put(`${URI}UpdateUsr/${id}`, { name, email, age })
            .then(_ =>{ ; 
                setTimeout(() => {
                    navigate('/');
                }, 3500);
                setToast({ show: true, message: "User Updated successfully!" })})
            .catch(err => {
                setToast({ show: true, message: err.message })
            });
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='bg-white rounded p-4' style={{ width: '400px' }}>
                <h3 className="mb-4">Update User</h3>
                <form onSubmit={Modify}>
                    <div className="form-group row mb-3">
                        <label htmlFor="Name" className="col-sm-4 col-12 col-form-label">Name:</label>
                        <div className="col-sm-8 col-12">
                            <input
                                type="text"
                                className="form-control"
                                id="Name"
                                placeholder="Enter Name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                    </div>
                    <div className="form-group row mb-3">
                        <label htmlFor="email" className="col-sm-4 col-12 col-form-label float-sm-start">Email:</label>
                        <div className="col-sm-8 col-12">
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                    </div>
                    <div className="form-group row mb-4">
                        <label htmlFor="Age" className="col-sm-4 col-12 col-form-label">Age:</label>
                        <div className="col-sm-8 col-12">
                            <input
                                type="number"
                                className="form-control"
                                id="Age"
                                placeholder="Enter Age"
                                onChange={(e) => setAge(e.target.value)}
                                value={age}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Submit</button>
                </form>
                <ToastNotification
                    show={toast.show}
                    message={toast.message}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            </div>
        </div>
    );
};

export default Update;
