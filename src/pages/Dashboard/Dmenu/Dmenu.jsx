import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddMealModal = ({ isOpen, onClose, fetchUpcomingMeals }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    likes: 0, // Assuming initial likes count is 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://final-project-server-rouge.vercel.app/upcoming",
        formData
      );
      console.log(res.data);
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Upcoming meal added successfully.",
        });
        // Clear form data after successful submission
        setFormData({
          title: "",
          description: "",
          likes: 0,
        });
        fetchUpcomingMeals(); // Fetch updated upcoming meals
        onClose(); // Close the modal
      }
    } catch (error) {
      console.error("Error adding upcoming meal:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add upcoming meal.",
      });
    }
  };

  return (
    <div className={`modal ${isOpen ? "modal-open" : "modal-close"}`}>
      <div className="modal-box">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-control">
            <button type="submit" className="btn w-1/2 my-7 mx-auto">
              Add Meal
            </button>
          </div>
        </form>
        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const Dmenu = () => {
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUpcomingMeals();
  }, []);

  const fetchUpcomingMeals = () => {
    axios
      .get("https://final-project-server-rouge.vercel.app/upcoming")
      .then((response) => {
        const sortedMeals = response.data.sort((a, b) => b.likes - a.likes);
        setUpcomingMeals(sortedMeals);
      })
      .catch((error) => {
        console.error("Error fetching upcoming meals:", error);
      });
  };

  const handleAddToMenu = (item) => {
    const { _id, ...itemWithoutId } = item; // Remove _id from the item

    axios
      .post("https://final-project-server-rouge.vercel.app/menu", itemWithoutId)
      .then((response) => {
        if (response.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: `${item.title} has been added to the menu.`,
          });
        }
      })
      .catch((error) => {
        console.error("Error adding item to menu:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add item to menu.",
        });
      });
  };

  const handlePublish = (id) => {
    const mealToPublish = upcomingMeals.find((meal) => meal._id === id);

    // Call the handleAddToMenu function to add the meal to the menu
    handleAddToMenu(mealToPublish);

    // Remove the published item from the upcomingMeals state
    setUpcomingMeals((prevMeals) =>
      prevMeals.filter((meal) => meal._id !== id)
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold mb-4">Upcoming Meals</h1>

        <AddMealModal
          isOpen={isModalOpen}
          onClose={closeModal}
          fetchUpcomingMeals={fetchUpcomingMeals}
        />
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Likes</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {upcomingMeals.map((meal) => (
              <tr key={meal._id}>
                <td className="border px-4 py-2">{meal.title}</td>
                <td className="border px-4 py-2">{meal.description}</td>
                <td className="border px-4 py-2">{meal.likes}</td>
                <td className="border px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handlePublish(meal._id)}
                  >
                    Publish
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={openModal} className="btn-outline btn my-7 ">
        Add Upcoming Meal
      </button>
    </>
  );
};

export default Dmenu;
