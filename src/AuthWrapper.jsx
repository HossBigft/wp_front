import Login from './Login';

const AuthWrapper = ({ children }) => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Login />;
  }

  return children;
};

export default AuthWrapper;