import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const DetailPage = () => {
  const { id } = useParams(); // Get the ID from the URL parameters
  const location = useLocation(); // Access state passed via navigate
  const item = location.state?.item;
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [cart, refetch] = useCart();
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Check if the item is liked in local storage
    const likedItems = JSON.parse(localStorage.getItem("likedItems")) || {};
    if (item && likedItems[item._id]) {
      setLikeCount(item.likes);
      setHasLiked(true);
    } else if (item) {
      setLikeCount(item.likes);
    }
  }, [item]);

  useEffect(() => {
    // Fetch reviews for the item from the backend
    if (item) {
      axiosSecure
        .get(
          `https://final-project-server-rouge.vercel.app/mealreviews/${item._id}`
        )
        .then((res) => {
          setReviews(res.data.reviews || []);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    }
  }, [item, axiosSecure]);

  if (!item) {
    return <div>No item found.</div>; // Display message if no item is found
  }

  const handleAddToCart = () => {
    if (user && user.email) {
      // Check if the item is already in the cart
      const itemExists = cart.some((cartItem) => cartItem.menuId === item._id);

      if (itemExists) {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: `${item.title} is already in your cart`,
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      // Send cart item to the database
      const cartItem = {
        menuId: item._id,
        email: user.email,
        title: item.title,
        image: item.image,
        price: item.price,
      };

      axiosSecure.post("/carts", cartItem).then((res) => {
        console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${item.title} added to your cart`,
            showConfirmButton: false,
            timer: 1500,
          });
          // Refetch cart to update the cart items count
          refetch();
        }
      });
    } else {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to add to the cart?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          // Send the user to the login page
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };

  const handleLike = () => {
    // Function remains unchanged
  };

  const handleReviewSubmit = () => {
    if (!user || !user.email) {
      Swal.fire({
        title: "You are not Logged In",
        text: "Please login to submit a review.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, login!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
      return;
    }

    if (reviewText.trim() === "") {
      Swal.fire({
        title: "Empty Review!",
        text: "Please write a review before submitting.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // Prepare the review object
    const reviewData = {
      title: item.title,
      likeCount: 0, // Initially set to 0
      comment: reviewText.trim(),
      rating: item.rating, // Use the meal's existing rating
      userName: user.email, // Assuming user's email is used as the username
    };

    // Send the review to the backend
    axiosSecure
      .post(
        `https://final-project-server-rouge.vercel.app/mealreviews`,
        reviewData
      )
      .then((res) => {
        // Assuming the backend returns the updated list of reviews
        setReviews([...reviews, reviewData]); // Add the new review to the existing list
        setReviewText(""); // Clear the review text field
        Swal.fire({
          title: "Review Submitted!",
          text: "Thank you for your review.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to submit review. Please try again later.",
          icon: "error",
          confirmButtonColor: "#3085d6",
        });
      });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4 p-4 pt-[10%] pb-28">
      <div className="md:w-1/2">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-auto rounded"
        />
      </div>
      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
        <p className="text-lg mb-4">{item.description}</p>
        {item.adminName && (
          <p className="text-lg mb-4">Admin/Distributor: {item.adminName}</p>
        )}
        {item.ingredients && (
          <p className="text-lg mb-4">Ingredients: {item.ingredients}</p>
        )}
        {item.postTime && (
          <p className="text-lg mb-4">
            Posted on: {new Date(item.postTime).toLocaleDateString()}
          </p>
        )}
        {item.rating && (
          <p className="text-lg mb-4">Rating: {item.rating} / 5</p>
        )}
        <p className="text-xl font-semibold mb-4">Price: ${item.price}</p>
        <div className="flex gap-4 mb-4">
          <button
            onClick={handleAddToCart}
            className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400"
          >
            Request Meal
          </button>
          <button
            onClick={handleLike}
            className={`btn ${hasLiked ? "btn-primary" : "btn-outline"}`}
          >
            {hasLiked ? "Liked" : "Like"} ({likeCount})
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index} className="mb-2">
                <p>
                  <strong>{review.userName}:</strong> {review.comment}
                </p>
                <p>Rating: {review.rating} / 5</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available.</p>
        )}
        {/* New section for submitting reviews */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            rows="4"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
          ></textarea>
          <div className="flex justify-end mt-4">
            <button onClick={handleReviewSubmit} className="btn btn-primary">
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
