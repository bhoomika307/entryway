import Layout from "../components/Layout/Layout";
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'


const CategorySite = () => {
    const params=useParams()
    const navigate = useNavigate();
    const [sites,setSites]=useState([])
    const [category,setCategory]=useState([])

    useEffect(()=>{
        if(params?.slug)getSiteByCat()
    },[params?.slug])
    const getSiteByCat =async()=>{
        try{
            const {data}= await axios.get(`/api/v1/site/site-category/${params.slug}`)
            setSites(data?.sites)
            setCategory(data?.category)
        }catch(error){
            console.log(error)
        }
    }
  return (
    <Layout>
    <div className='container mt-3' >
        <h1 className='text-center'>{category?.name}</h1>
        <h6 className="text-center">{sites?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {sites?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`/api/v1/site/site-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.ticketPrice}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/site/${p.slug}`)}
                      >
                        More Details
                      </button>
                      {/* <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategorySite