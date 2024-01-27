import { ImageCarousel } from '@components/ImageCarousel';
import { UserPhoto } from '@components/UserPhoto';
import { ShowAdDetailsDTO } from '@dtos/ProductDTO';
import { Box, HStack, Heading, ScrollView, Text, VStack } from 'native-base';

type Props = {
  product: ShowAdDetailsDTO;
};

export function AdDetails({ product }: Props) {
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
        <HStack>
          <Box py={0.5} px={2} rounded="full" bg="gray.500">
            <Text fontSize="10" fontFamily="heading">
              USADO
            </Text>
          </Box>
        </HStack>

        <HStack justifyContent="space-between" mt="3">
          <Heading color="gray.100" fontSize="lg" fontFamily="heading">
            {product.name}
          </Heading>
          <Box flexDir="row" alignItems="baseline">
            <Heading color="blue.500" fontSize="sm" mr="1" fontFamily="heading">
              R$
            </Heading>
            <Heading color="blue.500" fontSize="lg" fontFamily="heading">
              13,00
            </Heading>
          </Box>
        </HStack>

        <Text mt="2" fontSize="sm" color="gray.200">
          {product.description}
        </Text>

        <HStack mt={4}>
          <Text mr="2" fontFamily="heading" color="gray.200">
            Aceita troca?
          </Text>
          <Text>Sim</Text>
        </HStack>

      </ScrollView>
    </VStack>
  );
}
