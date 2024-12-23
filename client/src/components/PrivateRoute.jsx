import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/auth';

export default function PrivateRoute({ children }) {
  const { data, isLoading, isError } = useUser();
  return (
    <>
      {isLoading ? null : (
        <>{isError ? <Navigate to="/auth/login" /> : children}</>
      )}
    </>
  );
}
