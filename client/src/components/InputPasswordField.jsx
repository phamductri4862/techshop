import {
  FormControl,
  Input,
  FormLabel,
  VStack,
  FormErrorMessage,
  InputRightElement,
  Button,
  InputGroup,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const InputPasswordField = ({
  name,
  placeholder = "",
  label,
  type = "password",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField({ type, name });

  return (
    <VStack spacing={4}>
      <FormControl isInvalid={meta.error && meta.touched}>
        <FormLabel>{label}</FormLabel>
        <InputGroup>
          <Field
            as={Input}
            variant="outline"
            name={name}
            type={showPassword ? "text" : type}
            placeholder={placeholder}
          />

          <InputRightElement>
            <Button
              variant="ghost"
              size={100}
              p={2}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default InputPasswordField;
