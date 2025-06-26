import { useAuthUser } from "../../auth/hooks/useAuthUser";
import PostProvider from "../context/PostProvider";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";

function PostsSection({ profileId }) {
  const { user } = useAuthUser();

  return (
    <PostProvider profileId={profileId}>
      {profileId === user?.professional.profile.profileId && <CreatePost />}
      <PostsList />
    </PostProvider>
  );
}

export default PostsSection;
