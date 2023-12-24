import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  Container,
  Button,
  AbsoluteCenter,
  Divider,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate, useRouteError } from "react-router-dom";
import InputField from "../components/InputField.jsx";
import InputPasswordField from "../components/InputPasswordField.jsx";
import { useDispatch, useSelector } from "react-redux";
import { authUser, userSelector } from "../redux/slices/userSlice.js";
import AlertRow from "../components/AlertRow.jsx";
import { useEffect } from "react";
const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { userInfo, userErrorMsg } = useSelector(userSelector);
  const navigate = useNavigate()
  const location = useLocation()
  const toast = useToast()

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
        name: "",
      }}
      onSubmit={(values) => {
        dispatch(authUser({ endpoint: "/register", ...values }));
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email.")
          .required("Please fill your email address"),
        password: Yup.string()
          .min(2, "Password must contain at least 2 characters.")
          .required("Please fill your password"),
        name: Yup.string()
          .min(2, "Name must contain at least 2 characters.")
          .required("Please fill your name"),
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
            Register
          </Heading>
          <HStack justifyContent="center" mb="1rem">
            <Text>Already have an account?</Text>
            <Button as={Link} to="/login" variant="link" color="blue.800">
              Login
            </Button>
          </HStack>

          {userErrorMsg && (
            <AlertRow status="error" description={userErrorMsg} />
          )}
          <Form>
            <InputField
              type="text"
              name="name"
              placeholder="User"
              label="Name"
            />
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
              Register
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

export default RegisterScreen;
