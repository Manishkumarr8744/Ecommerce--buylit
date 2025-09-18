import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorsPD } from "../../Reducer/ProductReducer/productDetailsReducer";
import { getProductDetails } from "../../Reducer/ProductReducer/productAction";
import { useParams } from "react-router-dom";
import { clearError, newReview } from "../../Reducer/ReviewReducer/reviewAction";
import { newReviewReset } from "../../Reducer/ReviewReducer/reviewReducer";
import { addtocart } from "../../Reducer/CartReducer/cartAction";
import MetaData from "../Layouts/MetaData";
import toast, {  } from "react-hot-toast";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { product, error } = useSelector((state) => state.productDetails);
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);

  const inStock = (product?.stock ?? product?.Stock ?? 0) > 0;

  const handleSubmitReview = () => {
    if (!rating || !comment) {
      toast.error("Please add rating and comment");
      return;
    }
    const reviewData = { rating, comment, id };
    dispatch(newReview(reviewData));
    setShowReviewForm(false);
    setRating(0);
    setComment("");
  };

  const addToCartHandler = () => {
    dispatch(addtocart(id, quantity));
    toast.success("Item added to cart");
  };

  const increaseQty = () => {
    const stock = product?.stock ?? product?.Stock ?? 0;
    if (stock <= quantity) return;
    setQuantity((q) => q + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity((q) => q - 1);
  };

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch product details");
      dispatch(clearErrorsPD());
    }
    if (success) {
      toast.success("Review submitted successfully");
      dispatch(newReviewReset());
      dispatch(getProductDetails(id));
    }
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearError());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, error, id, success, reviewError]);

  return (
    <div className=" mt-[3rem] max-w-5xl mx-auto p-6">
      <MetaData title={`${product?.name}- BuyLit`} />

      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-lg p-6">
        {/* Image */}
        <div className="flex justify-center items-center">
          <img
            src={product?.image?.[0]?.url || product?.images?.[0]?.url}
            alt={product?.name || "Product"}
            className="w-full h-96 object-cover rounded-xl"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-bold text-gray-800">{product?.name}</h1>
          <p className="text-2xl font-semibold text-blue-600">
            ₹{product?.price}
          </p>
          <p className="text-gray-600">{product?.description}</p>

          {/* Stock Status */}
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                inStock
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-red-100 text-red-700 border-red-200"
              }`}
            >
              {inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          {/* Add to Cart with quantity */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={decreaseQty}
                disabled={!inStock || quantity <= 1}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <span className="px-4 text-lg font-medium select-none">
                {quantity}
              </span>
              <button
                onClick={increaseQty}
                disabled={!inStock}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>

            <button
              disabled={!inStock}
              onClick={addToCartHandler}
              className="px-6 py-3 bg-green-600 text-white font-medium rounded-xl shadow hover:bg-green-700 transition disabled:bg-green-300 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>

          {/* Submit Review */}
          <button
            onClick={() => setShowReviewForm(true)}
            className="mt-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition"
          >
            Submit Review
          </button>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg relative">
            <button
              onClick={() => setShowReviewForm(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add Your Review
            </h2>

            {/* Rating */}
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-8 h-8 cursor-pointer ${
                    star <= rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Comment */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full h-28 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={handleSubmitReview}
              className="mt-4 w-full px-6 py-3 bg-green-600 text-white font-medium rounded-xl shadow hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Reviews List */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Customer Reviews
        </h2>

        {product?.reviews?.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl shadow border flex flex-col gap-2"
              >
                <div className="flex items-center gap-2">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 font-bold">{review.comment}</p>
                <span className="text-sm text-gray-500">
                  - Review By {review.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
