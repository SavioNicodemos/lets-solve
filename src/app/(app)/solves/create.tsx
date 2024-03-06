import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import { HStack, ScrollView, Text, VStack } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/Button';
import { Header } from '@/components/Header';
import { Input } from '@/components/Input';
import { TextArea } from '@/components/TextArea';
import { UploadPicturesContainer } from '@/components/UploadPicturesContainer';
import { CreateComplaintDTO } from '@/dtos/ComplaintDTO';
import { useComplaint } from '@/hooks/useComplaint';
import { useToast } from '@/hooks/useToast';
import {
  deleteComplaintImagesByIds,
  updateComplaint,
} from '@/queries/mutations/solves';
import { api } from '@/services/api';
import { useCreateComplaint } from '@/stores/useCreateComplaint';
import { handleError } from '@/utils/handleError';
import { findDeletedObjects } from '@/utils/helpers/arrayHelper';

const createSolveSchema = z.object({
  name: z.string().min(1, 'Informe um título para a queixa'),

  description: z.string().min(1, 'Informe uma descrição para a queixa'),

  images: z.array(z.any()).min(1, 'Adicione pelo menos uma foto da queixa'),
});

export default function CreateSolve() {
  const toast = useToast();

  const { complaintId } = useLocalSearchParams();

  if (complaintId && typeof complaintId !== 'string') {
    throw new Error('Id inválido');
  }

  const { data: complaint } = useComplaint(complaintId);

  const isEditView = !!complaint;

  const initialPhotos = complaint?.images;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateComplaintDTO>({
    defaultValues: {
      name: isEditView ? complaint.name : '',
      description: isEditView ? complaint.description : '',
      images: isEditView ? complaint.images : [],
    },
    resolver: zodResolver(createSolveSchema),
  });

  const { setComplaint } = useCreateComplaint();

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToPreview = (data: CreateComplaintDTO) => {
    setComplaint(data);
    router.replace('/solves/preview');
  };

  const handleSuccessPress = async (data: CreateComplaintDTO) => {
    if (!isEditView) {
      handleGoToPreview(data);
      return;
    }

    const deletedPhotos = findDeletedObjects(
      initialPhotos!,
      data.images,
      'path',
    );
    const deletedPhotosIds = deletedPhotos
      .map(image => image?.id)
      .filter(Boolean) as string[];

    const newPhotosToAdd = data.images.filter(
      image => image.isExternal === false,
    );

    try {
      await updateComplaint({ id: complaint.id, ...data });

      if (newPhotosToAdd.length) {
        const imagesForm = new FormData();
        imagesForm.append('complaint_id', complaint.id);
        newPhotosToAdd.forEach((element: any) => {
          imagesForm.append('images[]', element);
        });

        await api.postForm('/complaints/images', imagesForm);
      }

      if (deletedPhotosIds.length) {
        await deleteComplaintImagesByIds(deletedPhotosIds);
      }

      toast.success('Resolve atualizado com sucesso!');

      router.back();
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
              name="images"
              render={({ field: { value, onChange } }) => (
                <UploadPicturesContainer
                  // @ts-expect-error The type 'IImageUpload | ImagesDTO' is not assignable to type 'IImageUpload'
                  value={value}
                  onChange={onChange}
                  errorMessage={errors.images?.message}
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

export { ErrorBoundary } from '@/components/ErrorBoundary';
