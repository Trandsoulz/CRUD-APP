import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { Login } from "./components/Login";
import { auth } from "./config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import CreatePost from "./components/form/Createpost";
import imgUrl from "../src/assets/user.png";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <nav className="bg-blue-600 p-4 text-lg duration-300 flex justify-between">
        <div className=" duration-500 flex items-center">
          <NavLink to="/" className="transition-all px-4 hover:text-xl">
            Home
          </NavLink>
          <NavLink to="/login" className=" transition-all px-4 hover:text-xl">
            Login
          </NavLink>
        </div>
        <div className="flex">
          {user ? (
            <>
              {/* <p className="transition-all hover:text-xl pr-2 pt-[5px]">
                {user.displayName}
              </p> */}
              <img src={user?.photoURL} alt="" className="rounded-full w-10" />
            </>
          ) : (
            <img src={imgUrl} alt="" className="rounded-full w-10" />
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="*" element={<h1>404 page</h1>} />
      </Routes>
    </>
  );
};

export default App;
