import { useContext } from "react";
import { PostContext } from "../context/PostContext";

function PostsList() {
  const { posts, postsError, arePostsLoading } = useContext(PostContext);

  return (
    <div>
      {posts?.map((post) => (
        <div key={`post-${post.postId}`}>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
