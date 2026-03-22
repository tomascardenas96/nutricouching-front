import { memo, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoIosHeart, IoIosHeartEmpty, IoMdClose } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { publishedAgo } from "../../../lib/date";
import "./PostCard.css";
import useHandlePostsModals from "../hooks/useHandlePostsModals";
import { createPortal } from "react-dom";
import ConfirmationModal from "../../../common/components/ConfirmationModal";
import useDeletePost from "../hooks/useDeletePost";
import useToggleLike from "../hooks/useToggleLike";
import noProfilePicture from "/assets/empty-profile.svg";

function PostCard({
  body,
  profilePicture,
  name,
  createdAt,
  image,
  id,
  setPosts,
  isLiked,
  likeCount,
  postId,
}) {
  const [isFullImageOpen, setIsFullImageOpen] = useState(false);
  const [isOptionsModalDeployed, setIsOptionsModalDeployed] = useState(false);
  const {
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isDeletePostModalOpen,
  } = useHandlePostsModals();
  const { handleDeletePost } = useDeletePost(setPosts, handleCloseDeleteModal);

  const { toggleLike, liked, likeAmount } = useToggleLike(
    isLiked,
    likeCount,
    postId,
  );

  return (
    <div className="post-card">
      <div className="post-card_header">
        <div className="description">
          <div className="header_image">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Foto de perfil de profesional en tarjeta de publicacion"
              />
            ) : (
              <img
                src={noProfilePicture}
                alt="Foto de perfil de profesional en tarjeta de publicacion"
              />
            )}
          </div>

          <div className="name_hour">
            <p>{name}</p>
            <span>{publishedAgo(createdAt)}</span>
          </div>
        </div>

        <div
          className="options"
          onClick={() => setIsOptionsModalDeployed(!isOptionsModalDeployed)}
        >
          <HiOutlineDotsHorizontal className="dots-icon" />

          {isOptionsModalDeployed && (
            <div className="options-modal">
              <p onClick={handleOpenDeleteModal}>
                <MdDeleteOutline />
                Eliminar
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="post-card_body">
        <p>{body}</p>
        {image && (
          <div className="post-card_image">
            <img
              src={image}
              alt="Foto de publicacion"
              onClick={() => setIsFullImageOpen(true)}
            />
          </div>
        )}
      </div>

      <p className="post-card_quantity-likes">
        A {likeAmount} personas le gusta esto
      </p>

      <hr className="post-card_divider-line" />

      <div className="post-card_like">
        <button onClick={toggleLike}>
          {liked ? <IoIosHeart className="liked" /> : <IoIosHeartEmpty />}
          <p className={`${liked ? "liked-paragraph" : undefined}`}>Me gusta</p>
        </button>
      </div>

      {isFullImageOpen && (
        <div className="full-size-post-image_container">
          <div>
            <IoMdClose
              className="close-icon"
              onClick={() => setIsFullImageOpen(false)}
            />
            <img src={image} alt="Foto de publicacion" />
          </div>
        </div>
      )}

      {isDeletePostModalOpen &&
        createPortal(
          <ConfirmationModal
            onConfirm={() => handleDeletePost(id)}
            message="¿Seguro que deseas eliminar la publicacion?"
            onClose={handleCloseDeleteModal}
          />,
          document.getElementById("root-portal"),
        )}
    </div>
  );
}

export default memo(PostCard);
