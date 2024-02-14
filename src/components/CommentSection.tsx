import { Heading, VStack, View } from 'native-base';

import { IComment } from '@/dtos/ComplaintDTO';

import { AddComment } from './AddComment';
import { CommentItem } from './CommentItem';

export function CommentSection({
  comments,
  complaintId,
  allowAdd = false,
}: Props) {
  return (
    <View pb={4} style={{ gap: 16 }}>
      <Heading size="sm" color="gray.100" mt={5}>
        Comentários
      </Heading>

      {allowAdd && <AddComment complaintId={complaintId} />}

      <VStack style={{ gap: 4 }}>
        <RenderComments comments={comments} />
      </VStack>
    </View>
  );
}

function RenderComments({ comments }: { comments: IComment[] }) {
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
  comments: IComment[];
  complaintId: string;
  allowAdd?: boolean;
};
