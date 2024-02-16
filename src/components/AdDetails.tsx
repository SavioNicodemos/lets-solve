/* eslint-disable @typescript-eslint/no-use-before-define */
import { HStack, Heading, ScrollView, Text, VStack } from 'native-base';

import { UserPhoto } from '@/components/UserPhoto';
import { ShowAdDetailsDTO } from '@/dtos/ComplaintDTO';

import { CommentSection } from './CommentSection';
import { ImageCarousel } from './ImageCarousel';
import StatusChip from './StatusChip';

type Props = {
  complaint: ShowAdDetailsDTO;
};

export function AdDetails({ complaint }: Props) {
  const status = complaint.state;

  return (
    <VStack flex={1}>
      <ImageCarousel
        images={complaint.complaint_images}
        adIsDisabled={'is_active' in complaint ? !complaint.is_active : false}
      />
      <ScrollView px={6} flex={1} bg="gray.600">
        <HStack mb={3} mt={5} justifyContent="space-between">
          <HStack>
            <UserPhoto
              size={6}
              borderWidth={2}
              borderColor={status.color}
              imageLink={complaint.user.avatar_url}
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

        {complaint?.id && (
          <CommentSection complaintId={complaint.id} allowAdd />
        )}
      </ScrollView>
    </VStack>
  );
}
