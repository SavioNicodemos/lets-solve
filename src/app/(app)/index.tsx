import { Feather } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
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

import { AdCard } from '@/components/AdCard';
import { Button } from '@/components/Button';
import { EmptyListText } from '@/components/EmptyListText';
import { FiltersModal, emptyFilters } from '@/components/FiltersModal';
import { Input } from '@/components/Input';
import Loading from '@/components/Loading';
import { UserPhoto } from '@/components/UserPhoto';
import { IComplaintId } from '@/dtos/ComplaintDTO';
import { IFiltersDTO } from '@/dtos/FiltersDTO';
import { useAuth } from '@/hooks/useAuth';
import { getAds, getMyAds } from '@/queries/solves';

export default function Home() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<IFiltersDTO>(emptyFilters);

  const { user } = useAuth();

  const { data: complaintList, isLoading } = useQuery({
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

  const myActiveComplaintsCount = myAds
    ? myAds.filter(complaint => complaint.is_active).length
    : 0;

  const handleGoToCreateAdd = () => {
    router.push('/ad/create');
  };

  const handleGoToMyAds = () => {
    // router.push('/ad/my');
    router.push('/groups/1');
  };

  const handleGoToAdDetails = (complaintId: IComplaintId) => {
    router.push({
      pathname: '/ad/',
      params: { complaintId },
    });
  };

  const handleGoToProfile = () => {
    router.push('/profile');
  };

  return (
    <>
      <VStack bgColor="gray.600" flex={1} pt={16} px={6}>
        <HStack justifyContent="space-between">
          <HStack flexShrink={1}>
            <UserPhoto
              key={user.avatar_url}
              onPress={handleGoToProfile}
              size={12}
              mr={2}
              imageLink={user.avatar_url}
            />
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
                  {myActiveComplaintsCount}
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
              setFilters(prev => ({ ...prev, complaintName: value }))
            }
          />
        </VStack>

        {isLoading ? (
          <Loading backgroundStyle="appDefault" />
        ) : (
          <FlatList
            data={complaintList}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            keyExtractor={item => item.id}
            contentContainerStyle={
              complaintList?.length
                ? {
                    justifyContent: 'space-between',
                  }
                : { flex: 1, justifyContent: 'center' }
            }
            renderItem={({ item }) => (
              <AdCard
                name={item.name}
                userPhoto={item.user.avatar_url}
                status={item.state}
                complaintImage={item.images?.[0].path}
                onPress={() => handleGoToAdDetails(item.id)}
              />
            )}
            ListEmptyComponent={
              <EmptyListText title="Ainda não há nenhum Resolve criado! Seja o primeiro!" />
            }
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
