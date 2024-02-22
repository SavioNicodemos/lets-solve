import { Feather } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { HStack, Icon, IconButton, VStack } from 'native-base';
import { useState } from 'react';
import { Alert } from 'react-native';

import { ComplaintEvaluationModal } from '@/components/ComplaintEvaluationModal';
import { Menu, MenuItem } from '@/components/Menu';
import RenderComplaint from '@/components/RenderComplaint';
import { ISubmitEvaluation } from '@/dtos/ComplaintDTO';
import { useAuth } from '@/hooks/useAuth';
import { useComplaint } from '@/hooks/useComplaint';
import { submitEvaluation } from '@/queries/mutations/solves';
import { handleError } from '@/utils/handleError';

export default function Ad() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  const { complaintId } = useLocalSearchParams();

  if (typeof complaintId !== 'string') {
    throw new Error('Invalid complaintId sent to Ad page');
  }

  const { data: complaint, isLoading, refetch } = useComplaint(complaintId);

  const isMyAd = user.id === complaint?.user.id;

  const { mutateAsync } = useMutation({
    mutationFn: (items: ISubmitEvaluation) =>
      submitEvaluation({ complaintId, ...items }),
  });

  const handleStartEvaluation = async (items: ISubmitEvaluation) => {
    try {
      setIsModalOpen(false);

      await mutateAsync(items);
      refetch();
    } catch (error) {
      handleError(error, 'Não foi possível avaliar a reclamação');
    }
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
      <ComplaintEvaluationModal
        isOpen={isModalOpen}
        onSuccessPress={handleStartEvaluation}
        onCancelPress={() => setIsModalOpen(false)}
      />

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
            <MenuItem
              icon="check"
              onPress={() => setIsModalOpen(true)}
              title="Fechar e avaliar"
            />
            <MenuItem icon="edit-3" onPress={handleGoToEditAd} title="Editar" />
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
