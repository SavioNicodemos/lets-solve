import { Heading, VStack, View } from 'native-base';

import { IComment } from '@/dtos/ComplaintDTO';

import { CommentItem } from './CommentItem';

export function CommentSection({ comments }: Props) {
  return (
    <View pb={4}>
      <Heading size="sm" color="gray.100" mt={5} mb={2}>
        Comentários
      </Heading>

      <VStack style={{ gap: 4 }}>
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </VStack>
    </View>
  );
}

type Props = {
  comments: IComment[];
};
