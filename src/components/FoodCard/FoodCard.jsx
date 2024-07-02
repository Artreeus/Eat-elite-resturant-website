
import {  useNavigate } from "react-router-dom";


const FoodCard = ({ item }) => {
  const { title, image, price, recipe, _id,rating } = item;

  const navigate = useNavigate();


  const handleDetailClick = () => {
    navigate(`/detailpage/${_id}`, { state: { item } });
  };



  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img className="lg:w-[400px] lg:h-[250px]" src={image} alt="Shoes" />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">
        ${price}
      </p>
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title">{title}</h2>
        <p>{recipe}</p>
        <p className="font-xl mx-2">Rating : {rating}</p>
        <div className="card-actions justify-end">
          
          <button
            onClick={handleDetailClick}
            className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
