import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
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
import { useCallback, useState } from 'react';

import { AdCard } from '@components/AdCard';
import { EmptyListText } from '@components/EmptyListText';
import Loading from '@components/Loading';
import { IProductId, ProductDTO } from '@dtos/ProductDTO';
import { INavigationRoutes } from '@dtos/RoutesDTO';
import { api } from '@services/api';

const getMyAds = async (): Promise<ProductDTO[]> => {
  const response = await api.get('/users/products');
  return response.data;
};

export function MyAds() {
  const [status, setStatus] = useState('');

  const navigation = useNavigation<INavigationRoutes['navigation']>();

  const {
    data: myAds,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['myAds'],
    queryFn: () => getMyAds(),
    initialData: [],
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar seus Resolves',
    },
  });

  const handleGoToAdDetails = (productId: IProductId) => {
    navigation.navigate('ad', { productId, isMyAd: true });
  };

  const handleGoToCreateAd = () => {
    navigation.navigate('createAd', {});
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <VStack bgColor="gray.600" flex={1} pt={16} px={6}>
      <HStack justifyContent="space-between" mb="8">
        <VStack />
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
                isNew
                price={1300}
                productImage={item.product_images[0]?.path}
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
