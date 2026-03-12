import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, logoutUser } from '../thunks/authThunks';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, user, isLoading, error } = useSelector(state => state.auth);

    const login = useCallback(async (credentials) => {
        const success = await dispatch(loginUser(credentials));
        if (success) navigate('/');
    }, [dispatch, navigate]);

    const handleLogout = useCallback(async () => {
        await dispatch(logoutUser());
        navigate('/login');
    }, [dispatch, navigate]);

    return {
        isAuthenticated,
        user,
        isLoading,
        error,
        login,
        handleLogout
    }
}