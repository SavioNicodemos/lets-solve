import { Ionicons } from '@expo/vector-icons';
import { HStack, Icon, IconButton, TextArea } from 'native-base';
import { useState } from 'react';

import { UserPhoto } from './UserPhoto';
import { useAuth } from '@/features/auth/hooks';
import { useToast } from '@/features/shared/hooks/useToast';
import { useSolve } from '@/features/solves/queries';
import useAddComment from '@/features/solves/comments/mutations';
import { useInfiniteComments } from '@/features/solves/comments/queries';

export function AddComment({ complaintId }: { complaintId: string }) {
  const [message, setMessage] = useState('');

  const { user } = useAuth();
  const toast = useToast();

  const { isPending, mutateAsync } = useAddComment(complaintId);

  const { refetch } = useInfiniteComments(complaintId);

  const { refetch: refetchComplaint } = useSolve(complaintId);

  const handleAddComment = async () => {
    const trimmedMessage = message.trim();

    if (trimmedMessage.length < 5) {
      toast.info('Comentário deve ter no mínimo 5 caracteres');
      return;
    }

    try {
      await mutateAsync(trimmedMessage);
      refetch();
      refetchComplaint();
    } catch (error) {
      toast.error('Erro ao adicionar comentário');
    } finally {
      setMessage('');
    }
  };

  return (
    <HStack style={{ gap: 4 }} alignItems="center">
      <UserPhoto imageLink={user.avatar_url} size={10} borderColor="red" />

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
