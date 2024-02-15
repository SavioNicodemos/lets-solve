import { Ionicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { HStack, Icon, IconButton, TextArea } from 'native-base';
import { useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { addComment } from '@/queries/mutations/solves';
import { UserPhoto } from './UserPhoto';

export function AddComment({ complaintId }: { complaintId: string }) {
  const [message, setMessage] = useState('');

  const { user } = useAuth();
  const toast = useToast();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: () => addComment({ complaintId, message: message.trim() }),
    mutationKey: ['addComment', complaintId],
  });

  const handleAddComment = async () => {
    const trimmedMessage = message.trim();

    if (trimmedMessage.length < 5) {
      toast.info('Comentário deve ter no mínimo 5 caracteres');
      return;
    }

    try {
      await mutateAsync();
    } catch (error) {
      toast.error('Erro ao adicionar comentário');
    } finally {
      setMessage('');
    }
  };

  return (
    <HStack style={{ gap: 4 }} alignItems="center">
      <UserPhoto imageLink={user.avatar} size={10} borderColor="red" />

      <TextArea
        isDisabled={isPending}
        autoCompleteType="string"
        bg="gray.700"
        p={2}
        borderWidth={0}
        fontSize="md"
        color="gray.200"
        fontFamily="body"
        placeholderTextColor="gray.400"
        placeholder="Adicione um comentário..."
        flex={1}
        minH={12}
        maxH={12}
        scrollEnabled
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500',
        }}
        _focus={{
          bg: 'gray.700',
          borderWidth: 1,
          borderColor: 'blue.500',
          minH: 24,
          maxH: 24,
        }}
        value={message}
        onChange={e => setMessage(e.nativeEvent.text)}
      />

      <IconButton
        disabled={isPending}
        rounded="full"
        icon={<Icon as={Ionicons} name="send" color="gray.100" size="lg" />}
        onPress={() => handleAddComment()}
      />
    </HStack>
  );
}