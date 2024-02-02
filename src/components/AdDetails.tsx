import { ImageCarousel } from '@components/ImageCarousel';
import { UserPhoto } from '@components/UserPhoto';
import { ShowAdDetailsDTO } from '@dtos/ProductDTO';
import { HStack, Heading, ScrollView, Text, VStack } from 'native-base';
import StatusChip from './StatusChip';

type Props = {
  product: ShowAdDetailsDTO;
};

export function AdDetails({ product }: Props) {
  const status = {
    name: 'Não respondida',
    color: 'blue.500',
    is_positive: false,
  };

  return (
    <VStack flex={1}>
      <ImageCarousel
        images={product.product_images}
        adIsDisabled={'is_active' in product ? !product.is_active : false}
      />
      <ScrollView
        px={6}
        py={6}
        flex={1}
        showsVerticalScrollIndicator={false}
        bg="gray.600"
        mt={-5}
      >
        <HStack mb={6} mt={5}>
          <UserPhoto
            size={6}
            borderWidth={2}
            imageLink={product.user.avatar}
            mr={2}
          />

          <Text fontSize="sm">{product.user.name}</Text>
        </HStack>

        <StatusChip status={status} />

        <HStack justifyContent="space-between" mt="3">
          <Heading color="gray.100" fontSize="lg" fontFamily="heading">
            {product.name}
          </Heading>
        </HStack>

        <Text mt="2" fontSize="sm" color="gray.200">
          {product.description}
        </Text>
      </ScrollView>
    </VStack>
  );
}
