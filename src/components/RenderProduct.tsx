import { Center, Text } from 'native-base';

import { ProductDTO } from '@dtos/ProductDTO';
import { AdDetails } from './AdDetails';
import Loading from './Loading';

function RenderProduct({ product, isLoading }: Props) {
  if (isLoading) {
    return <Loading backgroundStyle="appDefault" />;
  }

  if (!product) {
    return (
      <Center flex={1} bg="gray.700">
        <Text>Produto não encontrado</Text>
      </Center>
    );
  }

  return <AdDetails product={product!} />;
}

type Props = {
  product?: ProductDTO;
  isLoading: boolean;
};

export default RenderProduct;
