import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import ToastNotification from './Toast';

const Home = () => {
    const URI = process.env.REACT_APP_BACKEND_URL;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '' });


    useEffect(() => {
        setLoading(true);
        fetchData();
    }, []);

    const fetchData = async () => {
        await Axios.get(`${URI}Get`).then((res) => {
            setData(res.data);
            setLoading(false);
        }).catch(er => {
            console.log(er);
            setLoading(false);
        });
    };

    const Deleteusr = async (id) => {
        setLoading(true);
        Axios.delete(`${URI}deleteUsr/${id}`)
            .then(res => {
                console.log(res);
                fetchData();
                setLoading(false);
                setToast({ show: true, message: "User deleted Successfully" });
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };
    return (
        <div className='container-fluid bg-primary vh-100 d-flex justify-content-center align-items-center'>
            {loading ? (
                <div className="spinner-border text-light" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            ) : (
                    <div className='rounded bg-white p-4 w-100' style={{ maxHeight: '600px', overflowY: 'auto', maxWidth: '900px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <div className='d-flex justify-content-between mb-3'>
                        <h3 className="mb-0">User List</h3>
                        <Link to="/Add">
                            <button className='btn btn-primary'>Add +</button>
                        </Link>
                    </div>
                        <div className="table-responsive" >
                            <table className='table table-striped'  >
                            <thead className='thead-dark'>
                                <tr>
                                    <th style={{ width: '25%' }}>Name</th>
                                    <th style={{ width: '25%' }}>Email</th>
                                    <th style={{ width: '15%' }}>Age</th>
                                    <th style={{ width: '35%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center">No Data Found...</td>
                                    </tr>
                                ) : (
                                    data.map((obj, ind) => (
                                        <tr key={ind}>
                                            <td>{obj.name}</td>
                                            <td>{obj.email}</td>
                                            <td>{obj.age}</td>
                                            <td className="button-container">
                                                <Link to={`/Update/${obj._id}`} className='btn btn-success btn-sm me-2' style={{ width: '90px' }}>Edit</Link>
                                                <button className='btn btn-danger  btn-sm me-2' style={{ width: '90px' }} onClick={() => Deleteusr(obj._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                        <ToastNotification
                            show={toast.show}
                            message={toast.message}
                            onClose={() => setToast({ ...toast, show: false })}
                        />
                </div>
            )}
        </div>
    );
}

export default Home;


