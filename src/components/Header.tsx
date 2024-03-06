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
  LeftIconComponent,
  onBackPress,
  disableBackButton = false,
  ...rest
}: Props) {
  const handleGoBack = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }

    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.push('/');
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

      <Heading fontSize="lg" color="gray.100" ml={LeftIconComponent ? 0 : -60}>
        {title}
      </Heading>

      {LeftIconComponent || <VStack />}
    </HStack>
  );
}

type Props = IStackProps & {
  title?: string;
  LeftIconComponent?: React.ReactNode;
  onBackPress?: () => void;
  disableBackButton?: boolean;
};
