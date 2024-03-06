import { Text } from '@gluestack-ui/themed-native-base';

type Props = {
  title: string;
};

export function EmptyListText({ title }: Props) {
  return (
    <Text color="gray.100" textAlign="center">
      {title}
    </Text>
  );
}
