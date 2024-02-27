import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Divider,
  HStack,
  Heading,
  Icon,
  IconButton,
  ScrollView,
  VStack,
  View,
} from 'native-base';
import { Alert } from 'react-native';

import { AvatarUpload } from '@/components/AvatarUpload';
import { Header } from '@/components/Header';
import { UserPhoto } from '@/components/UserPhoto';
import { UsersInGroupSection } from '@/components/UsersInGroupSection';
import { UsersInvitedSection } from '@/components/UsersInvitedSection';
import { useRemoveUserFromGroup } from '@/hooks/mutations/useRemoveUserFromGroup';
import { useUpdateGroup } from '@/hooks/mutations/useUpdateGroup';
import { useAuth } from '@/hooks/useAuth';
import { useGroup } from '@/hooks/useGroup';
import { useToast } from '@/hooks/useToast';

export { ErrorBoundary } from '@/components/ErrorBoundary';

export default function Group() {
  const id = useValidatedParams();

  const { user: loggedUser } = useAuth();
  const { data } = useGroup(id);
  const { mutateAsync } = useRemoveUserFromGroup(id);
  const toast = useToast();

  const isAdmin = data?.is_admin || false;

  const handleDeleteUser = (userId: string) => {
    const userName = data?.users.find(user => user.id === userId)?.name;

    Alert.alert(
      `Remover ${userName}`,
      `Deseja mesmo remover ${userName} do seu grupo?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: async () => {
            await removeUser(userId);

            toast.success(`${userName} foi removido do grupo`);
          },
        },
      ],
    );
  };

  const handleLeaveButtonPress = () => {
    const title = isAdmin ? 'Deseja mesmo sair do grupo?' : 'Sair do grupo';

    const message = isAdmin
      ? 'Se você sair, alguma outra pessoa aleatoriamente será promovida a administrador.'
      : 'Deseja mesmo sair do grupo?';

    Alert.alert(title, message, [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: async () => {
          await removeUser(loggedUser.id);

          toast.success('Você saiu do grupo');
          router.push('/');
        },
      },
    ]);
  };

  const removeUser = async (userId: string) => {
    try {
      await mutateAsync(userId);
    } catch (error) {
      toast.error('Erro ao sair do grupo');
    }
  };

  return (
    <ScrollView bgColor="gray.600">
      <VStack bgColor="gray.600" flex={1} pt={12} px={6}>
        <Header
          LeftIconComponent={
            <IconButton
              icon={<Icon as={Feather} name="log-out" color="red.500" />}
              onPress={() => handleLeaveButtonPress()}
            />
          }
        />

        <GroupHeaderInfo groupId={id} />

        <Divider my={4} />

        <UsersInGroupSection groupId={id} handleDeleteUser={handleDeleteUser} />

        {isAdmin && (
          <>
            <Divider my={4} />
            <UsersInvitedSection groupId={id} isAdmin={isAdmin} />
          </>
        )}
      </VStack>
    </ScrollView>
  );
}

const useValidatedParams = () => {
  const { id } = useLocalSearchParams();
  if (Array.isArray(id) || !id || Number.isNaN(Number(id))) {
    throw new Error('Id inválido!');
  }
  return Number(id);
};

function GroupHeaderInfo({ groupId }: { groupId: number }) {
  const { data, isLoading } = useGroup(groupId);
  const { mutate } = useUpdateGroup(groupId);

  const isAdmin = data?.is_admin;

  return (
    <HStack space={4} alignItems="center">
      <View>
        {isAdmin ? (
          <AvatarUpload
            size={16}
            value={{ isExternal: true, path: data?.image_url ?? '' }}
            onChange={image => mutate(image)}
          />
        ) : (
          <UserPhoto size={16} imageLink={data?.image_url || ''} />
        )}
      </View>
      <Heading textAlign="center" noOfLines={2} ellipsizeMode="tail" flex="1">
        {isLoading ? 'Carregando...' : data?.name}
      </Heading>
      <HStack alignItems="center" justifyContent="space-between">
        {isAdmin && (
          <IconButton
            rounded="full"
            icon={<Icon as={Feather} name="edit-2" color="blue.500" />}
          />
        )}
      </HStack>
    </HStack>
  );
}
