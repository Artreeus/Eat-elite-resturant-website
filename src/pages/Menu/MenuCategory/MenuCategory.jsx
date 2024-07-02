import Cover from '../../Shared/Cover/Cover';

const MenuCategory = ({ items, title, img }) => {
    return (
        <div className='pt-8'>
            {title && <Cover img={img} title={title}></Cover>}
            <div className="grid md:grid-cols-2 gap-10 my-16">
                {
                    items.map(item => (
                        <div key={item._id} className="card bg-base-100 shadow-xl">
                            <figure>
                                <img className="lg:w-[400px] lg:h-[250px]" src={item.image} alt={item.title} />
                            </figure>
                            <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">
                                ${item.price}
                            </p>
                            <div className="card-body flex flex-col items-center">
                                <h2 className="card-title">{item.title}</h2>
                                <p>{item.recipe}</p>
                                <div className="card-actions justify-end">
                                    <button
                                        className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4"
                                    
                                    >Rating :
                                         {item.rating}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default MenuCategory;
