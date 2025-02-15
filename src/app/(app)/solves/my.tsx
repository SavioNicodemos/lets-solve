import { Feather } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import {
  FlatList,
  HStack,
  Heading,
  Icon,
  IconButton,
  Select,
  Text,
  VStack,
} from 'native-base';
import { useState } from 'react';

import { EmptyListText } from '@/components/EmptyListText';
import Loading from '@/components/Loading';
import { SolveCard } from '@/components/SolveCard';
import { IComplaintId, MyComplaintsStatusEnum } from '@/features/solves/types';
import { useMySolves } from '@/features/solves/queries';

export default function MySolves() {
  const [status, setStatus] = useState<MyComplaintsStatusEnum>('OPEN');

  const { data: mySolves, isLoading, refetch } = useMySolves(status);

  const handleGoToSolveDetails = (complaintId: IComplaintId) => {
    router.push({
      pathname: '/solves/',
      params: { complaintId },
    });
  };

  const handleGoToCreateSolve = () => {
    router.push('/solves/create');
  };

  const handleGoBack = () => {
    router.back();
  };

  useFocusEffect(() => {
    refetch();
  });

  return (
    <VStack bgColor="gray.600" flex={1} pt={16} px={6}>
      <HStack justifyContent="space-between" mb="8" alignItems="center">
        <IconButton
          icon={
            <Icon as={Feather} name="arrow-left" color="gray.100" size="lg" />
          }
          rounded="full"
          onPress={handleGoBack}
        />
        <Heading fontSize="lg" color="gray.100" mr={-5}>
          Meus Resolves
        </Heading>
        <IconButton
          icon={<Icon as={Feather} name="plus" color="gray.100" size="lg" />}
          rounded="full"
          onPress={handleGoToCreateSolve}
        />
      </HStack>
      <HStack alignItems="center" justifyContent="space-between" mb={5}>
        <Text color="gray.200" fontSize="sm">
          {mySolves?.length} Resolves
        </Text>
        <Select
          selectedValue={status}
          minWidth="150"
          accessibilityLabel="Choose Service"
          placeholder="Todos"
          _selectedItem={{
            _text: {
              color: 'white',
            },
            bg: 'blue.500',
            endIcon: <Feather name="check" size={20} color="white" />,
          }}
          onValueChange={itemValue =>
            setStatus(itemValue as MyComplaintsStatusEnum)
          }
        >
          <Select.Item label="Todos" value="ALL" />
          <Select.Item label="Em Aberto" value="OPEN" />
          <Select.Item label="Fechados" value="CLOSED" />
        </Select>
      </HStack>
      {isLoading ? (
        <Loading backgroundStyle="appDefault" />
      ) : (
        <FlatList
          data={mySolves}
          keyExtractor={item => item.id}
          contentContainerStyle={
            mySolves.length
              ? {
                  justifyContent: 'space-between',
                }
              : { flex: 1, justifyContent: 'center' }
          }
          renderItem={({ item }) => (
            <SolveCard
              name={item.name}
              status={item.state}
              complaintImage={item.images?.[0]?.path}
              isDisabled={!item.is_active}
              onPress={() => handleGoToSolveDetails(item.id)}
            />
          )}
          numColumns={2}
          ListEmptyComponent={
            <EmptyListText title="Não há nenhum Resolve seu criado ainda! Bora começar hoje?" />
          }
        />
      )}
    </VStack>
  );
}
