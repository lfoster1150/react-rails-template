import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute: React.FC<{loggedIn: boolean, children?: React.ReactNode}> = (props: {loggedIn: boolean, children?: ReactNode}) => {
  if (!props.loggedIn) {
    return <Navigate to="/login" replace />;
  }

  return props.children;
}
export default ProtectedRoute