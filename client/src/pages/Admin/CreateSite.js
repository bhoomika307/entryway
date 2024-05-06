import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import toast from "react-hot-toast";
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const CreateSite = () => {
  const navigate = useNavigate();
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
const handleCreate = async (e) => {
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
    siteData.append("photo", photo);
    siteData.append("category", category);
    const { data } = axios.post(
      "http://localhost:8080/api/v1/site/create-site",
      siteData
    );
    if (data?.success) {
      toast.error(data?.message);
    } else {
      toast.success("Site Created Successfully");
      navigate("/dashboard/admin/sites");
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong");
  }
};


  return (
    <Layout title = {"Dashboard - Create Site"}>
      <div className="container-fluid m-3 p-3">
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1>Create Site</h1>
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
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
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
                <button className="btn btn-primary" onClick={handleCreate}>
                  Create Site
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateSite