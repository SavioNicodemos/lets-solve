import { ImageCarousel } from '@components/ImageCarousel';
import { UserPhoto } from '@components/UserPhoto';
import { ShowAdDetailsDTO } from '@dtos/ComplaintDTO';
import { HStack, Heading, ScrollView, Text, VStack } from 'native-base';
import StatusChip from './StatusChip';

type Props = {
  complaint: ShowAdDetailsDTO;
};

export function AdDetails({ complaint }: Props) {
  const status = {
    name: 'Não respondida',
    color: 'purple.500',
    is_positive: false,
  };

  return (
    <VStack flex={1}>
      <ImageCarousel
        images={complaint.complaint_images}
        adIsDisabled={'is_active' in complaint ? !complaint.is_active : false}
      />
      <ScrollView
        px={6}
        py={6}
        flex={1}
        showsVerticalScrollIndicator={false}
        bg="gray.600"
        mt={-5}
      >
        <HStack mb={3} mt={5} justifyContent="space-between">
          <HStack>
            <UserPhoto
              size={6}
              borderWidth={2}
              borderColor={status.color}
              imageLink={complaint.user.avatar}
              mr={2}
            />

            <Text fontSize="sm">{complaint.user.name}</Text>
          </HStack>

          <StatusChip status={status} />
        </HStack>

        <HStack justifyContent="space-between">
          <Heading color="gray.100" fontSize="lg" fontFamily="heading">
            {complaint.name}
          </Heading>
        </HStack>

        <Text mt="2" fontSize="sm" color="gray.200">
          {complaint.description}
        </Text>
      </ScrollView>
    </VStack>
  );
}
