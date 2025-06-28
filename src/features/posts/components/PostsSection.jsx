import { useAuthUser } from "../../auth/hooks/useAuthUser";
import PostProvider from "../context/PostProvider";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";
import "./PostsSection.css";

function PostsSection({ profileId, profilePicture, name }) {
  const { user } = useAuthUser();

  return (
    <PostProvider profileId={profileId}>
      <div className="posts-section_container">
        <div>
          {profileId === user?.professional.profile.profileId && (
            <div className="new-post_section-container">
              <CreatePost profilePicture={profilePicture} />
            </div>
          )}
          <PostsList profilePicture={profilePicture} name={name} />
        </div>
      </div>
    </PostProvider>
  );
}

export default PostsSection;
