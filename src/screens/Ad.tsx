import { Menu, MenuItem } from '@components/Menu';
import RenderComplaint from '@components/RenderComplaint';
import {
  ComplaintApiDTO,
  ComplaintDTO,
  IComplaintId,
} from '@dtos/ComplaintDTO';
import { IAdDetailsRoutes } from '@dtos/RoutesDTO';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '@services/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { handleError } from '@utils/handleError';
import { HStack, Icon, IconButton, VStack, useToast } from 'native-base';
import { useCallback } from 'react';
import { Alert } from 'react-native';

const getComplaint = async (
  complaintId: IComplaintId,
): Promise<ComplaintDTO> => {
  const response = await api.get(`/complaints/${complaintId}`);
  const responseData: ComplaintApiDTO = response.data;

  const complaintData: ComplaintDTO = {
    ...responseData,
    complaint_images: responseData.complaint_images.map(image => ({
      ...image,
      isExternal: true,
    })),
  };
  return complaintData;
};

const changeAdVisibility = async (
  complaintId: IComplaintId,
  complaintActualStatus: boolean,
) => {
  try {
    const response = await api.patch(`/complaints/${complaintId}`, {
      is_active: !complaintActualStatus,
    });

    return response.data.is_active;
  } catch (error) {
    handleError(error);
    return complaintActualStatus;
  }
};

export function Ad({ navigation, route }: IAdDetailsRoutes): JSX.Element {
  const toast = useToast();
  const { complaintId, isMyAd } = route.params;

  const {
    data: complaint,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['complaint', complaintId],
    queryFn: () => getComplaint(complaintId),
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar o Resolve',
    },
  });

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
    const routeList = navigation.getState().routes;
    if (routeList[routeList.length - 2].name === 'adPreview') {
      return navigation.popToTop();
    }
    return navigation.goBack();
  };

  const handleGoToEditAd = () => {
    navigation.navigate('createAd', { complaint });
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

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

        {Boolean(isMyAd && complaint) && (
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
