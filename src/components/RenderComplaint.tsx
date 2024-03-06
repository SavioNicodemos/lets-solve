import { Center, Text } from '@gluestack-ui/themed-native-base';

import { ComplaintDTO } from '@/dtos/ComplaintDTO';
import Loading from './Loading';
import { SolveDetails } from './SolveDetails';

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

  return <SolveDetails complaint={complaint!} />;
}

type Props = {
  complaint?: ComplaintDTO;
  isLoading: boolean;
};

export default RenderComplaint;
