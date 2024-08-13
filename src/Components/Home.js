import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';
import Axios from "axios";
const Home = () => {
    const URI = process.env.REACT_APP_BACKEND_URL;

    const [data,setData] = useState([
    ]);
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        setLoading(true);
        fetchData()
    }, []);

    const fetchData =async ()=>{
       await Axios.get(`${URI}Get`).then((res) => {
            setData(res.data)
            setLoading(false);
        }).catch(er => {
            console.log(er)
            setLoading(false);
        })
    }
    
    const Deleteusr=async(id)=>{
        setLoading(true);
        Axios.delete(`${URI}deleteUsr/${id}`)
        .then(res => {
                console.log(res)
                fetchData();
                setLoading(false);
                window.confirm("user deleted Succesfully!")

            })
            .catch((err)=> { setLoading(false)
                console.log(err) })

    }
    return (
        <div
            className='container-fluid bg-primary vh-100 d-flex justify-content-center align-items-center'
         >
            {loading ? (<div className="spinner-border text-light" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>):(<div className='bg-white rounded  row justify-content-md-center' >
                <Link to="/Add"><button className='d-flex  justify-content-center btn btn-primary m-3 text-decoration-line-none' >Add +</button></Link>
                <table className='table table-hover' width={'100%'}>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    

                    <tbody>
                        {data.length===0 ? <tr> No Data Found... </tr>
                    :
                        
                            data.map((obj,ind) => {
                                return <tr key={ind} className='m-5'> 
                                    <td>{obj.name}</td>
                                    <td>{obj.email}</td>
                                    <td>{obj.age}</td>
                                    <td> 
                                    <Link to={`/Update/${obj._id}`} className='btn btn-success btn-sm me-2'>Edit</Link> 
                                    <button className='btn btn-danger'
                                    onClick={()=>Deleteusr(obj._id)} >Delete</button></td>
                                </tr>
                            })
                        }

                    </tbody>
                </table>
            </div>)}
        </div>
    )
}

export default Home;