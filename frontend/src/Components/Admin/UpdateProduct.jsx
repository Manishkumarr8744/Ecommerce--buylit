import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ClearErrors,
  updateProduct,
  getProductDetails,
} from "../../Reducer/ProductReducer/productAction";
import { useNavigate, useParams } from "react-router-dom";
import { updateProductReset } from "../../Reducer/ProductReducer/ProductReducers";
import SideBar from "./Sidebar";
import {
  Package,
  DollarSign,
  FileText,
  FolderTree,
  Boxes,
  Loader2,
} from "lucide-react";
import toast, {  } from "react-hot-toast";
import MetaData from "../Layouts/MetaData";

const UpdateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState();

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setPrice(product.price || 0);
      setCategory(product.category || "");
      setStock(product.stock || 0);
    }

    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }

    if (updateError) {
      toast.error(updateError);
      dispatch(ClearErrors());
    }

    if (isUpdated) {
      toast.success(" Product updated successfully!");
      dispatch(getProductDetails(id));
      dispatch(updateProductReset());
      navigate("/admin/products");
    }
  }, [dispatch, error, isUpdated, id, product, updateError, navigate]);

  const validateForm = () => {
    if (!name.trim()) return toast.error("Product name is required");
    if (price <= 0) return toast.error("Price must be greater than 0");
    if (!description.trim()) return toast.error("Description is required");
    if (!category) return toast.error("Please select a category");
    if (stock < 1) return toast.error("Stock must be at least 1");
    return true;
  };

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const productData = {
      name,
      price,
      description,
      category,
      stock,
    };

    dispatch(updateProduct(id, productData));
  };

  return (
    <Fragment>
      <MetaData title={`Update Product`} />
      <div className="mt-[3rem] flex flex-col lg:flex-row min-h-screen bg-gray-50">
        <SideBar />

        <div className="flex-1 p-4 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">
                Update Product
              </h1>

              <form
                className="space-y-6"
                encType="multipart/form-data"
                onSubmit={updateProductSubmitHandler}
              >
                {/* Product Name */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <Package className="w-4 h-4 mr-2" />
                    Product Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Price
                  </label>
                  <input
                    type="number"
                    placeholder="0.00"
                    required
                    onChange={(e) => setPrice(Number(e.target.value))}
                    value={price}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-medium text-gray-700">
                    <FileText className="w-4 h-4 mr-2" />
                    Description
                  </label>
                  <textarea
                    placeholder="Enter product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                {/* Category and Stock - Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <FolderTree className="w-4 h-4 mr-2" />
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Choose Category</option>
                      {categories.map((cate) => (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Stock */}
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <Boxes className="w-4 h-4 mr-2" />
                      Stock
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      required
                      onChange={(e) => setStock(Number(e.target.value))}
                      value={stock}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Updating...
                    </span>
                  ) : (
                    "Update Product"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
