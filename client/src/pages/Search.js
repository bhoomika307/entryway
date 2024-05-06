import React from 'react'
import Layout from './../components/Layout/Layout';
import { useSearch } from '../context/search';
import { useNavigate } from 'react-router-dom'

const Search = () => {
    const navigate = useNavigate()
    const[values,setValues]=useSearch()
  return (
    <Layout title={'Search results'}>
        <div className="container"></div>
         <div className='text-center'>
            <h1>Search Results</h1>
            <h6>{values?.results.length<1 ? "no product found"
            :`Found${values?.results.length}`}</h6>
            <div className="d-flex flex-wrap mt-4">
            {values?.results.map(s=> (
            
                    <div className="card m-2" style={{width: '18rem'}} >
      <img src={`/api/v1/site/site-photo/${s._id}`} className="card-img-top" alt="{s.name}" />
    <div className="card-body">
    <h5 className="card-title">{s.name}</h5>
    <p className="card-text">
                    {s.description.substring(0, 30)}...
                  </p>
    <button class="btn btn-primary ms-1"onClick={() => navigate(`/site/${s.slug}`)}>More Details</button>
    <button  class="btn btn-secondary ms-1">Add to Cart</button>

    
  </div>
</div>
))}
            </div>
         </div>

    </Layout>
  )
}

export default Search