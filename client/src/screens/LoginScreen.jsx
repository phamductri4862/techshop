import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  Container,
  Button,
  Divider,
  AbsoluteCenter,
  HStack,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "../components/InputField.jsx";
import InputPasswordField from "../components/InputPasswordField.jsx";
import { useDispatch, useSelector } from "react-redux";
import { authUser, userSelector } from "../redux/slices/userSlice.js";
import AlertRow from "../components/AlertRow.jsx";
import { useEffect } from "react";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

const LoginScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userErrorMsg, userInfo } = useSelector(userSelector);
  const toast = useToast();

  useEffect(() => {
    if (userInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
      toast({
        status: "success",
        description: "Log in successfully",
        isClosable: true,
      });
    }
  }, [userInfo]);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        dispatch(authUser({ endpoint: "/login", ...values }));
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email.")
          .required("Please fill your email address."),
        password: Yup.string()
          .min(2, "Password must contain at least 2 characters.")
          .required("Please fill your password."),
      })}
    >
      <Flex my="2rem" alignItems="center" justifyContent="center">
        <Container
          p="6"
          rounded="md"
          shadow="md"
          border="1px"
          borderColor="gray.200"
        >
          <Heading textAlign="center" mb="1rem">
            Login
          </Heading>
          <HStack justifyContent="center" mb="1rem">
            <Text>Not have an account yet?</Text>
            <Button as={Link} to="/register" variant="link" color="blue.800">
              Register
            </Button>
          </HStack>
          {userErrorMsg && (
            <AlertRow status="error" description={userErrorMsg} />
          )}
          <Form>
            <InputField
              type="text"
              name="email"
              placeholder="user@example.com"
              label="Email"
            />
            <InputPasswordField name="password" label="Password" />
            <Button
              size="lg"
              type="submit"
              width="full"
              colorScheme="orange"
              mt="1.5rem"
            >
              Login
            </Button>
            <Box position="relative" py="2rem">
              <Divider />
              <AbsoluteCenter bg="white">Or login with</AbsoluteCenter>
            </Box>
            <Button
              leftIcon={<FcGoogle size={20} />}
              width="full"
              colorScheme="orange"
              variant="outline"
            >
              Google
            </Button>
            <Button
              leftIcon={<FaFacebook color="blue" size={20} />}
              width="full"
              colorScheme="orange"
              mt="1rem"
              variant="outline"
            >
              Facebook
            </Button>
          </Form>
        </Container>
      </Flex>
    </Formik>
  );
};

export default LoginScreen;
