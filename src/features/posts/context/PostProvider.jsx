import useCreatePost from "../hooks/useCreatePost";
import useGetPostsByProfile from "../hooks/useGetPostsByProfile";
import { PostContext } from "./PostContext";

function PostProvider({ children, profileId }) {
  const { posts, setPosts, postsError, arePostsLoading } =
    useGetPostsByProfile(profileId);
  const { createPost, postInput, handleChangePostInput, handleEnterKeyDown } =
    useCreatePost(profileId, setPosts);

  return (
    <PostContext.Provider
      value={{
        createPost,
        postInput,
        handleChangePostInput,
        handleEnterKeyDown,
        posts,
        postsError,
        arePostsLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
