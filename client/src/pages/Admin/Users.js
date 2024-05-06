import React,{useState,useEffect} from "react"
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from "../../components/Layout/Layout";
import axios from 'axios';
import { toast, Toast } from "react-hot-toast";
import {Link} from "react-router-dom"
const Users = () => {
  const[Users,setUsers]=useState([])
  const getAllUsers=async()=>{
    try{
      const {data}=await axios.get('/api/v1/auth/get-users')
      setUsers(data.users);

    }
    catch(error)
    {
      console.log(error)
      toast.error("Something went wrong");

    }
  };
  useEffect(()=>{
    getAllUsers();
  },[]);
  return (
    <Layout>
        <div className='row'>
            <div className="col-md-3">
                <AdminMenu/>

            </div>
            <div className="col-md-9">
                <h1 className='text-center'>All Sites Lists</h1>
                <div className="d-flex">
                {Users?.map(s=> (
                  <Link  key={s._id} to={`/dashboard/admin/user/${s.slug}`} className="site-link">
                    <div className="card m-2" style={{width: '18rem'}} >
    <div className="card-body">
    <h5 className="card-title">{s.name}</h5>
    
  </div>
</div>
</Link>
 

                ))}

                  
                  </div>
                  
                  
                
            </div>
        </div>
    </Layout>
  )
}



export default Users