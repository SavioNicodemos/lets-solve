import { Feather } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { HStack, Icon, IconButton, VStack, useToast } from 'native-base';
import { Alert } from 'react-native';

import { Menu, MenuItem } from '@/components/Menu';
import RenderComplaint from '@/components/RenderComplaint';
import { useAuth } from '@/hooks/useAuth';
import { useComplaint } from '@/hooks/useComplaint';
import { changeAdVisibility } from '@/queries/solves';

export default function Ad() {
  const { user } = useAuth();
  const toast = useToast();
  const { complaintId } = useLocalSearchParams();

  if (typeof complaintId !== 'string') {
    throw new Error('Invalid complaintId sent to Ad page');
  }

  const { data: complaint, isLoading, refetch } = useComplaint(complaintId);

  const isMyAd = user.id === complaint?.user_id;

  const { isPending: isLoadingChangeVisibility, mutateAsync } = useMutation({
    mutationFn: () => changeAdVisibility(complaintId, !!complaint?.is_active),
  });

  const handleChangeAdVisibility = async () => {
    await mutateAsync();
    toast.show({
      description: `Resolve ${
        !complaint?.is_active ? 'ativado' : 'desativado'
      } com sucesso`,
      placement: 'top',
      color: 'green.200',
    });
    refetch();
  };

  const handlePressArrowBackButton = () => {
    return router.back();
  };

  const handleGoToEditAd = () => {
    router.push({
      pathname: '/ad/create',
      params: { complaintId: complaint!.id },
    });
  };

  useFocusEffect(() => {
    refetch();
  });

  return (
    <VStack bgColor="gray.600" flex={1} pt={12}>
      <HStack px={6} justifyContent="space-between">
        <IconButton
          rounded="full"
          icon={
            <Icon as={Feather} name="arrow-left" color="gray.100" size="lg" />
          }
          onPress={handlePressArrowBackButton}
        />

        {isMyAd && (
          <Menu>
            <MenuItem icon="edit-3" onPress={handleGoToEditAd} title="Editar" />
            <MenuItem
              icon="power"
              onPress={handleChangeAdVisibility}
              title={
                complaint!.is_active ? 'Desativar Resolve' : 'Ativar Resolve'
              }
              isDisabled={isLoadingChangeVisibility}
            />
            <MenuItem
              icon="trash"
              title="Excluir Resolve"
              onPress={() =>
                Alert.alert(
                  'Função indisponível',
                  'A seguinte função ainda está em desenvolvimento',
                )
              }
            />
          </Menu>
        )}
      </HStack>

      <RenderComplaint isLoading={isLoading} complaint={complaint} />
    </VStack>
  );
}

export { ErrorBoundary } from '@/components/ErrorBoundary';
