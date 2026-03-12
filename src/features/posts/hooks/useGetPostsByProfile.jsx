import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import apiClient from "../../auth/api/apiClient";

function useGetPostsByProfile(profileId) {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [arePostsLoading, setArePostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(null);

  useEffect(() => {
    if (!profileId) return;

    const getPosts = async () => {
      try {
        const { data } = await apiClient.get(`/post/${profileId}`);
        setPosts(data);
      } catch (error) {
        setPostsError(error);
      } finally {
        setArePostsLoading(false);
      }
    };

    getPosts();
  }, [profileId, user]);

  return { posts, arePostsLoading, postsError, setPosts };
}

export default useGetPostsByProfile;
