import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../context/cart'
import toast  from 'react-hot-toast'

const SiteDetails = () => {
    const [cart,setCart]=useCart()
    const params=useParams()
    const navigate=useNavigate()
    const [site,setSite]=useState({})
    const [relatedsites,setRelatedSites]=useState([])
    
    //initial details
    useEffect(()=>{
        if(params?.slug)getSite();
    },[params?.slug]);
    const getSite = async()=>{
        try{
            const {data}=await axios.get(`/api/v1/site/get-site/${params.slug}`)
            setSite(data?.site)
            getSimilarSite(data?.site._id,data?.site.category._id)

        }
        catch(error)
        {
            console.log(error)

        }
    }
    //get similar sites
    const getSimilarSite = async (pid, cid) => {
        try {
          const { data } = await axios.get(
            `/api/v1/site/related-sites/${pid}/${cid}`
          );
          setRelatedSites(data?.sites);
        } catch (error) {
          console.log(error);
        }
      };
    
  return (
    <Layout>
        <div className="row container mt-2">
            <div className="col-md-6">
            <img src={`/api/v1/site/site-photo/${site._id}`} 
            className="card-img-top" alt="{site.name}" 
            height="300"
            width={'350px'}
            />

            </div>
            <div className="col-md-6 ">
                <h1 className='text-center'>Site Details</h1>
                
                <h6>Category:{site?.category?.name}</h6>
                <h6>Name:{site.name}</h6>
                <h6>Description:{site.description}</h6>
                <h6>Address:{site.siteAddress}</h6>
                <h6>TicketPrice:{site.ticketPrice}</h6>
                <h6>OpenTime:{site.openTime}</h6>
                <h6>closetime:{site.closeTime}</h6>
                <h6>ContactPhone:{site.contactPhone}</h6>
                <h6>ContactEmail:{site.contactEmail}</h6>
                <button  class="btn btn-secondary ms-1"onClick={()=>{setCart([...cart,site]);
                    localStorage.setItem('cart',JSON.stringify([...cart,site]))
                    toast.success('Item added to Cart')}}>Add to Cart</button>
                
                
                
            </div>

        </div>
        <div className="row mt-5">
            <h1>Similar Sites</h1>
            <div className="d-flex flex-wrap">
            {relatedsites?.map(s => (
              <div className="card m-2" style={{ width: '18rem' }} >
                <img src={`/api/v1/site/site-photo/${s._id}`} className="card-img-top" alt="{s.name}" />
                <div className="card-body">
                  <h5 className="card-title">{s.name}</h5>
                  <p className="ca{rd-text">{s.description}</p>
                  <button
                    className="btn btn-info ms-1"
                    onClick={() => navigate(`/site/${s.slug}`)}
                  >
                    More Details
                  </button>
                  <button class="btn btn-secondary ms-1" onClick={()=>{setCart([...cart,s]);
                    localStorage.setItem('cart',JSON.stringify([...cart,s]))
                    toast.success('Item added to Cart')}}>Add to Cart</button>


                </div>
              </div>
            ))}
          </div>
        </div>

    </Layout>
  )
}

export default SiteDetails