import React, { useContext }  from 'react';
import { Route, Redirect } from 'react-router-dom';
import { FirebaseContext } from '../firebase';

const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() =>
        localStorage.logInStatus
        ? (children)
        : (<Redirect to="/" />)
      }
    />
  )
}

export default ProtectedRoute;