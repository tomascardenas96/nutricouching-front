import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserProfile } from "../../thunks/authThunks";
import FullSpinner from "../../../../common/components/FullSpinner";

function SessionInitializer({ children }) {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(loadUserProfile());
    }
  }, [token, user, dispatch]);

  // Si hay token pero aún no tenemos el usuario, la sesión está siendo restaurada
  if (token && !user) {
    return <FullSpinner />;
  }

  return children;
}

export default SessionInitializer;
