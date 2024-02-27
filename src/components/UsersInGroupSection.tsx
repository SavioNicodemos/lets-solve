import { Feather } from '@expo/vector-icons';
import { HStack, Heading, Icon, IconButton, Text, VStack } from 'native-base';

import { PublicUserDTO } from '@/dtos/UserDTO';
import { useAuth } from '@/hooks/useAuth';
import { useGroup } from '@/hooks/useGroup';

import { UserItem } from './UserItem';

type Props = {
  groupId: number;
  handleDeleteUser: (userId: string) => void;
};

export function UsersInGroupSection({ groupId, handleDeleteUser }: Props) {
  const { data } = useGroup(groupId);

  return (
    <VStack>
      <HStack alignItems="baseline">
        <Heading fontSize={16}>{data?.participants_count}</Heading>
        <Text> participantes</Text>
      </HStack>

      <VStack space={4} mt={4}>
        {data?.participants?.map(user => (
          <UserItem
            key={user.id}
            title={user.name}
            image={user.avatar_url}
            ActionIcons={
              <IconAction
                user={user}
                onPress={() => handleDeleteUser(user.id)}
                groupId={groupId}
              />
            }
          />
        ))}
      </VStack>
    </VStack>
  );
}

type IconActionProps = {
  user: PublicUserDTO;
  onPress: () => void;
  groupId: number;
};

function IconAction({ onPress, groupId, user }: IconActionProps) {
  const { user: myUser } = useAuth();
  const { data } = useGroup(groupId);

  const isAdmin = !!data?.is_admin;

  if (!isAdmin) return null;

  if (user.id === myUser.id) return null;

  return (
    <IconButton
      rounded="full"
      icon={<Icon as={Feather} name="x" color="red.500" />}
      onPress={onPress}
    />
  );
}
