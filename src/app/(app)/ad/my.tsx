import { Feather } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
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

import { AdCard } from '@/components/AdCard';
import { EmptyListText } from '@/components/EmptyListText';
import Loading from '@/components/Loading';
import { ComplaintDTO, IComplaintId } from '@/dtos/ComplaintDTO';
import { api } from '@/services/api';

const getMyAds = async (): Promise<ComplaintDTO[]> => {
  const response = await api.get('/users/complaints');
  return response.data;
};

export default function MyAds() {
  const [status, setStatus] = useState('');

  const { data: myAds, isLoading } = useQuery({
    queryKey: ['myAds'],
    queryFn: () => getMyAds(),
    initialData: [],
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar seus Resolves',
    },
  });

  const handleGoToAdDetails = (complaintId: IComplaintId) => {
    router.push({
      pathname: '/ad/',
      params: { complaintId, isMyAd: 1 },
    });
  };

  const handleGoToCreateAd = () => {
    router.push({
      pathname: '/ad/create',
      params: { complaint: '' },
    });
  };

  const handleGoBack = () => {
    router.back();
  };

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
          onPress={handleGoToCreateAd}
        />
      </HStack>
      {isLoading ? (
        <Loading backgroundStyle="appDefault" />
      ) : (
        <>
          <HStack alignItems="center" justifyContent="space-between" mb={5}>
            <Text color="gray.200" fontSize="sm">
              {myAds?.length} Resolves
            </Text>
            <Select
              selectedValue={status}
              minWidth="100"
              accessibilityLabel="Choose Service"
              placeholder="Todos"
              _selectedItem={{
                _text: {
                  color: 'white',
                },
                bg: 'blue.500',
                endIcon: <Feather name="check" size={20} color="white" />,
              }}
              onValueChange={itemValue => setStatus(itemValue)}
            >
              <Select.Item label="Todos" value="all" />
              <Select.Item label="Ativos" value="active" />
              <Select.Item label="Inativos" value="disabled" />
            </Select>
          </HStack>
          <FlatList
            data={myAds}
            keyExtractor={item => item.id}
            contentContainerStyle={
              myAds.length
                ? {
                    justifyContent: 'space-between',
                  }
                : { flex: 1, justifyContent: 'center' }
            }
            renderItem={({ item }) => (
              <AdCard
                name={item.name}
                status={item.state}
                complaintImage={item.complaint_images[0]?.path}
                adIsDisabled={!item.is_active}
                onPress={() => handleGoToAdDetails(item.id)}
              />
            )}
            numColumns={2}
            ListEmptyComponent={
              <EmptyListText title="Não há nenhum Resolve seu criado ainda! Vamos anunciar hoje?" />
            }
          />
        </>
      )}
    </VStack>
  );
}
