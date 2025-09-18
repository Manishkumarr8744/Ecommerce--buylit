import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ClearErrors,
  getAdminProduct,
  deleteProduct,
} from "../../Reducer/ProductReducer/productAction";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "./Sidebar";
import {
  Edit,
  Trash2,
  Search,
  Package,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { deleteProductReset } from "../../Reducer/ProductReducer/ProductReducers";
import toast, {  } from "react-hot-toast";
import MetaData from "../Layouts/MetaData";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [searchError, setSearchError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const itemsPerPage = 10;

  const deleteProductHandler = (id) => {
    if (!id) return;
    dispatch(deleteProduct(id));
    setDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(ClearErrors());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(ClearErrors());
    }

    if (isDeleted) {
      toast.success("Product deleted successfully!");
      navigate("/admin/dashboard");
      dispatch(deleteProductReset());
    }

    dispatch(getAdminProduct());
  }, [dispatch, error, deleteError, navigate, isDeleted]);

  // ✅ Validate search
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (!/^[a-zA-Z0-9\s]*$/.test(value)) {
      setSearchError("Search can only contain letters and numbers.");
    } else {
      setSearchError("");
    }
  };

  // Filter products
  const filteredProducts =
    products?.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product._id.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <Fragment>
      {/* Hot Toast container */}

      <div className="mt-[3rem] flex min-h-screen bg-gray-50">
        <MetaData title={`Product List`} />
        <SideBar />

        <div className="flex-1 md:ml-0">
          {/* Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-4 py-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  All Products
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your product inventory
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-md w-full md:w-auto">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    searchError ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {searchError && (
                  <p className="mt-1 text-sm text-red-600">{searchError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-8">
            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-50 p-2 rounded-lg">
                    <Package className="text-indigo-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="text-xl font-bold text-gray-800">
                      {products?.length || 0}
                    </p>
                  </div>
                </div>
                <Link
                  to="/admin/product"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                >
                  Add New Product
                </Link>
              </div>
            </div>

            {/* Table */}
            <div className="hidden md:block bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentProducts.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {product._id}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {product.name}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              product.stock > 0
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          ₹{product.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <Link
                              to={`/admin/product/${product._id}`}
                              className="text-indigo-600 hover:text-indigo-900 p-1"
                            >
                              <Edit size={18} />
                            </Link>
                            <button
                              onClick={() => openDeleteModal(product)}
                              className="text-red-600 hover:text-red-900 p-1"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* No Products */}
            {filteredProducts.length === 0 && !searchError && (
              <div className="text-center py-12">
                <Package className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">No products found</p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredProducts.length)} of{" "}
                  {filteredProducts.length} products
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <span className="px-4 py-2 text-sm font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Product
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "
              <span className="font-semibold">
                {productToDelete?.name || "this product"}
              </span>
              "? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteProductHandler(productToDelete?._id)}
                disabled={!productToDelete?._id}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ProductList;
