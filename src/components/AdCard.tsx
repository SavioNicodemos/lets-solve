import defaultProductImage from '@assets/noProduct.png';
import { ComplaintStatusDTO } from '@dtos/ComplaintStatusDTO';
import { api } from '@services/api';
import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base';
import { UserPhoto } from './UserPhoto';

type Props = {
  userPhoto?: string;
  productImage: string;
  name: string;
  adIsDisabled?: boolean;
  status: Omit<ComplaintStatusDTO, 'id'>;
  onPress: () => void;
};

export function AdCard({
  name,
  productImage,
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
            productImage
              ? {
                  uri: `${api.defaults.baseURL}/images/${productImage}`,
                }
              : defaultProductImage
          }
          fallbackSource={defaultProductImage}
          rounded="md"
          alt="Foto do da queixa"
          resizeMode="cover"
          position="absolute"
          width="full"
          h="135"
        />

        <HStack alignItems="center" justifyContent="space-between" p={2}>
          {userPhoto ? (
            <UserPhoto
              position="absolute"
              left="2"
              top="2"
              size={7}
              borderWidth={2}
              borderColor="white"
              imageLink={userPhoto}
            />
          ) : null}
          <Text
            px="2"
            py="0.5"
            fontSize="10"
            fontWeight="bold"
            rounded="full"
            bg={status?.color}
            color="white"
            top={2}
            right={2}
            position="absolute"
          >
            {status?.name.toUpperCase()}
          </Text>
        </HStack>

        {adIsDisabled ? (
          <Box bg="#1A181B3D" flex="1" mt={-4} p={2} justifyContent="flex-end">
            <Text color="white" fontSize="xs" fontWeight="bold">
              {'Resolve desativado'.toUpperCase()}
            </Text>
          </Box>
        ) : null}
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
