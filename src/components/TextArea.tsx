import {
  FormControl,
  FormControlErrorText,
  Textarea as NativeBaseTextArea,
} from '@gluestack-ui/themed';

type Props = typeof NativeBaseTextArea & {
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
        // autoCompleteType="string"
        bg="gray.700"
        p={4}
        borderWidth={0}
        // fontSize="md"
        // color="gray.200"
        // fontFamily="body"
        // placeholderTextColor="gray.400"
        isInvalid={isInvalidField}
        minH={40}
        maxH={40}
        sx={{
          ':invalid': {
            borderWidth: 1,
            borderColor: 'red.500',
          },
          ':focus': {
            bg: 'gray.700',
            borderWidth: 1,
            borderColor: 'blue.500',
          },
        }}
        {...rest}
      />
      <FormControlErrorText
        sx={{
          _text: { color: 'red.500' },
        }}
        bg="red.100"
        borderBottomLeftRadius="$sm"
        borderBottomRightRadius="$sm"
        mt={0}
        px={2}
        pb={1}
      >
        {errorMessage}
      </FormControlErrorText>
    </FormControl>
  );
}
