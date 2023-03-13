import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export const CreateForm = () => {
  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    title: yup.string().required("You must add a Title"),
    description: yup.string().required("You must add a Description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");
  const navigate = useNavigate();

  const OnCreatePost = async (data) => {
    //   console.log(data);
    await addDoc(postRef, {
      Title: data.title,
      Description: data.description,
      //   ...data, To destructure the data
      USERID: user?.uid,
      Username: user?.displayName,
    });
    console.log("done");
    navigate("/");
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit(OnCreatePost)}
      className="mt-10 px-[30px] py-[20px] w-[320px] bg-black rounded"
    >
      <input type="text" placeholder="Title..." {...register("title")} />
      <p className="text-red-600">{errors.title?.message}</p>
      <textarea
        rows={10}
        cols={20}
        type="text"
        placeholder="Description..."
        {...register("description")}
      />
      <p className="text-red-600">{errors.description?.message}</p>
      <input
        type="submit"
        value="Submit"
        className="bg-white rounded px-3 py-1 hover:cursor-pointer"
      />
    </form>
  );
};
