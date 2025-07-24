import { useContext } from "react";
import { FaCamera } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { PostContext } from "../context/PostContext";
import "./CreatePost.css";

function CreatePost({ profilePicture }) {
  const { createPost, postInput, handleChangePostInput, handleEnterKeyDown } =
    useContext(PostContext);

  return (
    <form className="create-post_form" onSubmit={createPost}>
      <div className="title">
        <h1>Crear Publicacion</h1>
      </div>

      <div className="new-post">
        <div className="new-post_picture-photo">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Foto de perfil del usuario al crear una publicacion"
            />
          ) : (
            <img
              src="/assets/no-pic.jpg"
              alt="Foto de perfil del usuario al crear una publicacion"
            />
          )}
        </div>

        <div className="new-post_text-area">
          <textarea
            value={postInput}
            onChange={handleChangePostInput}
            onKeyDown={handleEnterKeyDown}
            placeholder="¿Qué estás pensando?"
          ></textarea>
          <hr />
          <div className="new-post_buttons">
            <button>
              <FaCamera /> Foto
            </button>

            <button type="submit" disabled={postInput.trim() === ""}>
              <IoSend /> Publicar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreatePost;
