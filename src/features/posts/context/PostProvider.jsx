import useCreatePost from "../hooks/useCreatePost";
import useGetPostsByProfile from "../hooks/useGetPostsByProfile";
import { PostContext } from "./PostContext";

function PostProvider({ children, profileId }) {
  const { posts, setPosts, postsError, arePostsLoading } =
    useGetPostsByProfile(profileId);
  const {
    createPost,
    postInput,
    handleChangePostInput,
    handleEnterKeyDown,
    handleSelectImage,
    postSelectedImage,
    imagePreview,
    handleUnselectImage,
    fileInputRef,
  } = useCreatePost(profileId, setPosts);

  return (
    <PostContext.Provider
      value={{
        createPost,
        setPosts,
        postInput,
        handleChangePostInput,
        handleEnterKeyDown,
        posts,
        postsError,
        arePostsLoading,
        handleSelectImage,
        postSelectedImage,
        imagePreview,
        handleUnselectImage,
        fileInputRef,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
