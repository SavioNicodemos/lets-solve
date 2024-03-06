/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  HStack,
  Heading,
  ScrollView,
  Text,
  VStack,
} from '@gluestack-ui/themed-native-base';

import { UserPhoto } from '@/components/UserPhoto';
import { ShowSolveDetailsDTO } from '@/dtos/ComplaintDTO';

import { CommentSection } from './CommentSection';
import { ImageCarousel } from './ImageCarousel';
import StatusChip from './StatusChip';

type Props = {
  complaint: ShowSolveDetailsDTO;
};

export function SolveDetails({ complaint }: Props) {
  const status = complaint.state;
  const isResolved = [3, 4].includes(complaint.state.id);

  return (
    <VStack flex={1}>
      <ImageCarousel
        images={complaint.images}
        isDisabled={'is_active' in complaint ? !complaint.is_active : false}
      />
      <ScrollView px={6} flex={1} bg="gray.600">
        <HStack mb={3} mt={5} justifyContent="space-between">
          <HStack>
            <UserPhoto
              size={6}
              borderWidth={2}
              borderColor={status.color}
              imageLink={complaint.user.avatar_url}
              mr="$2"
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
          <CommentSection complaintId={complaint.id} allowAdd={!isResolved} />
        )}
      </ScrollView>
    </VStack>
  );
}
