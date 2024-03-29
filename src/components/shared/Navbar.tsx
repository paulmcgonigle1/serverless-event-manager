import React from "react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    signOut();
  };
  return (
    <nav className=" border-gray-200 bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Global Event Manager Application
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden focus:outline-none focus:ring- text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          ></svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  bg-gray-800 md:bg-gray-900 border-gray-700">
            <li>
              <a
                href="/"
                className="block py-2 px-3 bg-blue-700 rounded md:bg-transparent  md:p-0 text-white md:text-blue-500"
                aria-current="page"
              >
                Events
              </a>
            </li>
            <li>
              <a
                href="tickets"
                className="block py-2 px-3 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  text-white md:   hover:bg-gray-700  hover:text-white md: hover:bg-transparent"
              >
                Tickets
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  text-white md:   hover:bg-gray-700  hover:text-white md: hover:bg-transparent"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3  rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  text-white md:   hover:bg-gray-700  hover:text-white md: hover:bg-transparent"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3  rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0  text-white md:   hover:bg-gray-700  hover:text-white md: hover:bg-transparent"
              >
                Contact
              </a>
            </li>
            {user && (
              <li>
                <span className="block py-2 px-3 rounded text-white">
                  Welcome, {user.email}
                </span>
                <span>
                  <button onClick={handleLogout} className="">
                    Logout
                  </button>
                </span>
              </li>
            )}
            {!user && (
              <li>
                <button
                  onClick={() =>
                    (window.location.href =
                      "https://globaleventmanager.auth.eu-west-1.amazoncognito.com/login?response_type=code&client_id=3c65sj6c3ok6ug3nqsoloi2gn4&redirect_uri=http://localhost:3000/callback")
                  }
                  className="block py-2 px-3 rounded text-white hover:bg-gray-700 focus:outline-none focus:ring"
                >
                  Log In / Sign Up
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
