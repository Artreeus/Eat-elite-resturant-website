import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useContext } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const {name, category, recipe, price, _id} = useLoaderData();
    const { user } = useContext(AuthContext); 

    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        console.log(data)
        // image upload to imgbb and then get an url
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the menu item data to the server with the image url
            const menuItem = {
                title: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            // 
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log(menuRes.data)
            if(menuRes.data.modifiedCount > 0){
                // show success popup
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        console.log( 'with image url', res.data);
    };
    
    
    return (
        <div>
            <SectionTitle heading="Update an Item" subHeading="Refresh info"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            {...register('name')}
                            
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="default" {...register('category')}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">BreakFast</option>
                                <option value="pizza">Lunch</option>
                                <option value="soup">Dinner</option>
                               
                            </select>
                        </div>

                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price')}
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
                            {...register('adminName')}
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
                        <input {...register('image')} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">
                        Update menu Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;