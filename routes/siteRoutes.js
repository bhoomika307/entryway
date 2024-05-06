import  express  from "express";
import { createSiteController, deleteSiteController, getSingleSiteController, getSiteController, relatedSiteController, searchSiteController, siteCountController, siteFiltersController, siteListController, sitePhotoController, updateSiteController,siteCategoryController } from "../Controllers/siteController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post('/create-site', requireSignIn, isAdmin, formidable(), createSiteController);

//routes
router.put(
    "/update-site/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateSiteController
  );

//get sites
router.get("/get-site", getSiteController);

//single site
router.get("/get-site/:slug", getSingleSiteController);

//get photo
router.get("/site-photo/:pid", sitePhotoController);

//delete site
router.delete("/delete-site/:pid", deleteSiteController);
//filter site
router.post('/site-filters',siteFiltersController);
router.get('/site-count',siteCountController);
//product per page
router.get('/site-list/:page',siteListController)
//search site
router.get('/search/:keyword',searchSiteController)
//similar sites
router.get('/related-sites/:pid/:cid',relatedSiteController)

//category wise product
router.get('/site-category/:slug',siteCategoryController)
export default router