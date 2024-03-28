import {
  Divider,
  FormControl,
  HStack,
  Icon,
  IconButton,
  IInputProps,
  Input as NativeBaseInput,
} from 'native-base';

import { Feather } from '@expo/vector-icons';

type Props = IInputProps & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  searchBar?: boolean;
  onSearchPress?: () => void;
  onFilterPress?: () => void;
};

export function Input({
  errorMessage = null,
  isInvalid,
  searchBar = false,
  onSearchPress = () => {},
  onFilterPress = () => {},
  mx,
  ...rest
}: Props) {
  const isInvalidField = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={isInvalidField} mb={4}>
      <NativeBaseInput
        bg="gray.700"
        h={12}
        mx={mx}
        borderWidth={0}
        fontSize="md"
        color="gray.200"
        fontFamily="body"
        placeholderTextColor="gray.400"
        isInvalid={isInvalidField}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'blue.500',
        }}
        InputRightElement={
          searchBar ? (
            <HStack height="6" mx="1" alignItems="center">
              <IconButton
                rounded="full"
                icon={
                  <Icon as={Feather} name="search" color="gray.200" size="lg" />
                }
                _pressed={{ bg: 'gray.600' }}
                onPress={onSearchPress}
              />
              <Divider orientation="vertical" width="0.5" />
              <IconButton
                rounded="full"
                icon={
                  <Icon
                    as={Feather}
                    name="sliders"
                    color="gray.200"
                    size="lg"
                  />
                }
                _pressed={{ bg: 'gray.600' }}
                onPress={onFilterPress}
              />
            </HStack>
          ) : undefined
        }
        {...rest}
      />
      <FormControl.ErrorMessage
        _text={{ color: 'red.500' }}
        bg="red.100"
        borderBottomLeftRadius="sm"
        borderBottomRightRadius="sm"
        mt={0}
        px={2}
        mx={mx}
        pb={1}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
