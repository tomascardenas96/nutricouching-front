import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";

function useGetPostsByProfile(profileId) {
  const [posts, setPosts] = useState([]);
  const [arePostsLoading, setArePostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(null);

  useEffect(() => {
    if (!profileId) return;

    const getPosts = async () => {
      try {
        const response = await fetch(`${HOST}/post/${profileId}`);
        if (!response.ok) throw new Error("Error al cargar los posts");

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setPostsError(error);
      } finally {
        setArePostsLoading(false);
      }
    };

    getPosts();
  }, [profileId]);

  return { posts, arePostsLoading, postsError, setPosts };
}

export default useGetPostsByProfile;
