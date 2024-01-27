import {
  TextArea as NativeBaseTextArea,
  ITextAreaProps,
  FormControl,
} from 'native-base';

type Props = ITextAreaProps & {
  errorMessage?: string | null;
  isInvalid?: boolean;
  searchBar?: boolean;
  onSearchPress?: () => void;
  onFilterPress?: () => void;
};

export function TextArea({ errorMessage = null, isInvalid, ...rest }: Props) {
  const isInvalidField = !!errorMessage || isInvalid;
  return (
    <FormControl isInvalid={isInvalidField} mb={4}>
      <NativeBaseTextArea
        autoCompleteType="string"
        bg="gray.700"
        p={4}
        borderWidth={0}
        fontSize="md"
        color="gray.200"
        fontFamily="body"
        placeholderTextColor="gray.400"
        isInvalid={isInvalidField}
        minH={40}
        maxH={40}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'blue.500',
        }}
        {...rest}
      />
      <FormControl.ErrorMessage
        _text={{ color: 'red.500' }}
        bg="red.100"
        borderBottomLeftRadius="sm"
        borderBottomRightRadius="sm"
        mt={0}
        px={2}
        pb={1}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
