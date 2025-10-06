import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";
import { useAuthUser } from "../../auth/hooks/useAuthUser";

function useGetPostsByProfile(profileId) {
  const { user } = useAuthUser();
  const [posts, setPosts] = useState([]);
  const [arePostsLoading, setArePostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(null);

  useEffect(() => {
    if (!profileId) return;

    const getPosts = async () => {
      const token = localStorage.getItem("authToken");
      try {
        const response = await fetch(`${HOST}/post/${profileId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
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
  }, [profileId, user]);

  return { posts, arePostsLoading, postsError, setPosts };
}

export default useGetPostsByProfile;
