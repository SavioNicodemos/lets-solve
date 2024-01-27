import defaultProductImage from '@assets/noProduct.png';
import { api } from '@services/api';
import { Box, HStack, Image, Pressable, Text, VStack } from 'native-base';
import { UserPhoto } from './UserPhoto';

type Props = {
  userPhoto?: string;
  isNew: boolean;
  productImage: string;
  name: string;
  price: number;
  adIsDisabled?: boolean;
  onPress: () => void;
};

export function AdCard({
  isNew,
  name,
  price,
  productImage,
  userPhoto,
  adIsDisabled,
  onPress,
}: Props) {
  const formattedPrice = (price / 100).toFixed(2);

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
          rounded="md"
          alt="Foto do da queixa"
          resizeMode="cover"
          position="absolute"
          width="full"
          h="115"
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
            bg={isNew ? 'blue.700' : 'gray.200'}
            color="white"
            top={2}
            right={2}
            position="absolute"
          >
            {isNew ? 'NOVO' : 'USADO'}
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
        color={adIsDisabled ? 'gray.400' : 'gray.200'}
        fontSize="sm"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
      <Text
        color={adIsDisabled ? 'gray.400' : 'gray.100'}
        fontWeight="bold"
        fontSize="md"
      >
        R$ {formattedPrice}
      </Text>
    </Pressable>
  );
}
