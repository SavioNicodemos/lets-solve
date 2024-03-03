import { Feather } from '@expo/vector-icons';
import { HStack, Heading, Icon, IconButton, Text, VStack } from 'native-base';

import { PublicUserDTO } from '@/dtos/UserDTO';
import { useAuth } from '@/hooks/useAuth';

import { UserItem } from './UserItem';

type Props = {
  participants: PublicUserDTO[];
  handleDeleteUser: (userId: string) => void;
  isAdmin: boolean;
};

export function UsersInGroupSection({
  participants,
  handleDeleteUser,
  isAdmin,
}: Props) {
  const { user: myUser } = useAuth();
  return (
    <VStack>
      <HStack alignItems="baseline">
        <Heading fontSize={16}>{participants.length}</Heading>
        <Text> participantes</Text>
      </HStack>

      <VStack space={4} mt={4}>
        {participants?.map(user => (
          <UserItem
            key={user.id}
            title={user.name}
            image={user.avatar_url}
            ActionIcons={
              <IconAction
                onPress={() => handleDeleteUser(user.id)}
                hideDeleteIcon={user.id === myUser.id || !isAdmin}
              />
            }
          />
        ))}
      </VStack>
    </VStack>
  );
}

type IconActionProps = {
  hideDeleteIcon: boolean;
  onPress: () => void;
};

function IconAction({ onPress, hideDeleteIcon }: IconActionProps) {
  if (hideDeleteIcon) return null;

  return (
    <IconButton
      rounded="full"
      icon={<Icon as={Feather} name="x" color="red.500" />}
      onPress={onPress}
    />
  );
}
