import { provider, auth } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const res = await signInWithPopup(auth, provider);
    console.log(res);
    navigate("/");
  };

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <>
      <h1>This is the Login page</h1>

      <button
        onClick={signInWithGoogle}
        className="border-2 border-blue-600 rounded px-4 py-1"
      >
        Sign in with Google
      </button>

      <button
        onClick={signUserOut}
        className="border-2 border-red-600 rounded px-4 py-1"
      >
        Sign Out
      </button>
    </>
  );
};
