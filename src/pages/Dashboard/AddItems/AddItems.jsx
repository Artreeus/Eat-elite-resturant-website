import { useForm } from "react-hook-form";
import { useContext } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext); // Fetching admin email from context
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log('Form data:', data);

        // Image upload to imgbb
        const formData = new FormData();
        formData.append('image', data.image[0]);

        try {
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            console.log('Image upload response:', res.data);

            if (res.data.success) {
                // Send menu item data to the server with the image URL
                const menuItem = {
                    title: data.name,
                    category: data.category,
                    price: parseFloat(data.price),
                    recipe: data.recipe,
                    image: res.data.data.display_url,
                    ingredients: data.ingredients,
                    description: data.description,
                    rating: parseInt(data.rating),
                    postTime: new Date().toISOString(), // Capture current time
                    adminName: data.adminName, // Using admin name from the form
                    adminEmail: user?.email, // Using admin email from context
                    adminRole: data.adminRole // Adding admin role from the form
                };

                const menuRes = await axiosSecure.post('/menu', menuItem);
                console.log('Menu item response:', menuRes.data);

                if (menuRes.data.insertedId) {
                    reset();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${data.name} is added to the menu.`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } catch (error) {
            console.error('Error uploading image or adding menu item:', error);
        }
    };

    return (
        <div>
            <SectionTitle heading="add an item" subHeading="What's new?" ></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            {...register('name', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="default" {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                               
                            </select>
                        </div>

                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Admin Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Admin Name"
                            {...register('adminName', { required: true })}
                            className="input input-bordered" />
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Admin Email</span>
                        </label>
                        <input
                            type="email"
                            value={user?.email || ''} // Display admin email from context
                            readOnly
                            className="input input-bordered" />
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Admin Role</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Admin Role"
                            value={'admin'} // Assuming role is always 'admin'
                            {...register('adminRole')}
                            readOnly
                            className="input input-bordered" />
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Ingredients</span>
                        </label>
                        <textarea {...register('ingredients')} className="textarea textarea-bordered h-24" placeholder="Ingredients"></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <input
                            type="number"
                            placeholder="Rating"
                            {...register('rating')}
                            className="input input-bordered" />
                    </div>

                    <div className="form-control w-full my-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">
                        Add Item <FaUtensils className="ml-4"></FaUtensils>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;
