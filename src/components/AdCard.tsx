import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base';

import defaultComplaintImage from '@/assets/noComplaint.png';
import { ComplaintStatusDTO } from '@/dtos/ComplaintStatusDTO';

import StatusChip from './StatusChip';
import { UserPhoto } from './UserPhoto';

type Props = {
  userPhoto?: string;
  complaintImage: string;
  name: string;
  adIsDisabled?: boolean;
  status: Omit<ComplaintStatusDTO, 'id'>;
  onPress: () => void;
};

export function AdCard({
  name,
  complaintImage,
  userPhoto,
  adIsDisabled,
  status,
  onPress,
}: Props) {
  return (
    <Pressable
      width="48%"
      height="40"
      mx={1}
      mb={6}
      _pressed={{ opacity: 0.7 }}
      onPress={onPress}
    >
      <VStack flex={1}>
        <Image
          source={
            complaintImage ? { uri: complaintImage } : defaultComplaintImage
          }
          fallbackSource={defaultComplaintImage}
          rounded="md"
          alt="Foto do da queixa"
          resizeMode="cover"
          position="absolute"
          width="full"
          h="135"
        />

        <HStack alignItems="center" justifyContent="space-between" p={2}>
          {!!userPhoto && (
            <UserPhoto
              imageLink={userPhoto}
              size={7}
              borderWidth={2}
              borderColor={status.color}
            />
          )}

          <StatusChip status={status} />
        </HStack>

        {adIsDisabled && (
          <Box
            bg="#1A181B3D"
            w="full"
            h="full"
            position="absolute"
            justifyContent="center"
            alignItems="center"
          >
            <Text color="white" fontSize="xs" fontWeight="bold">
              {'Resolve desativado'.toUpperCase()}
            </Text>
          </Box>
        )}
      </VStack>

      <Text
        color={adIsDisabled ? 'gray.600' : 'gray.200'}
        fontSize="sm"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
    </Pressable>
  );
}
