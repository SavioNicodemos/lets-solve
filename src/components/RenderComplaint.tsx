import { Center, Text } from 'native-base';

import { ComplaintDTO } from '@dtos/ComplaintDTO';
import { AdDetails } from './AdDetails';
import Loading from './Loading';

function RenderComplaint({ complaint, isLoading }: Props) {
  if (isLoading) {
    return <Loading backgroundStyle="appDefault" />;
  }

  if (!complaint) {
    return (
      <Center flex={1} bg="gray.700">
        <Text>Produto não encontrado</Text>
      </Center>
    );
  }

  return <AdDetails complaint={complaint!} />;
}

type Props = {
  complaint?: ComplaintDTO;
  isLoading: boolean;
};

export default RenderComplaint;
