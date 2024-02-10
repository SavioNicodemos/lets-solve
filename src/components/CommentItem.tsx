import { HStack, Heading, Text, VStack } from 'native-base';
import { UserPhoto } from './UserPhoto';

export function CommentItem({ comment }: Props) {
  return (
    <HStack style={{ gap: 8 }} pb="4">
      <UserPhoto
        isExternalImage={false}
        imageLink="https://avatars.githubusercontent.com/u/22616441?v=4"
        size={12}
      />

      <VStack flex={1}>
        <HStack>
          <Heading size="sm" color="gray.100">
            Nome do usuário
          </Heading>
          <Text color="gray.400"> - 2 dias atrás</Text>
        </HStack>

        <Text
          color="gray.200"
          fontSize="sm"
          lineBreakMode="tail"
          textBreakStrategy="balanced"
          ellipsizeMode="tail"
          noOfLines={3}
          flex={1}
        >
          {comment}
        </Text>
      </VStack>
    </HStack>
  );
}

type Props = {
  comment: string;
};
