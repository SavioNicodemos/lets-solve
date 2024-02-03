import { zodResolver } from '@hookform/resolvers/zod';
import { HStack, ScrollView, Text, VStack, useToast } from 'native-base';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { TextArea } from '@components/TextArea';
import { UploadPicturesContainer } from '@components/UploadPicturesContainer';
import { CreateComplaintDTO, IImageUpload } from '@dtos/ComplaintDTO';
import { ICreateAdRoutes } from '@dtos/RoutesDTO';
import { api } from '@services/api';
import { handleError } from '@utils/handleError';
import { findDeletedObjects } from '@utils/helpers/arrayHelper';
import { z } from 'zod';

const createAdSchema = z.object({
  name: z.string().min(1, 'Informe um título para a queixa'),

  description: z.string().min(1, 'Informe uma descrição para a queixa'),

  complaint_images: z
    .array(z.any())
    .min(1, 'Adicione pelo menos uma foto da queixa'),
});

export function CreateAd({ navigation, route }: ICreateAdRoutes) {
  const toast = useToast();

  const { complaint } = route.params;

  const isEditView = !!complaint;

  const initialPhotos = complaint?.complaint_images;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateComplaintDTO>({
    defaultValues: {
      name: isEditView ? complaint.name : '',
      description: isEditView ? complaint.description : '',
    },
    resolver: zodResolver(createAdSchema),
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleGoToPreview = (data: CreateComplaintDTO) => {
    navigation.navigate('adPreview', { complaint: data });
  };

  const handleSuccessPress = async (data: CreateComplaintDTO) => {
    if (!isEditView) {
      handleGoToPreview(data);
      return;
    }

    const deletedPhotos = findDeletedObjects(
      initialPhotos as IImageUpload[],
      data.complaint_images,
      'path',
    );
    const deletedPhotosIds = deletedPhotos.map(image => image.id);

    const newPhotosToAdd = data.complaint_images.filter(
      image => image.isExternal === false,
    );

    try {
      await api.put(`/complaints/${complaint.id}`, data);

      if (newPhotosToAdd.length) {
        const imagesForm = new FormData();
        imagesForm.append('complaint_id', complaint.id);
        newPhotosToAdd.forEach((element: any) => {
          imagesForm.append('images[]', element);
        });

        await api.postForm('/complaints/images', imagesForm);
      }

      if (deletedPhotosIds.length) {
        await api.delete('/complaints/images', {
          data: {
            complaintImagesIds: deletedPhotosIds,
          },
        });
      }

      toast.show({
        title: 'Resolve atualizado com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });

      navigation.navigate('ad', { complaintId: complaint.id, isMyAd: true });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <VStack bgColor="gray.600" flex={1} pt={16} px={6}>
        <Header title={isEditView ? 'Editar Resolve' : 'Criar Resolve'} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack>
            <Text fontFamily="heading" fontSize="md" color="gray.200">
              Imagens
            </Text>
            <Text color="gray.300" fontSize="sm">
              Escolha até 3 imagens relacionadas ao seu Resolve!
            </Text>

            <Controller
              control={control}
              name="complaint_images"
              render={({ field: { value, onChange } }) => (
                <UploadPicturesContainer
                  value={value}
                  onChange={onChange}
                  errorMessage={errors.complaint_images?.message}
                />
              )}
            />
          </VStack>
          <VStack>
            <Text mb="4" fontFamily="heading" fontSize="md" color="gray.200">
              Sobre o Resolve
            </Text>

            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <Input
                  placeholder="Título"
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { value, onChange } }) => (
                <TextArea
                  placeholder="Descrição"
                  value={value}
                  onChangeText={onChange}
                  errorMessage={errors.description?.message}
                />
              )}
            />
          </VStack>
        </ScrollView>
      </VStack>
      <HStack
        justifyContent="space-between"
        bg="white"
        pt={4}
        pb={8}
        alignItems="center"
        px="6"
        space={4}
      >
        <Button
          title="Cancelar"
          variant="secondary"
          maxWidth={200}
          px={4}
          onPress={handleGoBack}
        />
        <Button
          title={isEditView ? 'Salvar Alterações' : 'Avançar'}
          variant="primary"
          maxWidth={200}
          px={4}
          onPress={handleSubmit(handleSuccessPress)}
        />
      </HStack>
    </>
  );
}
