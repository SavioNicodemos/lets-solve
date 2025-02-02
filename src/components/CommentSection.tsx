import { Heading, VStack, View } from 'native-base';

import { AddComment } from './AddComment';
import { CommentItem } from './CommentItem';
import { useInfiniteComments } from '@/features/solves/comments/queries';

export function CommentSection({ complaintId, allowAdd = false }: Props) {
  return (
    <View pb={4} style={{ gap: 16 }}>
      <Heading size="sm" color="gray.100" mt={5}>
        Comentários
      </Heading>

      {allowAdd && <AddComment complaintId={complaintId} />}

      <VStack style={{ gap: 4 }}>
        <RenderComments complaintId={complaintId} />
      </VStack>
    </View>
  );
}

function RenderComments({ complaintId }: { complaintId: string }) {
  const {
    data: commentsReturned,
    isSuccess,
    isLoading,
  } = useInfiniteComments(complaintId);

  if (isLoading) {
    return <CommentItem isLoading />;
  }

  if (!isSuccess) {
    return (
      <Heading size="sm" color="gray.100" pt={4} textAlign="center">
        Erro ao carregar comentários
      </Heading>
    );
  }

  const comments = commentsReturned?.pages.flatMap(page => page.data) || [];

  if (!comments.length) {
    return (
      <Heading size="sm" color="gray.100" pt={4} textAlign="center">
        Nenhuma atualização para esse Resolve
      </Heading>
    );
  }

  return comments.map(comment => (
    <CommentItem key={comment.id} comment={comment} />
  ));
}

type Props = {
  complaintId: string;
  allowAdd?: boolean;
};
