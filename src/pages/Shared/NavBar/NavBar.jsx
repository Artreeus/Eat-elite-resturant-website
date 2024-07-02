import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import { IoIosNotificationsOutline } from "react-icons/io";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <div className="lg:flex lg:justify-center lg:items-center">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/menu">Meals</Link>
      </li>
      <li>
        <Link to="/secret">Upcoming Meals</Link>
      </li>
      {user && (
        <li>
          <Link to="/Membership">Checkout</Link>
        </li>
      )}
      <li>
        <button className="text-2xl">
          <IoIosNotificationsOutline />
        </button>
      </li>
    </div>
  );

  return (
    <>
      <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl bg-black text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <img
            src="https://i.ibb.co/C13F7Fq/141837-3031164-375573-image-removebg-preview.png"
            className="w-12"
            alt=""
          />
          <a href="/" className="btn btn-ghost normal-case text-xl">
            Eat Elite
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end lg:pe-10">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-12 rounded-full">
                    <img src={user?.photoURL} alt="User" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li className="menu-title">
                    <span>{user?.displayName}</span>
                  </li>
                  <li>
                    <Link
                      to={`/dashboard/${
                        user.isAdmin ? "adminHome" : "userHome"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <button onClick={handleLogOut}>Log Out</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <ul>
              <li>
                <Link to="/login" className="btn">
                  Join Us
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default NavBar;
