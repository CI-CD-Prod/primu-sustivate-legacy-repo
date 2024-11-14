import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate, BrowserRouter as Router } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Home from "./scenes/home";
import Overview from "./scenes/overview";
import Assessments from "./scenes/assessments";
import HomePage from "./scenes/HomePage/HomePage";
import Profile from "./scenes/profile";
import FAQ from "./scenes/faq";

import LoginPage from './scenes/authentication/LoginPage';
import RegisterPage from './scenes/authentication/RegisterPage';
import ValidatePage from './scenes/authentication/Validate';
import ResetPasswordPage from './scenes/authentication/ResetPasswordPage';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import { getCurrentUser, fetchAuthSession, signOut } from 'aws-amplify/auth';
import { useMediaQuery } from "@mui/material";

Amplify.configure(awsExports);

async function currentAuthenticatedUser() {
  try {
    const user = await getCurrentUser();
    return true; // User is authenticated
  } catch (err) {
    console.log(err);
    return false; // User is not authenticated
  }
}

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250); // Default width
  const location = useLocation();
  const navigate = useNavigate();
  const [logoutTimer, setLogoutTimer] = useState(null);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  function updateAuthStatus(authStatus) {
    setIsAuthenticated(authStatus);
    localStorage.setItem('isAuthenticated', authStatus);
    if (!authStatus) {
      localStorage.removeItem('currentPath');
    }
  }

  function handleSidebarWidthChange(width) {
    setSidebarWidth(width);
  }

  async function handleLogout() {
    try {
      await signOut();
      setIsAuthenticated(false);
      localStorage.removeItem('currentPath');
      navigate('/login', { replace: true });
    } catch (error) {
      console.log('Error during logout:', error);
    }
  }

  useEffect(() => {
    // Check if the user is already authenticated on app load
    async function checkUser() {
      const isAuthenticated = await currentAuthenticatedUser();
      setIsAuthenticated(isAuthenticated);

      if (isAuthenticated) {
        const currentPath = localStorage.getItem('currentPath') || '/home';
        navigate(currentPath, { replace: true });

        try {
          const session = await fetchAuthSession();

          if (session && session.tokens && session.tokens.accessToken) {
            // Store the access token in sessionStorage
            sessionStorage.setItem('Access_Token', session.tokens.accessToken.toString());

            // Check if the payload exists before accessing it
            if (session.tokens.accessToken.payload && session.tokens.accessToken.payload.exp) {
              const expirationTime = new Date(session.tokens.accessToken.payload.exp * 1000).getTime() - new Date().getTime();
              const timer = setTimeout(() => handleLogout(), expirationTime);
              setLogoutTimer(timer);
            } else {
              console.error("Access token payload or expiration time not found");
            }
          } else {
            console.error("Session or tokens not available");
          }
        } catch (error) {
          console.error("Error fetching session:", error);
        }
      }
    }

    checkUser();

    return () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    };
  }, [navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('currentPath', location.pathname);
    }
  }, [isAuthenticated, location.pathname]);

  return (
    <div className="app" style={{ display: 'flex', minHeight: '100vh' }}>
      {isAuthenticated && (
        <Sidebar
          isSidebar={isSidebarCollapsed}
          updateAuthStatus={updateAuthStatus}
          onSidebarWidthChange={handleSidebarWidthChange}
          sidebarWidth={sidebarWidth} // Pass sidebar width to the Sidebar component
        />
      )}
      <main
        className="content"
        style={{
          marginLeft: isAuthenticated && !isSmallScreen ? `${sidebarWidth}px` : '0', // Adjust margin based on sidebar width and screen size
          width: isAuthenticated && !isSmallScreen ? `calc(100% - ${sidebarWidth}px)` : '100%', // Adjust width
          transition: "margin 0.3s, width 0.3s", // Smooth transition
          padding: isAuthenticated ? '1rem' : '0', // Add padding when sidebar is present
        }}
      >
        {isAuthenticated && <Topbar isAuthenticated={isAuthenticated} setIsSidebarCollapsed={setIsSidebarCollapsed} />}
        <Routes>
          <Route path='*' element={<HomePage isAuthenticated={isAuthenticated} />} />
          <Route path='/' exact={true} element={<HomePage isAuthenticated={isAuthenticated} />} />
          <Route path='/login' element={<LoginPage updateAuthStatus={updateAuthStatus} />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/validate' element={<ValidatePage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/assessments" element={isAuthenticated ? <Assessments /> : <Navigate to="/login" />} />
          <Route path="/overview" element={isAuthenticated ? <Overview /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/faq" element={isAuthenticated ? <FAQ /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
