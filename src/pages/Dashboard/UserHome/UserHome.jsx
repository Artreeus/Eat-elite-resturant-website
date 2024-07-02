import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();

  return (
    <div>
      <div className="flex items ">
          <img
            src={user.photoURL}
            alt="User"
            className="w-16 h-16 rounded-full mr-4"
          />
       
        <div>
          <h2 className="text-3xl">
            <span>Hi, Welcome </span>
            {user?.displayName ? user.displayName : "Back"}
          </h2>
          {user?.email && <p>{user.email}</p>}

          <p className=" text-white">Subscription status : <span className="text-[#2bd439]">{user?.subscription}</span> </p>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
