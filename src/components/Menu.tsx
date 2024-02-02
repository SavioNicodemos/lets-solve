import { Entypo, Feather } from '@expo/vector-icons';
import { Icon, IconButton, Menu as MenuNBase, Text } from 'native-base';
import React from 'react';

export function Menu({ children }: { children: React.ReactNode }) {
  return (
    <MenuNBase
      w="190"
      // eslint-disable-next-line react/no-unstable-nested-components
      trigger={triggerProps => {
        return (
          <IconButton
            rounded="full"
            accessibilityLabel="More options menu"
            {...triggerProps}
          >
            <Icon
              as={Entypo}
              name="dots-three-vertical"
              color="gray.100"
              size="lg"
            />
          </IconButton>
        );
      }}
    >
      {children}
    </MenuNBase>
  );
}

type MenuItemProps = {
  onPress: () => void;
  icon: keyof typeof Feather.glyphMap;
  title: string;
  isDisabled?: boolean;
};

export function MenuItem({
  onPress,
  icon,
  title,
  isDisabled = false,
}: MenuItemProps) {
  return (
    <MenuNBase.Item isDisabled={isDisabled} onPress={onPress}>
      <>
        <Icon as={Feather} name={icon} color="black" size={5} mr={2} />
        <Text>{title}</Text>
      </>
    </MenuNBase.Item>
  );
}
