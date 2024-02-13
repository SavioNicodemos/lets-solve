import { HStack, Heading, Text, VStack } from 'native-base';

import { IComment } from '@/dtos/ComplaintDTO';

import { formatRelativeDate } from '@/utils/helpers/dates';
import { UserPhoto } from './UserPhoto';

export function CommentItem({ comment }: Props) {
  return (
    <HStack style={{ gap: 8 }}>
      <UserPhoto
        borderWidth={0}
        isExternalImage={false}
        imageLink={comment.user.avatar}
        size={12}
      />

      <VStack flex={1}>
        <HStack>
          <Heading size="sm" color="gray.100">
            {comment.user.name}
          </Heading>
          <Text color="gray.400">
            {' '}
            - {formatRelativeDate(comment.created_at)}
          </Text>
        </HStack>

        <Text
          color="gray.200"
          fontSize="sm"
          textBreakStrategy="balanced"
          flex={1}
          lineHeight={18}
        >
          {comment.comment}
        </Text>
      </VStack>
    </HStack>
  );
}

type Props = {
  comment: IComment;
};
