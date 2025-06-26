import { useContext } from "react";
import "./CreatePost.css";
import { PostContext } from "../context/PostContext";

function CreatePost() {
  const { createPost, postInput, handleChangePostInput } =
    useContext(PostContext);

  return (
    <form className="create-post_form" onSubmit={createPost}>
      <textarea value={postInput} onChange={handleChangePostInput}></textarea>
      <input
        type="submit"
        value="Publicar"
        disabled={postInput.trim() === ""}
      />
    </form>
  );
}

export default CreatePost;
