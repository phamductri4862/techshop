import { Button } from "@chakra-ui/button";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebook } from "react-icons/fa";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { authUser } from "../redux/slices/userSlice.js";

const FacebookLoginButton = () => {
  const dispatch = useDispatch();

  const handleFacebookLogin = (response) => {
    const { email, name, picture } = response;
    dispatch(
      authUser({
        endpoint: "/facebook-login",
        email,
        name,
        picture,
      })
    );
  };

  return (
    <FacebookLogin
      appId="392618369995125"
      autoLoad
      fields="name, email, picture"
      callback={handleFacebookLogin}
      render={(renderProps) => (
        <Button
          onClick={renderProps.onClick}
          leftIcon={<FaFacebook color="blue" size={20} />}
          width="full"
          colorScheme="orange"
          mt="1rem"
          variant="outline"
        >
          Facebook
        </Button>
      )}
    />
  );
};

export default FacebookLoginButton;
