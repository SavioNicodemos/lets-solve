import { Center, Spinner } from '@gluestack-ui/themed';

type Props = {
  backgroundStyle?: 'appDefault' | 'white';
};

export default function Loading({ backgroundStyle = 'white' }: Props) {
  return (
    <Center flex={1} bg={backgroundStyle === 'white' ? 'gray.700' : 'gray.600'}>
      <Spinner color="blue.500" />
    </Center>
  );
}
