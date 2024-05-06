import siteModel from "../models/siteModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from 'fs';
import slugify from "slugify";

export const createSiteController = async (req, res) => {
    try {
      const { name, description, siteAddress, ticketPrice, openTime, closeTime, contactPhone, contactEmail, Accommodation, category, ticketQuantity } =
        req.fields;
      const { photo } = req.files;
      //validation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !siteAddress:
          return res.status(500).send({ error: "siteAddress is Required" });
        case !ticketPrice:
          return res.status(500).send({ error: "Price is Required" });
        case !openTime:
          return res.status(500).send({ error: "openTime is Required" });
        case !closeTime:
          return res.status(500).send({ error: "closeTime is Required" });
        case !contactPhone:
          return res.status(500).send({ error: "contactPhone is Required" });
        case !contactEmail:
          return res.status(500).send({ error: "contactEmail is Required" });
        case !Accommodation:
          return res.status(500).send({ error: "Accommodation is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !ticketQuantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
      const sites = new siteModel({ ...req.fields, slug: slugify(name) });
      if (photo) {
        sites.photo.data = fs.readFileSync(photo.path);
        sites.photo.contentType = photo.type;
      }
      await sites.save();
      res.status(201).send({
        success: true,
        message: "Site Created Successfully",
        sites,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while creating site",
      });
    }
  };

  //get all products
export const getSiteController = async (req, res) => {
    try {
      const sites = await siteModel
        .find({})
        .populate("category")
        .select("-photo")
        .limit(12)
        .sort({ createdAt: -1 });
      res.status(200).send({
        success: true,
        countTotal:sites.length,
        message: "AllSites",
        sites,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr in getting sites",
        error: error.message,
      });
    }
  };

  // get single product
export const getSingleSiteController = async (req, res) => {
    try {
      const site = await siteModel
        .findOne({ slug: req.params.slug })
        .select("-photo")
        .populate("category");
      res.status(200).send({
        success: true,
        message: "Single Site Fetched",
        site,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror while getitng single site",
        error,
      });
    }
  };

  // get site
export const sitePhotoController = async (req, res) => {
    try {
      const site = await siteModel.findById(req.params.pid).select("photo");
      if (site.photo.data) {
        res.set("Content-type", site.photo.contentType);
        return res.status(200).send(site.photo.data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getting photo",
        error,
      });
    }
  };

  //delete controller
export const deleteSiteController = async (req, res) => {
    try {
      await siteModel.findByIdAndDelete(req.params.pid).select("-photo");
      res.status(200).send({
        success: true,
        message: "Site Deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error while deleting site",
        error,
      });
    }
  };

  export const updateSiteController = async (req, res) => {
    try {
      const { name, description, siteAddress, ticketPrice, openTime, closeTime, contactPhone, contactEmail, Accommodation, category, ticketQuantity } =
        req.fields;
      const { photo } = req.files;
      //validation
      switch (true) {
        case !name:
          return res.status(500).send({ error: "Name is Required" });
        case !description:
          return res.status(500).send({ error: "Description is Required" });
        case !siteAddress:
          return res.status(500).send({ error: "siteAddress is Required" });
        case !ticketPrice:
          return res.status(500).send({ error: "Price is Required" });
        case !openTime:
          return res.status(500).send({ error: "openTime is Required" });
        case !closeTime:
          return res.status(500).send({ error: "closeTime is Required" });
        case !contactPhone:
          return res.status(500).send({ error: "contactPhone is Required" });
        case !contactEmail:
          return res.status(500).send({ error: "contactEmail is Required" });
        case !Accommodation:
          return res.status(500).send({ error: "Accommodation is Required" });
        case !category:
          return res.status(500).send({ error: "Category is Required" });
        case !ticketQuantity:
          return res.status(500).send({ error: "Quantity is Required" });
        case photo && photo.size > 1000000:
          return res
            .status(500)
            .send({ error: "photo is Required and should be less then 1mb" });
      }
      const sites = await siteModel.findByIdAndUpdate(req.params.pid,{ ...req.fields, slug: slugify(name) },{ new : true });
      if (photo) {
        sites.photo.data = fs.readFileSync(photo.path);
        sites.photo.contentType = photo.type;
      }
      await sites.save();
      res.status(201).send({
        success: true,
        message: "Site updated successfully",
        sites,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error while updating site",
      });
    }
  };
  //filters
  export const siteFiltersController=async(req,res)=>{
    try{
      const {checked}=req.body
      let args ={}
      if(checked.length>0)args.category=checked 
      const sites=await siteModel.find(args)
      res.status(200).send({
        success:true,
        sites
        
      })

    }
    catch(error)
    {
      console.log(error)
      res.status(400).send({
        success:false,
        message:"Error while filtering sites",
        error
      })
    }
  };
  export const siteCountController=async(req,res)=>{
    try{
      const total=await siteModel.find({}).estimatedDocumentCount()
      res.status(200).send({
        success:true,
        total,
      });

    }
    catch(error){
      console.log(error)
      res.status(400).send({
        message:"Error in site count",
        error,
        success:false
      })

    }
  };
  //site list
  export const siteListController=async(req,res)=>
  {
    try{
      const perPage=6
      const page=req.params.page?req.params.page:1
      const sites= await siteModel.find({}).select("-photo").skip((page-1)*perPage).limit(perPage).sort({createdAt:-1});
      res.status(200).send({
        success:true,
        sites
      })

    }
    catch(error){
      console.log(error)
      res.status(400).send({
        success:false,
        message:'error in per page ctrl'
      })

    }
  };
  //search site
  export const searchSiteController=async(req,res)=>{
    try{
      const {keyword}=req.params
      const results=await siteModel.find({
        $or:[
          {name:{$regex:keyword,$options:"i"}},
          {description:{$regex:keyword,$options:"i"}}
        ]

      }).select("-photo");
      res.json(results);

    }
    catch(error)
    {
      console.log(error)
      res.status(400).send({
        success:false,
        message:"Error in searching API",
        error
      })

    }
  };

  //similar sites
  export const relatedSiteController = async (req, res) => {
    try {
      const { pid, cid } = req.params;
      const sites = await siteModel
        .find({
          category: cid,
          _id: { $ne: pid },
        })
        .select("-photo")
        .limit(3)
        .populate("category");
      res.status(200).send({
        success: true,
        sites,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "error while geting related site",
        error,
      });
    }
  };
  //get sites by category
  export const siteCategoryController = async (req, res) => {
    try {
      const category = await categoryModel.findOne({ slug: req.params.slug });
      const sites = await siteModel.find({ category }).populate("category");
      res.status(200).send({
        success: true,
        category,
        sites,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        error,
        message: "Error While Getting sites",
      });
    }
  };
