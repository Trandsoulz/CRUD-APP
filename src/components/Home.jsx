import { useAuthState } from "react-firebase-hooks/auth";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { useEffect, useState } from "react";
import Post from "./Post";

const Home = () => {
  const [user] = useAuthState(auth);
  const postRef = collection(db, "posts");
  const [postsList, setPostsList] = useState(null);
  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostsList(
      data.docs.map((post) => ({
        ...post?.data(),
        id: post?.id,
      }))
    );
    console.log(
      data.docs.map((post) => ({
        ...post?.data(),
        id: post?.id,
      }))
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h1>Welcome {user ? user.displayName : "to the home page"}</h1>

      {user ? (
        <Link
          to="/createpost"
          className="bg-blue-700 px-4 py-1 rounded hover:text-lg text-white"
        >
          Create Post
        </Link>
      ) : (
        ""
      )}

      <div>
        <h1>All Posts</h1>
        {postsList?.map((post) => (
          <Post post={post} />
        ))}
      </div>
    </>
  );
};

export default Home;
