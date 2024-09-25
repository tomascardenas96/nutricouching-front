import { useUser } from "../context/UserProvider";

function useLogOut() {
  const { setUser } = useUser();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return { handleLogOut };
}

export default useLogOut;
