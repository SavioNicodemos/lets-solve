import { Entypo, Feather } from '@expo/vector-icons';
import {
  Icon,
  ButtonIcon as IconButton,
  Menu as MenuNBase,
  Text,
} from '@gluestack-ui/themed';
import React from 'react';

export function Menu({ children }: { children: React.ReactNode }) {
  return (
    <MenuNBase
      w="$96"
      // eslint-disable-next-line react/no-unstable-nested-components
      trigger={triggerProps => {
        return (
          <IconButton
            rounded="full"
            accessibilityLabel="More options menu"
            {...triggerProps}
          >
            <Icon
              as={<Entypo name="dots-three-vertical" size={25} />}
              color="gray.100"
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
    <MenuNBase.Item disabled={isDisabled} onPress={onPress}>
      <>
        <Icon as={<Feather name={icon} size={5} />} color="black" mr={2} />
        <Text>{title}</Text>
      </>
    </MenuNBase.Item>
  );
}
