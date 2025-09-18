const express = require("express");

const {getAdminProducts, getAllProducts, createProduct,updateProduct,deleteProduct ,getProductDetails, createProductReview, getProductReview,deleteProductReview } = require("../controller/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middlewares/authenication");

const router = express.Router();

// router.route("/").get(getAllProductss)

router.route("/products").get(getAllProducts)
router.route("/admin/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router.route("/admin/products/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
router.route("/admin/products/:id").delete(deleteProduct)

router.route("/products/:id").get(getProductDetails)

router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts)

router.route("/review").put(isAuthenticatedUser,createProductReview)

router.route("/reviews").get(getProductReview)

router.route("/reviews").delete(isAuthenticatedUser,deleteProductReview)




module.exports=router