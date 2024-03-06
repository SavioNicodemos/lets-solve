import { Feather } from '@expo/vector-icons';
import { Icon, Pressable, Text } from '@gluestack-ui/themed';

export function SettingsItem({ title, onPress, ...rest }: Props) {
  return (
    <Pressable
      borderTopWidth={0.5}
      borderBottomWidth={0.5}
      width="$full"
      mx={20}
      onPress={() => onPress()}
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      p="$3"
      sx={{
        _pressed: {
          opacity: 0.5,
        },
      }}
      {...rest}
    >
      <Text color="cyan.600">{title}</Text>

      <Icon as={<Feather name="chevron-right" />} color="gray.100" />
    </Pressable>
  );
}

type Props = {
  title: string;
  onPress: () => void;
};
