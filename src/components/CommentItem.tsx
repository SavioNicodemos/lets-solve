import { HStack, Heading, Skeleton, Text, VStack } from 'native-base';
import Animated, {
  LinearTransition,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';

import { IComment } from '@/dtos/CommentDTO';
import { formatRelativeDate } from '@/utils/helpers/dates';
import { UserPhoto } from './UserPhoto';

export function CommentItem({ comment, isLoading }: Props) {
  if (isLoading) {
    return <CommentItemSkeleton quantity={2} />;
  }

  return (
    <Animated.View
      entering={SlideInRight}
      exiting={SlideOutLeft}
      layout={LinearTransition.springify()}
    >
      <HStack style={{ gap: 8 }}>
        <UserPhoto
          borderWidth={0}
          isExternalImage={false}
          imageLink=""
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
            {comment.content}
          </Text>
        </VStack>
      </HStack>
    </Animated.View>
  );
}

function CommentItemSkeleton({ quantity = 1 }: { quantity?: number }) {
  return Array.from({ length: quantity }).map((_, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <HStack style={{ gap: 8 }} my={2} key={index}>
      <Skeleton size={12} rounded="full" startColor="blueGray.300" />
      <VStack flex={1} space="2">
        <HStack space={2}>
          <Skeleton h="3" flex="3" rounded="full" startColor="gray.500" />
          <Skeleton h="3" flex="2" rounded="full" />
        </HStack>
        <Skeleton h="3" flex="1" rounded="full" />
        <VStack>
          <Skeleton h="3" width="70%" rounded="full" />
        </VStack>
      </VStack>
    </HStack>
  ));
}

type Props =
  | {
      comment: IComment;
      isLoading?: false;
    }
  | {
      comment?: undefined;
      isLoading: true;
    };
