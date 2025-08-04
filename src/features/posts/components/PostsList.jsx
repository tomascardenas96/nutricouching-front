import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import "./PostsList.css";
import PostCard from "./PostCard";

function PostsList({ profilePicture, name }) {
  const { posts, postsError, arePostsLoading } = useContext(PostContext);

  return (
    <div className="post-list_container">
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
