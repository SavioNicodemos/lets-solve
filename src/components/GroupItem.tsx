import { Feather } from '@expo/vector-icons';
import {
  HStack,
  Heading,
  Icon,
  Skeleton,
  Text,
  VStack,
} from '@gluestack-ui/themed-native-base';
import { TouchableOpacity } from 'react-native';

import { IGroupDTO } from '@/dtos/GroupDTO';

import { UserPhoto } from './UserPhoto';

export function GroupItem({ group, onPress, hideIcon = false }: Props) {
  return (
    <TouchableOpacity key={group.id} onPress={onPress}>
      <HStack
        width="full"
        space={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <HStack space={4} alignItems="center">
          <UserPhoto size={12} imageLink={group.image_url} />

          <VStack>
            <Heading fontFamily="heading" fontSize="md">
              {group.name}
            </Heading>
            <Text>{group.participants_count} participantes</Text>
          </VStack>
        </HStack>

        {!hideIcon && (
          <Icon
            as={<Feather name="chevron-right" />}
            size="md"
            color="gray.300"
          />
        )}
      </HStack>
    </TouchableOpacity>
  );
}

export function SkeletonGroupItem() {
  return (
    <HStack
      width="full"
      space={4}
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack space={4} alignItems="center">
        <Skeleton width={12} height={12} borderRadius={12} rounded="full" />

        <VStack space={1}>
          <Skeleton width={150} height={4} rounded="lg" />
          <Skeleton width={100} height={3} rounded="full" />
        </VStack>
      </HStack>
    </HStack>
  );
}

type Props = {
  group: IGroupDTO;
  onPress: () => void;
  hideIcon?: boolean;
};
