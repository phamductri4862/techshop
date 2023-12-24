import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" cursor="pointer">
      <Image src="/images/logo.png" width="100px" />
    </Link>
  );
};

export default Logo;
