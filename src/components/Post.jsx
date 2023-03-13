import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";

const Post = ({ post }) => {
  const likesRef = collection(db, "likes");
  //Functions to get how many likes on a post
  const likesDoc = query(likesRef, where("postId", "==", post.id));
  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({
        userId: doc.data().userId,
      }))
    );
    console.log(
      data.docs.map((doc) => ({
        userId: doc.data().userId,
      }))
    );
  };
  // How many likes a post got

  const [likes, setLikes] = useState(null);
  // State for current user
  const [user] = useAuthState(auth);

  // Add Like
  const addLike = async () => {
    try {
      await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev ? [...prev, { userId: user.uid }] : [{ userId: user.uid }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Remove like
  const removeLike = async () => {
    try {
      const likesDocToDelete = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user.uid)
      );
      const likesToDeleteData = await getDocs(likesDocToDelete);
      const likeId = likesToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev.filter((like) => like.id === likeId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Check if user has liked
  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <>
      {/* <h1>This is a post component</h1> */}

      <div className="m-4 rounded-xl p-4 bg-black text-white ">
        <h1>{post.Title}</h1>
        <p>{post.Description}</p>
        <p>@{post.Username}</p>
        <button
          onClick={hasUserLiked ? removeLike : addLike}
          className="active:scale-125  
        "
        >
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {likes && <p>Likes: {likes?.length}</p>}
      </div>
    </>
  );
};

export default Post;
