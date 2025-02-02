import { Center, Text } from 'native-base';

import Loading from './Loading';
import { SolveDetails } from './SolveDetails';
import { ComplaintDTO } from '@/features/solves/types';

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
