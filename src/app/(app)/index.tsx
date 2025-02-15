import { Feather } from '@expo/vector-icons';
import { Redirect, router } from 'expo-router';
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

import { EmptyListText } from '@/components/EmptyListText';
import { FiltersModal, emptyFilters } from '@/components/FiltersModal';
import GroupSelector from '@/components/GroupSelector';
import { Input } from '@/components/Input';
import Loading from '@/components/Loading';
import { SolveCard } from '@/components/SolveCard';
import { UserPhoto } from '@/components/UserPhoto';
import { IFiltersDTO } from '@/features/shared/dtos/FiltersDTO';
import { useGroups } from '@/features/groups/queries';
import { useAuth } from '@/features/auth/hooks';
import { useMySolves, useSolves } from '@/features/solves/queries';
import { IComplaintId } from '@/features/solves/types';

export default function Home() {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [filters, setFilters] = useState<IFiltersDTO>(emptyFilters);
  const { data: groups } = useGroups();

  const { user } = useAuth();

  const { data: complaintList, isLoading } = useSolves(filters);

  const { data: mySolves } = useMySolves('OPEN');

  const myActiveComplaintsCount = mySolves.length;

  const handleGoToCreateAdd = () => {
    router.push('/solves/create');
  };

  const handleGoToMySolves = () => {
    router.push('/solves/my');
  };

  const handleGoToSolveDetails = (complaintId: IComplaintId) => {
    router.push({
      pathname: '/solves/',
      params: { complaintId },
    });
  };

  const handleGoToProfile = () => {
    router.push('/profile');
  };

  if (groups.length === 0) {
    return <Redirect href="/groups/" />;
  }

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
          <Box flex={1} justifyContent="center" minW={150} maxW={150}>
            <Pressable
              flexDir="row"
              alignItems="center"
              onPress={handleGoToCreateAdd}
              variant="unstyled"
              style={{ gap: 4 }}
            >
              <Icon as={Feather} name="plus" size={6} color="blue.500" />
              <Text fontSize="16" fontWeight="bold" color="blue.500">
                Abrir um Resolve
              </Text>
            </Pressable>
          </Box>
        </HStack>
        <Box mt={4}>
          <GroupSelector />
        </Box>

        <VStack mt="4">
          <Text color="gray.300" fontSize="sm" mb="3">
            Suas queixas realizadas
          </Text>
          <Pressable onPress={handleGoToMySolves}>
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
                  Resolves em aberto
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

        <VStack mt="4">
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
              <SolveCard
                name={item.name}
                userPhoto={item.user.avatar_url}
                status={item.state}
                complaintImage={item.image?.path || ''}
                onPress={() => handleGoToSolveDetails(item.id)}
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
