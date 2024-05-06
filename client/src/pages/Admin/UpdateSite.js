import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast";
import axios from 'axios';
/*import { Select } from 'antd';
import { useNavigate,useParams } from 'react-router-dom';
import {Option} from Select*/
import { Select } from "antd";
import {  useNavigate , useParams} from "react-router-dom";

const { Option } = Select


const UpdateSite = () => {
    const navigate = useNavigate();
    const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [siteAddress, setSiteAddress] = useState("");
  const [ticketPrice, seTicketPrice] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [Accommodation, setAccommodation] = useState("");
  const [category, setCategory] = useState("");
  const [ticketQuantity, setTicketQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [id,setId] = useState("");

  const getSingleSite=async ()=>
  {
    try{
        const {data }=await axios.get(`/api/v1/site/get-site/${params.slug}`)
        setName(data.site.name)
        setId(data.site._id)
        setDescription(data.site.description)
        setSiteAddress(data.site.siteAddress)
        seTicketPrice(data.site.ticketPrice)
        setOpenTime(data.site.openTime)
        setCloseTime(data.site.closeTime)
        setContactPhone(data.site.contactPhone)
        setContactEmail(data.site.contactEmail)
        setAccommodation(data.site.Accommodation)
        setCategory(data.site.category._id)
        setTicketQuantity(data.site.ticketQuantity)
    }
    catch(error)
    {
        console.log(error)
    }
  };
  useEffect(()=>{
    getSingleSite()
  },[])

 //get all cat
 const getAllCategory = async () => {
  try {
    const { data } = await axios.get("http://localhost:8080/api/v1/category/get-category");
    if (data?.success) {
      setCategories(data?.category);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong in getting catgeory");
  }
};

useEffect(() => {
  getAllCategory();
}, []);

//create site function
const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const siteData = new FormData();
    siteData.append("name", name);
    siteData.append("description", description);
    siteData.append("siteAddress", siteAddress);
    siteData.append("ticketPrice", ticketPrice);
    siteData.append("openTime", openTime);
    siteData.append("closeTime", closeTime);
    siteData.append("contactPhone", contactPhone);
    siteData.append("contactEmail", contactEmail);
    siteData.append("Accommodation", Accommodation);
    siteData.append("ticketQuantity", ticketQuantity);
    photo && siteData.append("photo", photo);
    siteData.append("category", category);
    const { data } = axios.put(
      `http://localhost:8080/api/v1/site//update-site/${id}`,
      siteData
    );
    if (data?.success) {
      toast.error(data?.message);
    } else {
      toast.success("Site updated Successfully");
      navigate("/dashboard/admin/sites")
     
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong");
  }
};
//delete site 
     const handleDelete=async()=>{
        try{
            let answer = window.prompt('Do you want to deleted this site ?')
            if(!answer) return;
            const {data}= await axios.delete(`/api/v1/site/delete-site/${id}`)
            toast.success("product deleted successfully")
            navigate('/dashboard/admin/sites')

        }
        catch(error)
        {
            console.log(error)
            toast.error("Something went wrong")
        }
     }
  return (
    <Layout title = {"Dashboard - Create Site"}>
      <div className="container-fluid m-3 p-3">
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>UPDATE SITE</h1>
            <div className="m-1 w-75">
            <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="site_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ):(
                    <div className="text-center">
                    <img
                     src={`/api/v1/site/site-photo/${id}`}
                      alt="site_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Site name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={description}
                  placeholder="Site description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={siteAddress}
                  placeholder="Site address"
                  className="form-control"
                  onChange={(e) => setSiteAddress(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={ticketPrice}
                  placeholder="Site ticket price"
                  className="form-control"
                  onChange={(e) => seTicketPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="time"
                  value={openTime}
                  placeholder="Site opening time"
                  className="form-control"
                  onChange={(e) => setOpenTime(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="time"
                  value={closeTime}
                  placeholder="Site closing time"
                  className="form-control"
                  onChange={(e) => setCloseTime(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="tel"
                  value={contactPhone}
                  placeholder="contact number"
                  className="form-control"
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={contactEmail}
                  placeholder="contact email"
                  className="form-control"
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <Select
                  bordered={false}
                  placeholder="Is accommodation available "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setAccommodation(value);
                  }}
                  value={Accommodation ?"Yes":"No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={ticketQuantity}
                  placeholder="Number of tickets"
                  className="form-control"
                  onChange={(e) => setTicketQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  update Site
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete site
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
   
  )
}

export default UpdateSite