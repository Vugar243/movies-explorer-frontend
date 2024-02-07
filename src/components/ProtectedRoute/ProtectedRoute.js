import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props  }) => {
  return (
    props.isAuthenticated
     ? 
     <Component 
     isAuthenticated={props.isAuthenticated} 
     element={props.Movies} 
     saveMovies={props.saveMovies} 
     setSaveMovies={props.setSaveMovies} 
     error={props.error} setError={props.setError} 
     loading={props.loading} 
     setLoading={props.setLoading} 
     navigate={props.navigate} 
     handleNavigationButtonClick={props.handleNavigationButtonClick} 
     location={props.location} 
     isNavigationPopupOpen={props.isNavigationPopupOpen} 
     closeAllPopups={props.closeAllPopups} 
     setIsAuthenticated={props.setIsAuthenticated} 
     setCurrentUser={props.setCurrentUser} 
     handleUpdateUser={props.handleUpdateUser} 
     isEditing={props.isEditing} 
    setIsEditing={props.setIsEditing}  /> 
    : 
    <Navigate to="/signin" replace/>
)}

export default ProtectedRouteElement;



