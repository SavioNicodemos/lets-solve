import { Menu, MenuItem } from '@components/Menu';
import RenderProduct from '@components/RenderProduct';
import { IProductId, ProductApiDTO, ProductDTO } from '@dtos/ProductDTO';
import { IAdDetailsRoutes } from '@dtos/RoutesDTO';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '@services/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { handleError } from '@utils/handleError';
import { HStack, Icon, IconButton, VStack, useToast } from 'native-base';
import { useCallback } from 'react';
import { Alert } from 'react-native';

const getProduct = async (productId: IProductId): Promise<ProductDTO> => {
  const response = await api.get(`/products/${productId}`);
  const responseData: ProductApiDTO = response.data;

  const productData: ProductDTO = {
    ...responseData,
    product_images: responseData.product_images.map(image => ({
      ...image,
      isExternal: true,
    })),
  };
  return productData;
};

const changeAdVisibility = async (
  productId: IProductId,
  productActualStatus: boolean,
) => {
  try {
    const response = await api.patch(`/products/${productId}`, {
      is_active: !productActualStatus,
    });

    return response.data.is_active;
  } catch (error) {
    handleError(error);
    return productActualStatus;
  }
};

export function Ad({ navigation, route }: IAdDetailsRoutes): JSX.Element {
  const toast = useToast();
  const { productId, isMyAd } = route.params;

  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar o Resolve',
    },
  });

  const { isPending: isLoadingChangeVisibility, mutateAsync } = useMutation({
    mutationFn: () => changeAdVisibility(productId, !!product?.is_active),
  });

  const handleChangeAdVisibility = async () => {
    await mutateAsync();
    toast.show({
      description: `Resolve ${
        !product?.is_active ? 'ativado' : 'desativado'
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
    navigation.navigate('createAd', { product });
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

        {Boolean(isMyAd && product) && (
          <Menu>
            <MenuItem icon="edit-3" onPress={handleGoToEditAd} title="Editar" />
            <MenuItem
              icon="power"
              onPress={handleChangeAdVisibility}
              title={
                product!.is_active ? 'Desativar Resolve' : 'Ativar Resolve'
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

      <RenderProduct isLoading={isLoading} product={product} />
    </VStack>
  );
}
