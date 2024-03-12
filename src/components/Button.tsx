/* eslint-disable no-nested-ternary */
import { Feather } from '@expo/vector-icons';
import { IPressableProps, Icon, Pressable, Spinner, Text } from 'native-base';

type Props = IPressableProps & {
  title: string;
  variant?: 'blue' | 'primary' | 'secondary';
  icon?: keyof typeof Feather.glyphMap;
  isLoading?: boolean;
};

export function Button({
  title,
  variant = 'primary',
  icon,
  isLoading,
  ...rest
}: Props) {
  const textColor = variant === 'secondary' ? 'gray.200' : 'gray.700';
  return (
    <Pressable
      flex={1}
      maxH={12}
      h={12}
      bg={
        variant === 'blue'
          ? 'blue.500'
          : variant === 'primary'
            ? 'gray.100'
            : 'gray.500'
      }
      borderColor="green.500"
      rounded="md"
      _pressed={{
        bg:
          variant === 'blue'
            ? 'blue.700'
            : variant === 'primary'
              ? 'gray.200'
              : 'gray.600',
      }}
      flexDir="row"
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      {icon ? (
        <Icon
          as={Feather}
          name={icon}
          color={variant === 'secondary' ? 'black' : 'white'}
          size={5}
          mr={2}
        />
      ) : null}
      {isLoading ? (
        <Spinner color={variant === 'secondary' ? 'black' : 'white'} />
      ) : (
        <Text color={textColor} fontFamily="heading" fontSize="sm">
          {title}
        </Text>
      )}
    </Pressable>
  );
}
