import {
  Box,
  Flex,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Icon,
  Menu,
  MenuItem,
  MenuButton,
  Button,
  IconButton,
  MenuList,
  Divider,
} from "@chakra-ui/react";
import Logo from "./Logo.jsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoSearch } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { FaChevronDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, userSelector } from "../redux/slices/userSlice.js";

const Header = () => {
  const { userInfo } = useSelector(userSelector);
  const dispatch = useDispatch();
  return (
    <Box bg="blue.800">
      <Flex
        flexWrap={"wrap"}
        alignItems="center"
        justify="space-between"
        px={{ base: "1rem", md: "2rem", lg: "5rem", xl: "10rem" }}
        py="4"
      >
        <Box order={{ base: 2, md: 1 }}>
          <Logo />
        </Box>
        <Flex alignItems="center" gap="0.5rem" order={{ base: 1, md: 2 }}>
          <GiHamburgerMenu color="white" size="20" />
          <Text
            color="white"
            fontWeight="medium"
            display={{ base: "none", md: "block" }}
          >
            Category
          </Text>
        </Flex>
        <InputGroup
          w={{ base: "100%", md: "40%", xl: "60%" }}
          order={{ base: 4, md: 3 }}
          mt={{ base: "1rem", md: 0 }}
        >
          <InputLeftElement>
            <Icon as={IoSearch} />
          </InputLeftElement>
          <Input bg="white" placeholder="Search something..." />
        </InputGroup>
        <Box order={{ base: 3, md: 4 }}>
          <Menu placement="bottom-end">
            <MenuButton color="white" fontWeight="medium">
              <Flex alignItems="center" gap="0.5rem">
                <VscAccount size="20" />
                <Text display={{ base: "none", md: "inline-block" }}>
                  {userInfo ? userInfo.name : "Account"}
                </Text>
                <FaChevronDown />
              </Flex>
            </MenuButton>
            <MenuList minW="10rem">
              {!userInfo ? (
                <>
                  <MenuItem as={Link} to="/login">
                    Log in
                  </MenuItem>
                  <MenuItem as={Link} to="/register">
                    Sign up
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem as={Link} to="/orders">
                    Orders
                  </MenuItem>
                  <Divider />
                  <MenuItem as={Link} to="/profile">
                    Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={() => dispatch(logoutUser())}>
                    Log out
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
