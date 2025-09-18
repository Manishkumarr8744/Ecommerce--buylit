import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getAllReviews,
  deleteReviews,
} from "../../Reducer/ReviewReducer/reviewAction";
import { Trash2, Star, Search, ChevronLeft, ChevronRight } from "lucide-react";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { deleteReviewReset } from "../../Reducer/ReviewReducer/reviewReducerD";
import toast, {  } from "react-hot-toast";
import MetaData from "../Layouts/MetaData";

const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.reviewReducerD
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.allReviews
  );

  const deleteReviewHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReviews(id, productId));
    }
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
    setCurrentPage(1);
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      toast.success("Review deleted successfully!", { duration: 1000 });
      navigate("/admin/reviews");
      dispatch(deleteReviewReset());
    }
  }, [dispatch, error, deleteError, isDeleted, productId, navigate]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = reviews
    ? reviews.slice(indexOfFirstItem, indexOfLastItem)
    : [];
  const totalPages = reviews ? Math.ceil(reviews.length / itemsPerPage) : 0;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Star rating component
  const StarRating = ({ rating }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm font-medium">{rating}</span>
    </div>
  );

  return (
    <Fragment>
      <div className="mt-[3rem] flex min-h-screen bg-gray-50">
        <MetaData title={`Product Review`} />
        <SideBar />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <form onSubmit={productReviewsSubmitHandler}>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                ALL REVIEWS
              </h1>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Star className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Product Id"
                    required
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || productId === ""}
                  className={`inline-flex items-center px-6 py-2 rounded-md font-medium transition-colors ${
                    loading || productId === ""
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Reviews Content */}
          {reviews && reviews.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Review ID
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Comment
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rating
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {currentReviews.map((review) => (
                        <tr
                          key={review._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {review._id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {review.name}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            <div className="max-w-xs lg:max-w-md truncate">
                              {review.comment}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StarRating rating={review.rating} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => deleteReviewHandler(review._id)}
                              className="text-red-600 hover:text-red-900 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {currentReviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white rounded-lg shadow-md p-4 space-y-3"
                  >
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Review ID</p>
                      <p className="text-sm font-medium text-gray-900 break-all">
                        {review._id}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">User</p>
                      <p className="text-sm font-medium text-gray-900">{review.name}</p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Rating</p>
                      <StarRating rating={review.rating} />
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">Comment</p>
                      <p className="text-sm text-gray-900">{review.comment}</p>
                    </div>

                    <div className="flex items-center justify-end pt-3 border-t border-gray-200">
                      <button
                        onClick={() => deleteReviewHandler(review._id)}
                        className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                  <div className="text-sm text-gray-700">
                    Showing {indexOfFirstItem + 1} to{" "}
                    {Math.min(indexOfLastItem, reviews.length)} of {reviews.length} reviews
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded-md ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      } transition-colors`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="flex items-center space-x-1">
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPages ||
                          (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              onClick={() => paginate(pageNumber)}
                              className={`px-3 py-1 rounded-md text-sm font-medium ${
                                currentPage === pageNumber
                                  ? "bg-blue-600 text-white"
                                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                              } transition-colors`}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (
                          pageNumber === currentPage - 2 ||
                          pageNumber === currentPage + 2
                        ) {
                          return (
                            <span key={pageNumber} className="px-1 text-gray-400">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                      } transition-colors`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <h2 className="text-xl font-semibold text-gray-600">
                {productId ? "No Reviews Found" : "Enter a Product ID to search for reviews"}
              </h2>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReviews;
