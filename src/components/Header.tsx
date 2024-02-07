import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { HStack, Heading, Icon, IconButton, VStack } from 'native-base';

export function Header({ title }: Props) {
  const handleGoBack = () => {
    router.back();
  };

  return (
    <HStack justifyContent="space-between" mb="8">
      <IconButton
        icon={
          <Icon as={Feather} name="arrow-left" color="gray.100" size="lg" />
        }
        rounded="full"
        onPress={handleGoBack}
      />

      <Heading fontSize="lg" color="gray.100" ml={-5}>
        {title}
      </Heading>

      <VStack />
    </HStack>
  );
}

type Props = {
  title: string;
};
