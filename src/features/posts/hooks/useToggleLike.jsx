import { useEffect, useState } from "react";
import { HOST } from "../../../api/data";
import { useAuthUser } from "../../auth/hooks/useAuthUser";

function useToggleLike(isLiked, likeCount, postId) {
  const { user } = useAuthUser();
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

    const token = localStorage.getItem("authToken");
    const newLiked = !liked;
    setLiked(newLiked);
    setLikeAmount((prev) => prev + (newLiked ? 1 : -1));

    try {
      const response = await fetch(`${HOST}/like/${postId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Ha ocurrido un error");
    } catch (error) {
      setLiked(!newLiked);
      setLikeAmount((prev) => prev + (newLiked ? -1 : 1));
    }
  };

  return { toggleLike, liked, likeAmount };
}

export default useToggleLike;
