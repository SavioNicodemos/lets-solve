import { Feather } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { HStack, Heading, Icon, IconButton, Text, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import { z } from 'zod';

import { FetchInvitedUser, IInvitedUser } from '@/dtos/GroupDTO';
import { useDeleteGroupInvite } from '@/hooks/mutations/useDeleteGroupInvite';
import { useInvitedUsers } from '@/hooks/queries/useInvitedUsers';
import { useToast } from '@/hooks/useToast';

import { useSendGroupInvite } from '@/hooks/mutations/useSendGroupInvite';
import { Input } from './Input';
import { UserItem, UserItemSkeleton } from './UserItem';

type Props = {
  groupId: number;
  shouldRender: boolean;
};

export function UsersInvitedSection({ groupId, shouldRender }: Props) {
  const { data, isLoading, isSuccess } = useInvitedUsers(groupId);
  const { mutateAsync } = useDeleteGroupInvite(groupId);
  const toast = useToast();

  const handleClosePress = async (inviteId: number) => {
    Alert.alert(
      'Cancelar convite',
      'Deseja mesmo cancelar o convite para esse usuário?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Remover',
          onPress: () => handleDelete(inviteId),
        },
      ],
    );
  };

  const handleDelete = async (inviteId: number) => {
    try {
      await mutateAsync(inviteId);
      toast.success('Convidado removido com sucesso.');
    } catch (error) {
      toast.error('Erro ao remover convidado. Tente novamente.');
    }
  };

  if (!shouldRender) return null;

  return (
    <VStack>
      <InviteUserInput groupId={groupId} />
      <HStack alignItems="baseline">
        <Heading fontSize={16}>{data?.length}</Heading>
        <Text> convidados</Text>
      </HStack>

      <VStack space={4} mt={4}>
        <RenderInvitedUsers
          onClosePress={handleClosePress}
          isLoading={isLoading}
          isSuccess={isSuccess}
          groups={data || []}
        />
      </VStack>
    </VStack>
  );
}

function RenderInvitedUsers({
  onClosePress = () => {},
  isLoading,
  isSuccess,
  groups,
}: {
  onClosePress: (id: number) => void;
  isLoading: boolean;
  isSuccess: boolean;
  groups: IInvitedUser[];
}) {
  if (isLoading)
    return (
      <VStack space={2}>
        <UserItemSkeleton />
        <UserItemSkeleton />
      </VStack>
    );

  if (!isSuccess)
    return (
      <Text fontWeight="bold" color="red.500">
        Erro ao buscar seus convites
      </Text>
    );

  if (!groups.length) return null;

  return (
    <>
      {groups.map(user => (
        <InvitedUserItem
          key={user.id}
          user={user}
          onPress={() => onClosePress(user.id)}
        />
      ))}
    </>
  );
}

function InviteUserInput({ groupId }: { groupId: number }) {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SendInvite>({
    resolver: zodResolver(sendInviteSchema),
  });

  const { mutateAsync } = useSendGroupInvite(groupId);
  const toast = useToast();

  const submitForm = async (data: SendInvite) => {
    try {
      await mutateAsync(data.email);
      setValue('email', '');
      toast.success('Convite enviado com sucesso.');
    } catch (error) {
      toast.error('Erro ao enviar convite. Tente novamente.');
    }
  };

  return (
    <Controller
      control={control}
      name="email"
      render={({ field: { value, onChange } }) => (
        <Input
          value={value}
          onChangeText={onChange}
          placeholder="Convidar por e-mail"
          errorMessage={errors.email?.message}
          InputRightElement={
            <IconButton
              icon={<Icon as={Feather} name="send" />}
              rounded="full"
              onPress={() => handleSubmit(submitForm)()}
            />
          }
        />
      )}
    />
  );
}

type InvitedUserItemProps = {
  user: FetchInvitedUser;
  onPress: () => void;
};
function InvitedUserItem({ user, onPress }: InvitedUserItemProps) {
  return (
    <UserItem
      key={user.id}
      title={user.email}
      image=""
      ActionIcons={
        <IconButton
          rounded="full"
          icon={<Icon as={Feather} name="x" color="red.500" />}
          onPress={onPress}
        />
      }
    />
  );
}

type SendInvite = z.infer<typeof sendInviteSchema>;

const sendInviteSchema = z.object({
  email: z.string().email('E-mail inválido'),
});
