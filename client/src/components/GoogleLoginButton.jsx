import { Button } from "@chakra-ui/button";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { authUser } from "../redux/slices/userSlice.js";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useToast } from "@chakra-ui/toast";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      const { data } = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        }
      );
      const { email, given_name, family_name, picture } = data;
      dispatch(
        authUser({
          endpoint: "/google-login",
          email,
          given_name,
          family_name,
          picture,
        })
      );
    },
    onError: () => {
      toast({
        description:
          "There are some errors with google login. Please try again later.",
        status: "error",
      });
    },
  });

  return (
    <Button
      leftIcon={<FcGoogle size={20} />}
      width="full"
      colorScheme="orange"
      variant="outline"
      onClick={handleGoogleLogin}
    >
      Google
    </Button>
  );
};

export default GoogleLoginButton;
