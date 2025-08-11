import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import "./PostsList.css";
import PostCard from "./PostCard";
import { useAuthUser } from "../../auth/hooks/useAuthUser";

function PostsList({ profilePicture, name }) {
  const { posts, postsError, arePostsLoading } = useContext(PostContext);
  const { user } = useAuthUser();

  return (
    <div className={`post-list_container ${!user && "post-list_no-user"}`}>
      <div className="posts-title">
        <h1>Publicaciones</h1>
        <div>
          <hr className="divider-line" />
        </div>
      </div>

      <div className="posts-list">
        {posts?.map((post) => (
          <PostCard
            key={`post-${post.postId}`}
            body={post.body}
            profilePicture={profilePicture}
            name={name}
            createdAt={post.createdAt}
          />
        ))}
      </div>

      <p>No hay mas publicaciones que mostrar...</p>
    </div>
  );
}

export default PostsList;
