import { Feather } from '@expo/vector-icons';
import { IPressableProps, Icon, Pressable, Text } from 'native-base';

export function SettingsItem({ title, onPress, ...rest }: Props) {
  return (
    <Pressable
      borderTopWidth={0.5}
      borderBottomWidth={0.5}
      width="full"
      mx={20}
      onPress={() => onPress()}
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      p="3"
      _pressed={{
        opacity: 0.5,
      }}
      {...rest}
    >
      <Text color="cyan.600">{title}</Text>

      <Icon as={Feather} name="chevron-right" size="md" color="gray.100" />
    </Pressable>
  );
}

type Props = IPressableProps & {
  title: string;
  onPress: () => void;
};
