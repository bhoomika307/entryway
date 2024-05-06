import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Checkbox } from 'antd';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [sites, setSites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/site/site-count');
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page > 1) loadMore();
  }, [page]);

  // Load more sites
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/site/site-list/${page}`);
      setLoading(false);
      setSites(prevSites => [...prevSites, ...data?.sites]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter by category
  const handleFilter = (checked, id) => {
    if (checked) {
      setChecked(prevChecked => [...new Set([...prevChecked, id])]);
    } else {
      setChecked(prevChecked => prevChecked.filter(categoryId => categoryId !== id));
    }
  };

  useEffect(() => {
    if (!checked.length) getAllSites();
    else filterSites();
  }, [checked]);

  // Get all sites
  const getAllSites = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/site/site-list/${page}`);
      setLoading(false);
      setSites(data.sites);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter sites by selected categories
  const filterSites = async () => {
    try {
      const { data } = await axios.post('api/v1/site/site-filters', { checked });
      setSites(data?.sites);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Sites - Best offers"}>
      <div className="row mt-2">
        <div className="col-md-3">
          <h4 className="text-center">Filter By category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                checked={checked.includes(c._id)}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Sites</h1>
          <div className="d-flex flex-wrap">
            {sites?.map(s => (
              <div className="card m-2" style={{ width: '18rem' }} key={s._id}>
                <img src={`/api/v1/site/site-photo/${s._id}`} className="card-img-top" alt={s.name} />
                <div className="card-body">
                  <h5 className="card-title">{s.name}</h5>
                  <p className="card-text">{s.description}</p>
                  <button className="btn btn-primary ms-1" onClick={() => navigate(`/site/${s.slug}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1" onClick={() => {
  const existingIndex = cart.findIndex(item => item._id === s._id);
  if (existingIndex !== -1) {
    const updatedCart = [...cart];
    updatedCart[existingIndex].quantity += 1;
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  } else {
    setCart([...cart, { ...s, quantity: 1 }]);
    localStorage.setItem('cart', JSON.stringify([...cart, { ...s, quantity: 1 }]));
  }
  toast.success('Item added to Cart');
}}>Add to Cart</button>

                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {sites && sites.length < total && (
              <button className="btn btn-warning"
                onClick={() => setPage(page + 1)}>
                {loading ? "Loading..." : "Load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
