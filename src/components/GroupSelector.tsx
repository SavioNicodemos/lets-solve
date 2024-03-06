import { Feather } from '@expo/vector-icons';
import { Pressable } from '@gluestack-ui/themed';
import { Heading, Icon, Modal, VStack } from '@gluestack-ui/themed-native-base';
import { useState } from 'react';

import { IGroupDTO } from '@/dtos/GroupDTO';
import { useGroups } from '@/hooks/useGroups';
import { useSelectedGroup } from '@/hooks/useSelectedGroup';
import { GroupItem, SkeletonGroupItem } from './GroupItem';
import { UserPhoto } from './UserPhoto';

function GroupSelector() {
  const [visible, setVisible] = useState(false);
  const { query } = useSelectedGroup();

  const { data } = query;

  const closeModal = () => {
    setVisible(false);
  };

  const openModal = () => {
    setVisible(true);
  };

  return (
    <>
      <Pressable
        onPress={openModal}
        bgColor="gray.700"
        rounded="$full"
        p={1}
        alignItems="center"
        flexDir="row"
        style={{ gap: 8 }}
        softShadow="1"
        sx={{
          ':pressed': {
            opacity: 0.8,
            bg: 'gray.600',
          },
        }}
      >
        <UserPhoto
          imageLink={data?.image_url ?? ''}
          size={8}
          borderWidth={0}
          onPress={closeModal}
        />
        <Heading size="sm" textAlign="center" flex={1} numberOfLines={1}>
          {data?.name ?? 'Selecione um grupo'}
        </Heading>
        <Icon as={<Feather name="chevron-down" />} size="sm" mr={2} />
      </Pressable>
      <GroupsModal visible={visible} onClose={closeModal} />
    </>
  );
}

type GroupsModalProps = {
  visible: boolean;
  onClose: () => void;
};
function GroupsModal({ visible, onClose }: GroupsModalProps) {
  return (
    <Modal isOpen={visible} onClose={onClose} justifyContent="flex-end">
      <VStack
        width="full"
        bg="gray.600"
        py="8"
        px="6"
        borderTopLeftRadius="3xl"
        borderTopRightRadius="3xl"
        space="5"
      >
        <Heading fontSize="md">Selecione o grupo para ver os Resolves</Heading>
        <RenderGroups handleClose={onClose} />
      </VStack>
    </Modal>
  );
}

function RenderGroups({ handleClose }: { handleClose: () => void }) {
  const { data, isSuccess, isLoading } = useGroups();
  const { mutation } = useSelectedGroup();

  const { mutate } = mutation;

  const handleSelectGroup = (group: IGroupDTO) => {
    mutate(group);
    handleClose();
  };

  if (isLoading) {
    return (
      <VStack space={1}>
        <SkeletonGroupItem />
        <SkeletonGroupItem />
        <SkeletonGroupItem />
      </VStack>
    );
  }

  if (!isSuccess) {
    return null;
  }

  return (
    <VStack space={1}>
      {data.map(group => (
        <GroupItem
          key={group.id}
          group={group}
          onPress={() => handleSelectGroup(group)}
          hideIcon
        />
      ))}
    </VStack>
  );
}

export default GroupSelector;
