import { Feather } from '@expo/vector-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { HStack, Icon, IconButton, VStack, useToast } from 'native-base';
import { Alert } from 'react-native';

import { Menu, MenuItem } from '@/components/Menu';
import RenderComplaint from '@/components/RenderComplaint';
import { changeAdVisibility, getComplaint } from '@/queries/solves';

export default function Ad() {
  const navigation = useNavigation();
  const toast = useToast();
  const { complaintId, isMyAd } = useLocalSearchParams();

  const {
    data: complaint,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['complaint', complaintId],
    queryFn: () => getComplaint(complaintId as string),
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar o Resolve',
    },
  });

  const { isPending: isLoadingChangeVisibility, mutateAsync } = useMutation({
    mutationFn: () =>
      changeAdVisibility(complaintId as string, !!complaint?.is_active),
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
    const routeList = navigation.getState().routes;
    if (routeList[routeList.length - 2].name === 'adPreview') {
      return router.push('/');
    }
    return navigation.goBack();
  };

  const handleGoToEditAd = () => {
    router.push({
      pathname: '/ad/create',
      params: { complaint: JSON.stringify(complaint) },
    });
  };

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

        {Boolean(Boolean(isMyAd) && complaint) && (
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
