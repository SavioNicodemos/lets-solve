import { INavigationRoutes } from '@dtos/RoutesDTO';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { HStack, Heading, Icon, IconButton, VStack } from 'native-base';

export function Header({ title }: Props) {
  const navigation = useNavigation<INavigationRoutes['navigation']>();

  const handleGoBack = () => {
    navigation.goBack();
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
