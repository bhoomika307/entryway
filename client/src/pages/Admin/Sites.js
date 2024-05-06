import React,{useState,useEffect} from "react"
import AdminMenu from '../../components/Layout/AdminMenu';
import Layout from "../../components/Layout/Layout";
import axios from 'axios';
import { toast, Toast } from "react-hot-toast";
import {Link} from "react-router-dom"
const Sites = () => {
  const[Sites,setSites]=useState([])
  const getAllSites=async()=>{
    try{
      const {data}=await axios.get('/api/v1/site/get-site')
      setSites(data.sites);

    }
    catch(error)
    {
      console.log(error)
      toast.error("Something went wrong");

    }
  };
  useEffect(()=>{
    getAllSites();
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
                {Sites?.map(s=> (
                  <Link  key={s._id} to={`/dashboard/admin/site/${s.slug}`} className="site-link">
                    <div className="card m-2" style={{width: '18rem'}} >
      <img src={`/api/v1/site/site-photo/${s._id}`} className="card-img-top" alt="{s.name}" />
    <div className="card-body">
    <h5 className="card-title">{s.name}</h5>
    <p className="ca{rd-text">{s.description}</p>
    
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

export default Sites