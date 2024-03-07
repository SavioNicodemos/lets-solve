import { router } from 'expo-router';
import { Button, Center, Heading, VStack } from 'native-base';
import { Alert } from 'react-native';

import { AvatarUpload } from '@/components/AvatarUpload';
import { Header } from '@/components/Header';
import { SettingsItem } from '@/components/SettingsItem';
import { useAuth } from '@/hooks/useAuth';
import { useGroups } from '@/hooks/useGroups';

export default function Profile() {
  const { user, updateUserAvatar, signOut } = useAuth();
  const { data: groups } = useGroups();

  const handleSignOut = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: () => signOut(),
      },
    ]);
  };

  return (
    <VStack bgColor="gray.600" flex={1} pt={12}>
      <Header
        title="Editar Perfil"
        px={6}
        disableBackButton={groups.length === 0}
        backButtonFallback={() => router.replace('/')}
      />

      <Center>
        <AvatarUpload
          size={40}
          onChange={image => updateUserAvatar(image)}
          value={{ isExternal: !!user.avatar_url, path: user.avatar_url || '' }}
        />

        <Heading fontSize="lg" color="gray.100">
          {user.name}
        </Heading>

        <Heading fontSize="md" color="gray.200">
          {user.email}
        </Heading>

        <Heading fontSize="md" color="gray.200">
          {user.tel}
        </Heading>

        <VStack mt={6}>
          <SettingsItem
            title="Grupos"
            onPress={() => router.push('/groups/')}
          />
        </VStack>

        <Button size="lg" variant="link" mt={8} onPress={handleSignOut}>
          Sair
        </Button>
      </Center>
    </VStack>
  );
}
