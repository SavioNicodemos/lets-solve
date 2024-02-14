/* eslint-disable @typescript-eslint/no-use-before-define */
import { HStack, Heading, ScrollView, Text, VStack } from 'native-base';

import { UserPhoto } from '@/components/UserPhoto';
import { IComment, ShowAdDetailsDTO } from '@/dtos/ComplaintDTO';

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

        {complaint?.id && (
          <CommentSection
            comments={comments}
            complaintId={complaint.id}
            allowAdd
          />
        )}
      </ScrollView>
    </VStack>
  );
}

const comments: IComment[] = [
  {
    id: '1',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    user: {
      avatar: 'https://avatars.githubusercontent.com/u/22616441?v=4',
      name: 'Nicodemos Santos',
      tel: '123456789',
    },
    created_at: new Date('2024-02-10'),
  },
  {
    id: '2',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    user: {
      avatar: 'https://avatars.githubusercontent.com/u/22616441?v=4',
      name: 'Savio Costa',
      tel: '123456789',
    },
    created_at: new Date('2024-02-12T11:24:42.000Z'),
  },
  {
    id: '3',
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    user: {
      avatar: 'https://avatars.githubusercontent.com/u/22616441?v=4',
      name: 'Nico Gomez',
      tel: '123456789',
    },
    created_at: new Date('2024-02-13T01:14:42.000Z'),
  },
  {
    id: '4',
    comment: 'Lorem.',
    user: {
      avatar: 'https://avatars.githubusercontent.com/u/22616441?v=4',
      name: 'Nico Gomez',
      tel: '123456789',
    },
    created_at: new Date('2024-01-13T14:14:42.000Z'),
  },
];
