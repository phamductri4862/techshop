import {
  FormControl,
  Input,
  FormLabel,
  VStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { Field, useField } from "formik";

const InputField = ({
  name,
  type = "text",
  placeholder = "",
  label,
}) => {
  const [field, meta] = useField({ type, name });

  return (
    <VStack spacing={4} my='1rem'>
      <FormControl isInvalid={meta.error && meta.touched}>
        <FormLabel>{label}</FormLabel>
        <Field
          as={Input}
          variant="outline"
          name={name}
          type={type}
          placeholder={placeholder}
        />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    </VStack>
  );
};

export default InputField;
