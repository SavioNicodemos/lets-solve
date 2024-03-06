import { router } from 'expo-router';
import { Center, HStack, Heading, Text, VStack } from 'native-base';
import { Platform } from 'react-native';

import { Button } from '@/components/Button';
import { SolveDetails } from '@/components/SolveDetails';
import { ShowSolveDetailsDTO } from '@/dtos/ComplaintDTO';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { createComplaint } from '@/queries/mutations/solves';
import { api } from '@/services/api';
import { useCreateComplaint } from '@/stores/useCreateComplaint';
import { handleError } from '@/utils/handleError';

export { ErrorBoundary } from '@/components/ErrorBoundary';

export default function SolvePreview() {
  const { complaint } = useCreateComplaint();
  const { user } = useAuth();
  const toast = useToast();

  if (!complaint) {
    throw new Error('Complaint not found');
  }

  const complaintPreview: ShowSolveDetailsDTO = {
    ...complaint,
    user,
    state: {
      color: 'green.500',
      name: 'Status',
      key: 'status',
      id: 0,
      is_positive: true,
    },
  };

  const handleGoBack = () => {
    router.back();
  };

  const handleGoToSolve = (complaintId: string) => {
    router.replace({
      pathname: '/solves/',
      params: { complaintId },
    });
  };

  const handleCreateSolve = async () => {
    try {
      const { name, description, images: complaintImages } = complaint;

      const createSolveResponse = await createComplaint({ name, description });

      const complaintId = createSolveResponse.id;

      const form = new FormData();
      form.append('complaint_id', complaintId);
      complaintImages.forEach((element: any) => {
        form.append('images[]', element);
      });

      await api.postForm('/complaints/images', form);

      toast.success('Produto criado com sucesso!');

      handleGoToSolve(complaintId);
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

      <SolveDetails complaint={complaintPreview} />

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
          onPress={handleCreateSolve}
        />
      </HStack>
    </VStack>
  );
}
