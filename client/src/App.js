import {
  Box,
  ChakraProvider,
  Flex,
  Spinner,
  useStatStyles,
} from "@chakra-ui/react";
import Header from "./components/Header.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexScreen from "./screens/IndexScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import LoginScreen from "./screens/LoginScreen.jsx";
import { useDispatch, useSelector } from "react-redux";
import "./config/axiosConfig.js";
import { useEffect, useState } from "react";
import { getProfile, userSelector } from "./redux/slices/userSlice.js";
import AnonymousContainer from "./containers/AnonymousContainer.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  const { firstLoading } = useSelector(userSelector);
  useEffect(() => {
    dispatch(getProfile());
  }, []);

  return (
    <ChakraProvider>
      <GoogleOAuthProvider clientId="164577575549-kdi5jprl8v987eghd78ls40d1vcq5s2j.apps.googleusercontent.com">
        {firstLoading ? (
          <Flex minH="100vh" alignItems="center" justifyContent="center">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Flex>
        ) : (
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<IndexScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
            </Routes>
          </BrowserRouter>
        )}
      </GoogleOAuthProvider>
    </ChakraProvider>
  );
}

export default App;
