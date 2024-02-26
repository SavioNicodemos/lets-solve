import { HStack, Heading, Text, VStack } from 'native-base';

import { UserPhoto } from './UserPhoto';

type Props = {
  ActionIcons?: React.ReactNode;
  image?: string;
  title: string;
  subtitle?: string;
};
export function UserItem({
  ActionIcons,
  image = '',
  subtitle = '',
  title,
}: Props) {
  return (
    <HStack space={4} alignItems="center" justifyContent="space-between">
      <HStack space={4} alignItems="center">
        <UserPhoto size={12} imageLink={image} />
        <VStack>
          <Heading fontSize={16}>{title}</Heading>
          {!!subtitle && <Text>{subtitle}</Text>}
        </VStack>
      </HStack>

      {ActionIcons || null}
    </HStack>
  );
}
