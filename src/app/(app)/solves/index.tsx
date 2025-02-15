import { Feather } from '@expo/vector-icons';
import {
  Redirect,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from 'expo-router';
import { HStack, Icon, IconButton, VStack } from 'native-base';
import { useState } from 'react';
import { Alert } from 'react-native';

import { ComplaintEvaluationModal } from '@/components/ComplaintEvaluationModal';
import { Menu, MenuItem } from '@/components/Menu';
import RenderComplaint from '@/components/RenderComplaint';
import { handleError } from '@/utils/handleError';
import { useAuth } from '@/features/auth/hooks';
import { useSolve } from '@/features/solves/queries';
import { useSubmitEvaluation } from '@/features/solves/mutations';
import { ISubmitEvaluation } from '@/features/solves/types';

export default function Complaint() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = useAuth();
  const { complaintId } = useLocalSearchParams();

  if (typeof complaintId !== 'string') {
    throw new Error('Id inválido');
  }

  const {
    data: complaint,
    isLoading,
    refetch,
    isError,
  } = useSolve(complaintId);

  const isMySolve = user.id === complaint?.user.id;
  const isResolved = complaint?.is_resolved;

  const { mutateAsync } = useSubmitEvaluation(complaintId);

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

  const handleGoToEditSolve = () => {
    router.push({
      pathname: '/solves/create',
      params: { complaintId: complaint!.id },
    });
  };

  useFocusEffect(() => {
    refetch();
  });

  if (isError) {
    return <Redirect href="/" />;
  }

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

        {isMySolve && (
          <Menu>
            {!isResolved && (
              <MenuItem
                icon="check"
                onPress={() => setIsModalOpen(true)}
                title="Fechar e avaliar"
              />
            )}
            {!isResolved && (
              <MenuItem
                icon="edit-3"
                onPress={handleGoToEditSolve}
                title="Editar"
              />
            )}
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
