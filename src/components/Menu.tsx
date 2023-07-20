import { Link } from "react-router-dom";
import { useGetIdentity, useLogout } from "@refinedev/core";
import { Logo } from "@/components/Logo";
import { IUser } from "@/interfaces";

export const MenuTop: React.FC = () => {
  const { data: user } = useGetIdentity<IUser>();
  const isLoggedIn = !!user;
  const { mutate: logout } = useLogout();

  return (
    <nav className="bg-gray-800 border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Logo collapsed={false} />

        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 rounded md:bg-transparent md:text-blue-700 md:p-0 md:text-blue-500 bg-blue-600"
              >
                Home
              </Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link
                  to="/login"
                  className="block py-2 pl-3 pr-4 md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Login
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link
                  to="/register"
                  className="block py-2 pl-3 pr-4 md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Register
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link
                  to="/dashboard"
                  className="block py-2 pl-3 pr-4 md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link
                  to=""
                  className="block py-2 pl-3 pr-4 md:border-0 md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 hover:text-white md:hover:bg-transparent"
                  onClick={() =>
                    logout(
                      { redirectPath: "/" },
                      {
                        onSuccess: (data) => {
                          if (!data.success) {
                            console.log(data);
                          }
                          console.log("success");
                        },
                      }
                    )
                  }
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
