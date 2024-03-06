import { Feather } from '@expo/vector-icons';
import {
  HStack,
  Heading,
  IStackProps,
  Icon,
  IconButton,
  VStack,
} from '@gluestack-ui/themed-native-base';
import { router } from 'expo-router';

export function Header({ title = '', LeftIconComponent, ...rest }: Props) {
  const handleGoBack = () => {
    router.back();
  };

  return (
    <HStack justifyContent="space-between" mb="8" alignItems="center" {...rest}>
      <IconButton
        icon={
          <Icon as={<Feather name="arrow-left" />} color="gray.100" size="lg" />
        }
        rounded="full"
        onPress={handleGoBack}
      />

      <Heading fontSize="lg" color="gray.100" ml={LeftIconComponent ? 0 : -5}>
        {title}
      </Heading>

      {LeftIconComponent || <VStack />}
    </HStack>
  );
}

type Props = IStackProps & {
  title?: string;
  LeftIconComponent?: React.ReactNode;
};
