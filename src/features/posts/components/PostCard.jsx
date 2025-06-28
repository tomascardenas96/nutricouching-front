import { HOST } from "../../../api/data";
import { publishedAgo } from "../../../lib/date";
import "./PostCard.css";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoIosHeartEmpty } from "react-icons/io";

function PostCard({ body, profilePicture, name, createdAt }) {
  return (
    <div className="post-card">
      <div className="post-card_header">
        <div className="description">
          <div className="header_image">
            <img
              src={`${HOST}/uploads/professionals/profile/${profilePicture}`}
              alt="Foto de perfil de profesional en tarjeta de publicacion"
            />
          </div>

          <div className="name_hour">
            <p>{name}</p>
            <span>{publishedAgo(createdAt)}</span>
          </div>
        </div>

        <div className="options">
          <HiOutlineDotsHorizontal className="dots-icon" />
        </div>
      </div>

      <div className="post-card_body">
        <p>{body}</p>
      </div>

      <p className="post-card_quantity-likes">A 4 personas le gusta esto</p>

      <hr className="post-card_divider-line" />

      <div className="post-card_like">
        <div>
          <IoIosHeartEmpty />
          <p>Me gusta</p>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
