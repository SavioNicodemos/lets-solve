/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { AdDetails } from '@components/AdDetails';
import { Button } from '@components/Button';
import { ShowAdDetailsDTO } from '@dtos/ComplaintDTO';
import { IAdPreviewRoutes } from '@dtos/RoutesDTO';
import { useAuth } from '@hooks/useAuth';
import { api } from '@services/api';
import { handleError } from '@utils/handleError';
import { Center, HStack, Heading, Text, VStack, useToast } from 'native-base';
import { Platform } from 'react-native';

export function AdPreview({ navigation, route }: IAdPreviewRoutes) {
  const { complaint } = route.params;
  const { user } = useAuth();
  const toast = useToast();

  const complaintPreview: ShowAdDetailsDTO = {
    ...complaint,
    user: {
      name: user.name,
      avatar: user.avatar,
      tel: user.tel,
    },
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoToAd = (complaintId: string) => {
    navigation.navigate('ad', { complaintId, isMyAd: true });
  };

  const handleCreateAd = async () => {
    try {
      const { name, description, complaint_images } = complaint;
      const createAdResponse = await api.post('/complaints', {
        name,
        description,
      });

      const complaintId = createAdResponse.data.id;

      const form = new FormData();
      form.append('complaint_id', complaintId);
      complaint_images.forEach((element: any) => {
        form.append('images[]', element);
      });

      await api.postForm('/complaints/images', form);

      toast.show({
        title: 'Produto criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      handleGoToAd(complaintId);
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

      <AdDetails complaint={complaintPreview} />

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
