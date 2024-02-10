import { Heading, View } from 'native-base';
import { CommentItem } from './CommentItem';

export function CommentSection({ comments }: Props) {
  return (
    <View>
      <Heading size="sm" color="gray.100" mt={5} mb={2}>
        Comentários
      </Heading>

      {comments.map(comment => (
        <CommentItem key={comment} comment={comment} />
      ))}
    </View>
  );
}

type Props = {
  comments: string[];
};
