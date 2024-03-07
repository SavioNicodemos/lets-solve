import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  HStack,
  Heading,
  IStackProps,
  Icon,
  IconButton,
  VStack,
} from 'native-base';

export function Header({
  title = '',
  RightIconComponent,
  backButtonFallback,
  disableBackButton = false,
  ...rest
}: Props) {
  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    if (backButtonFallback) {
      backButtonFallback();
      return;
    }

    router.replace('/');
  };

  return (
    <HStack justifyContent="space-between" mb="8" alignItems="center" {...rest}>
      <IconButton
        disabled={disableBackButton}
        icon={
          <Icon
            as={Feather}
            name="arrow-left"
            color={disableBackButton ? 'gray.600' : 'gray.100'}
            size="lg"
          />
        }
        rounded="full"
        onPress={handleGoBack}
      />

      <Heading fontSize="lg" color="gray.100" ml={RightIconComponent ? 0 : -60}>
        {title}
      </Heading>

      {RightIconComponent || <VStack />}
    </HStack>
  );
}

type Props = IStackProps & {
  title?: string;
  RightIconComponent?: React.ReactNode;
  backButtonFallback?: () => void;
  disableBackButton?: boolean;
};
