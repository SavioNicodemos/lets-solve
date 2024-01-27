import { AdDetails } from '@components/AdDetails';
import { Button } from '@components/Button';
import Loading from '@components/Loading';
import { IProductId, ProductApiDTO, ProductDTO } from '@dtos/ProductDTO';
import { IAdDetailsRoutes } from '@dtos/RoutesDTO';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '@services/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { handleError } from '@utils/handleError';
import {
  Box,
  HStack,
  Heading,
  Icon,
  IconButton,
  VStack,
  useToast,
} from 'native-base';
import { useCallback } from 'react';
import { Platform } from 'react-native';

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
    isError,
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

  if (isError || !product) {
    return <Heading>Sorry, something went wrong! try again later</Heading>;
  }

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
        {isMyAd ? (
          <IconButton
            rounded="full"
            icon={
              <Icon as={Feather} name="edit-3" color="gray.100" size="lg" />
            }
            onPress={handleGoToEditAd}
          />
        ) : null}
      </HStack>

      {isLoading ? (
        <Loading backgroundStyle="appDefault" />
      ) : (
        <>
          <AdDetails product={product} />

          {isMyAd ? (
            <HStack
              justifyContent="space-between"
              bg="white"
              pt={4}
              pb={8}
              alignItems="center"
              px="6"
              flexDir="column"
              space={4}
            >
              <VStack>
                <Button
                  title={
                    product.is_active ? 'Desativar Resolve' : 'Ativar Resolve'
                  }
                  icon="power"
                  variant="primary"
                  minW={360}
                  isDisabled={isLoadingChangeVisibility}
                  onPress={handleChangeAdVisibility}
                />
              </VStack>
              <VStack mt={3}>
                <Button
                  title="Excluir Resolve"
                  icon="trash"
                  variant="secondary"
                  minW={360}
                />
              </VStack>
            </HStack>
          ) : (
            <HStack
              justifyContent="space-between"
              bg="white"
              pt={Platform.OS === 'ios' ? 4 : 8}
              pb={8}
              alignItems="center"
              px="6"
            >
              <Box flexDir="row" alignItems="baseline">
                <Heading
                  color="blue.700"
                  fontSize="sm"
                  mr="1"
                  fontFamily="heading"
                >
                  R$
                </Heading>
                <Heading color="blue.700" fontSize="2xl" fontFamily="heading">
                  13,00
                </Heading>
              </Box>
              <Button
                icon="message-circle"
                title="Entrar em contato"
                variant="blue"
                maxWidth={200}
                px={4}
              />
            </HStack>
          )}
        </>
      )}
    </VStack>
  );
}
