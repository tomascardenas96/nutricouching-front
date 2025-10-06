import { useContext } from "react";
import { PostContext } from "../context/PostContext";
import "./PostsList.css";
import PostCard from "./PostCard";
import { useAuthUser } from "../../auth/hooks/useAuthUser";
import PostsListSkeleton from "./loaders/PostsListSkeleton";
import NetworkError from "../../../common/components/NetworkError";

function PostsList({ profilePicture, name }) {
  const { posts, setPosts, postsError, arePostsLoading } =
    useContext(PostContext);
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
        {postsError ? (
          <NetworkError message="Error al cargar las publicaciones" />
        ) : arePostsLoading ? (
          <PostsListSkeleton />
        ) : (
          posts?.map((post) => (
            <PostCard
              key={`post-${post.postId}`}
              body={post.body}
              profilePicture={profilePicture}
              name={name}
              createdAt={post.createdAt}
              image={post.image}
              id={post.postId}
              setPosts={setPosts}
              isLiked={post.isLiked}
              likeCount={post.likeCount}
              postId={post.postId}
            />
          ))
        )}
      </div>

      <p>No hay mas publicaciones para mostrar...</p>
    </div>
  );
}

export default PostsList;
