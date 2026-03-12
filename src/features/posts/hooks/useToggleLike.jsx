import { useEffect, useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import apiClient from "../../auth/api/apiClient";

function useToggleLike(isLiked, likeCount, postId) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [likeAmount, setLikeAmount] = useState(0);

  // Actualizamos liked y likeAmount cuando cambia user, isLiked o likeCount
  useEffect(() => {
    if (!user) {
      setLiked(false);
    }
    if (user) {
      setLiked(isLiked);
    }

    setLikeAmount(likeCount);
  }, [user, isLiked, likeCount]);

  const toggleLike = async () => {
    if (!user) return;

    const newLiked = !liked;
    setLiked(newLiked);
    setLikeAmount((prev) => prev + (newLiked ? 1 : -1));

    try {
      await apiClient.post(`/like/${postId}`);
    } catch (error) {
      setLiked(!newLiked);
      setLikeAmount((prev) => prev + (newLiked ? -1 : 1));
    }
  };

  return { toggleLike, liked, likeAmount };
}

export default useToggleLike;
