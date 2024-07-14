import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userLoggedIn, userLoggedOut } from '../store/features/auth/authSlice';

const useAuthCheck = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('auth')) || '';

    if (auth && auth.accessToken && auth.user) {
      const userInfo = {
        accessToken: auth.accessToken,
        user: auth.user
      };
      dispatch(userLoggedIn(userInfo));

      // Calculate time until token expiration
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpire = auth.user.exp - currentTime;

      if (timeUntilExpire > 0) {
        // Set a timeout to auto-logout when the token expires
        setTimeout(() => {
          dispatch(userLoggedOut());
        }, timeUntilExpire * 1000);
      } else {
        // If token is already expired, log out immediately
        dispatch(userLoggedOut());
      }
    }

    setAuthChecked(true);
  }, [dispatch]);

  return authChecked;
};

export default useAuthCheck;
