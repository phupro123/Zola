import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../hooks/auth';

export default function Index() {
  const { isLoading, isError } = useUser();
  return (
    <>
      {isLoading ? null : (
        <>
          {isError ? (
            <Navigate to="/auth/login" />
          ) : (
            <Navigate to="/timeline" />
          )}
        </>
      )}
    </>
  );
}
