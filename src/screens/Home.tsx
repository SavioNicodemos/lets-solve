import { AdCard } from '@components/AdCard';
import { Button } from '@components/Button';
import { EmptyListText } from '@components/EmptyListText';
import { FiltersModal, emptyFilters } from '@components/FiltersModal';
import { Input } from '@components/Input';
import Loading from '@components/Loading';
import { UserPhoto } from '@components/UserPhoto';
import { IFiltersDTO } from '@dtos/FiltersDTO';
import { IProductId, ProductDTO } from '@dtos/ProductDTO';
import { INavigationRoutes } from '@dtos/RoutesDTO';
import { Feather } from '@expo/vector-icons';
import { useAuth } from '@hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { api } from '@services/api';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  FlatList,
  HStack,
  Heading,
  Icon,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import { useState } from 'react';

const getAds = async (filters: IFiltersDTO): Promise<ProductDTO[]> => {
  const params = new URLSearchParams();
  if (filters?.productName) {
    params.append('query', filters.productName);
  }

  if (typeof filters?.acceptTrade === 'boolean') {
    params.append('accept_trade', filters.acceptTrade.toString());
  }

  if (typeof filters?.isNew === 'boolean') {
    params.append('is_new', filters.isNew.toString());
  }

  filters?.paymentMethods.forEach(element => {
    params.append('payment_methods', element);
  });

  const paramsString = params.toString();

  const response = await api.get(`/products?${paramsString}`);
  return response.data;
};

const getMyAds = async (): Promise<ProductDTO[]> => {
  const response = await api.get('/users/products');
  return response.data;
};

export function Home() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<IFiltersDTO>(emptyFilters);

  const navigation = useNavigation<INavigationRoutes['navigation']>();
  const { user } = useAuth();

  const { data: productList, isLoading } = useQuery({
    queryKey: ['ads', filters],
    queryFn: () => getAds(filters),
    initialData: [],
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar os Resolves',
    },
  });

  const { data: myAds } = useQuery({
    queryKey: ['myAds'],
    queryFn: () => getMyAds(),
    initialData: [],
    meta: {
      errorMessage: 'Ocorreu um erro ao buscar seus Resolves',
    },
  });

  const myActiveProductsCount = myAds
    ? myAds.filter(product => product.is_active).length
    : 0;

  const handleGoToCreateAdd = () => {
    navigation.navigate('createAd', {});
  };

  const handleGoToMyAds = () => {
    navigation.navigate('myAds');
  };

  const handleGoToAdDetails = (productId: IProductId) => {
    navigation.navigate('ad', { productId, isMyAd: false });
  };

  return (
    <>
      <VStack bgColor="gray.600" flex={1} pt={16} px={6}>
        <HStack justifyContent="space-between">
          <HStack flexShrink={1}>
            <UserPhoto size={12} mr={2} imageLink={user.avatar} />
            <VStack flexShrink={1}>
              <Text fontSize="md">Boas vindas,</Text>
              <Heading
                numberOfLines={1}
                ellipsizeMode="tail"
                fontSize="md"
                fontFamily="heading"
              >
                {user.name}
              </Heading>
            </VStack>
          </HStack>
          <Box flex={1} minW={150} maxW={150}>
            <Button
              title="Abrir um Resolve"
              icon="plus"
              onPress={handleGoToCreateAdd}
            />
          </Box>
        </HStack>

        <VStack mt="8">
          <Text color="gray.300" fontSize="sm" mb="3">
            Suas queixas realizadas
          </Text>
          <Pressable onPress={handleGoToMyAds}>
            <HStack
              bgColor="blue.50"
              px="4"
              py="3"
              alignItems="center"
              rounded="lg"
            >
              <Icon as={Feather} name="tag" color="blue.700" size="lg" />
              <Box flex={1} ml={3}>
                <Heading fontSize="lg" color="gray.200">
                  {myActiveProductsCount}
                </Heading>
                <Text color="gray.200" fontSize="xs">
                  Resolves ativos
                </Text>
              </Box>
              <Box flexDir="row" alignItems="center">
                <Heading color="blue.700" fontSize="xs">
                  Meus Resolves
                </Heading>
                <Icon
                  as={Feather}
                  name="arrow-right"
                  color="blue.700"
                  size="sm"
                />
              </Box>
            </HStack>
          </Pressable>
        </VStack>

        <VStack mt="8">
          <Text color="gray.300" fontSize="sm" mb="3">
            Resolve os seus problemas do dia a dia sem nenhum drama!
          </Text>

          <Input
            placeholder="Buscar Resolve"
            searchBar
            onFilterPress={() => setIsFiltersModalOpen(true)}
            onChangeText={value =>
              setFilters(prev => ({ ...prev, productName: value }))
            }
          />
        </VStack>

        {isLoading ? (
          <Loading backgroundStyle="appDefault" />
        ) : (
          <FlatList
            data={productList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            contentContainerStyle={
              productList?.length
                ? {
                    flexGrow: 1,
                    justifyContent: 'space-between',
                  }
                : { flex: 1, justifyContent: 'center' }
            }
            renderItem={({ item }) => (
              <AdCard
                name={item.name}
                userPhoto={item.user.avatar}
                status={{
                  name: 'Resolvido',
                  color: '#00aa00',
                  is_positive: true,
                }}
                productImage={item.product_images[0]?.path}
                onPress={() => handleGoToAdDetails(item.id)}
              />
            )}
            ListEmptyComponent={
              <EmptyListText title="Ainda não há nenhum Resolve criado! Seja o primeiro!" />
            }
            numColumns={2}
          />
        )}
      </VStack>
      <FiltersModal
        visible={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        onChangeFilters={modalFilters =>
          setFilters(prev => ({ ...prev, modalFilters }))
        }
        defaultValue={filters}
      />
    </>
  );
}
