import { Feather } from '@expo/vector-icons';
import { HStack, Heading, Icon, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native';

import { IGroupDTO } from '@/dtos/GroupDTO';

import { UserPhoto } from './UserPhoto';

export function GroupItem({ group }: Props) {
  return (
    <TouchableOpacity key={group.id}>
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
            <Text>{group.users_count} participantes</Text>
          </VStack>
        </HStack>

        <Icon as={Feather} name="chevron-right" size={8} color="gray.300" />
      </HStack>
    </TouchableOpacity>
  );
}

type Props = {
  group: IGroupDTO;
};
