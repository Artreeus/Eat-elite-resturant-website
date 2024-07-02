import React, { useEffect, useState } from "react";
import axios from "axios";

const ReviewTable = () => {
  const [reviews, setReviews] = useState([]);
  const [editableReview, setEditableReview] = useState(null);

  useEffect(() => {
    // Fetch reviews from the backend API
    axios
      .get("https://final-project-server-rouge.vercel.app/mealreviews")
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      // Delete the review from the backend API
      await axios.delete(
        `https://final-project-server-rouge.vercel.app/mealreviews/${id}`
      );
      // Remove the deleted review from the local state
      setReviews(reviews.filter((review) => review._id !== id));
      // Clear the editable review state if the deleted review was being edited
      if (editableReview && editableReview._id === id) {
        setEditableReview(null);
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handleEdit = (id) => {
    // Find the review to edit
    const reviewToEdit = reviews.find((review) => review._id === id);
    // Set the review to editable
    setEditableReview(reviewToEdit);
  };

  const handleSave = async () => {
    try {
      // Send a PATCH request to update the review in the backend
      await axios.patch(
        `https://final-project-server-rouge.vercel.app/mealreviews/${editableReview._id}`,
        editableReview
      );
      // Clear the editable review state
      setEditableReview(null);
      // Refresh the reviews list to reflect the changes
      axios
        .get("https://final-project-server-rouge.vercel.app/menu")
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  const handleInputChange = (e) => {
    // Update the editable review state with the new input value
    setEditableReview({
      ...editableReview,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Meal Title</th>
            <th className="px-4 py-2">Likes</th>
            <th className="px-4 py-2">Review</th>
            <th className="px-4 py-2">Edit</th>
            <th className="px-4 py-2">Delete</th>
            <th className="px-4 py-2">View Meal</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id} className="border-b">
              <td className="px-4 py-2">
                {editableReview && editableReview._id === review._id ? (
                  <input
                    type="text"
                    name="title"
                    value={editableReview.title}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  review.title
                )}
              </td>
              <td className="px-4 py-2">{review.likeCount}</td>
              <td className="px-4 py-2">
                {editableReview && editableReview._id === review._id ? (
                  <textarea
                    name="comment"
                    value={editableReview.comment}
                    onChange={handleInputChange}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  review.comment
                )}
              </td>
              <td className="px-4 py-2">
                {editableReview && editableReview._id === review._id ? (
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(review._id)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(review._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
              <td className="px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  View Meal
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewTable;
