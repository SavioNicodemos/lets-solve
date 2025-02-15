import { Feather } from '@expo/vector-icons';
import {
  HStack,
  Icon,
  IconButton,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';
import { Alert } from 'react-native';
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  SlideOutRight,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';

import { UserItem } from '@/components/UserItem';
import { handleError } from '@/utils/handleError';
import { ListDivider } from './ListDivider';
import { useGroupInvites } from '@/features/groups/invites/queries';
import { IInviteFromGroup } from '@/features/groups/invites/types';
import { useManageGroupInvite } from '@/features/groups/invites/mutations';

export function InvitesSection() {
  const { data: invites, isLoading, isSuccess } = useGroupInvites();

  if (isLoading) {
    return <Spinner />;
  }

  if (invites?.length === 0 || !isSuccess) {
    return null;
  }

  return (
    <>
      <VStack px={4} pb={1}>
        <Text fontSize="md" color="gray.400" pb={2}>
          Convites recebidos
        </Text>
        <VStack space={2}>
          {invites.map(invite => (
            <InviteItem key={invite.id} invite={invite} />
          ))}
        </VStack>
      </VStack>
      <ListDivider />
    </>
  );
}

function InviteItem({ invite }: { invite: IInviteFromGroup }) {
  const { mutateAsync, isPending } = useManageGroupInvite();

  const handleAcceptDeclineInvite = async (accept: boolean) => {
    if (!accept) {
      Alert.alert(
        'Recusar convite',
        'Tem certeza que deseja recusar o convite?',
        [
          {
            text: 'Não',
            style: 'cancel',
          },
          {
            text: 'Sim',
            style: 'destructive',
            onPress: () => manageInvite('decline'),
          },
        ],
      );
      return;
    }

    manageInvite('accept');
  };

  const manageInvite = async (state: 'accept' | 'decline') => {
    try {
      await mutateAsync({ inviteId: invite.id, accept: state === 'accept' });
    } catch (error) {
      handleError(
        error,
        `Erro ao ${state === 'accept' ? 'aceitar' : 'recusar'} convite`,
      );
    }
  };

  const inviteOptions = [
    {
      accept: false,
      icon: 'x',
      color: 'red.500',
      animationIn: SlideInRight,
      animationOut: SlideOutRight,
    },
    {
      accept: true,
      icon: 'check',
      color: 'green.500',
      animationIn: SlideInLeft,
      animationOut: SlideOutLeft,
    },
  ];

  return (
    <UserItem
      key={invite.id}
      title={invite.name}
      image={invite.image_url}
      ActionIcons={
        isPending ? (
          <Animated.View
            entering={ZoomIn}
            exiting={ZoomOut}
            style={{ paddingRight: 40 }}
          >
            <Spinner size="sm" />
          </Animated.View>
        ) : (
          <HStack space={1}>
            {inviteOptions.map(option => (
              <View style={{ overflow: 'hidden' }} key={option.icon}>
                <Animated.View
                  entering={option.animationIn}
                  exiting={option.animationOut}
                >
                  <IconButton
                    key={option.icon}
                    rounded="full"
                    icon={
                      <Icon
                        as={Feather}
                        name={option.icon}
                        color={option.color}
                        size="lg"
                      />
                    }
                    onPress={() => handleAcceptDeclineInvite(option.accept)}
                  />
                </Animated.View>
              </View>
            ))}
          </HStack>
        )
      }
    />
  );
}
