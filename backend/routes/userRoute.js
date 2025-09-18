const express= require("express")
const router = express.Router()
const {registerUser,loginUser, logout, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUser, getSingleUser, updateUserRole, deleteUserProfile} =require("../controller/userController")
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/authenication")


router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").get(logout)

router.route("/password/forgot").post(forgotPassword)

router.route("/password/reset/:token").put(resetPassword)

router.route("/me").get(isAuthenticatedUser,getUserDetails)

router.route("/password/update").put(isAuthenticatedUser,updateUserPassword)

router.route("/me/update").put(isAuthenticatedUser,updateUserProfile)

router.route("/admin/users").put(isAuthenticatedUser,authorizeRoles("admin")).get(getAllUser)

router.route("/admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleUser).put(isAuthenticatedUser,authorizeRoles("admin"),updateUserRole).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteUserProfile)

module.exports=router