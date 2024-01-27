/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { AdDetails } from '@components/AdDetails';
import { Button } from '@components/Button';
import { ShowAdDetailsDTO } from '@dtos/ProductDTO';
import { IAdPreviewRoutes } from '@dtos/RoutesDTO';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
import { handleError } from '@utils/handleError';
import { Center, HStack, Heading, Text, VStack, useToast } from 'native-base';
import { Platform } from 'react-native';

export function AdPreview({ navigation, route }: IAdPreviewRoutes) {
  const { product } = route.params;
  const { user } = useAuth();
  const toast = useToast();

  const productPreview: ShowAdDetailsDTO = {
    ...product,
    user: {
      name: user.name,
      avatar: user.avatar,
      tel: user.tel,
    },
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoToAd = (productId: string) => {
    navigation.navigate('ad', { productId, isMyAd: true });
  };

  const handleCreateAd = async () => {
    try {
      const {
        name,
        description,
        product_images,
      } = product;
      const createAdResponse = await api.post('/products', {
        name,
        description,
      });

      const productId = createAdResponse.data.id;

      const form = new FormData();
      form.append('product_id', productId);
      product_images.forEach((element: any) => {
        form.append('images', element);
      });

      await api.post('/products/images', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.show({
        title: 'Produto criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      handleGoToAd(productId);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <VStack bgColor="blue.500" flex={1} pt={12}>
      <Center py="3">
        <Heading fontFamily="heading" color="gray.700" fontSize="md">
          Pré visualização do Resolve
        </Heading>
        <Text color="gray.700" fontSize="md">
          É assim que seu Resolve vai aparecer!
        </Text>
      </Center>

      <AdDetails product={productPreview} />

      <HStack
        justifyContent="space-between"
        bg="white"
        pt={Platform.OS === 'ios' ? 4 : 8}
        pb={8}
        alignItems="center"
        px="6"
        space={4}
      >
        <Button
          icon="arrow-left"
          title="Editar"
          variant="secondary"
          maxWidth={200}
          px={4}
          onPress={handleGoBack}
        />
        <Button
          icon="tag"
          title="Publicar"
          variant="blue"
          maxWidth={200}
          px={4}
          onPress={handleCreateAd}
        />
      </HStack>
    </VStack>
  );
}
