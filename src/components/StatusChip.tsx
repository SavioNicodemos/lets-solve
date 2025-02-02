import { FontAwesome6 } from '@expo/vector-icons';
import { Box, HStack, Icon, Text } from 'native-base';
import { ComplaintStatusDTO } from '@/features/solves/types';

type Props = {
  status: Omit<ComplaintStatusDTO, 'id'>;
};

export function StatusChip({ status }: Props) {
  return (
    <HStack>
      <Box
        py={1}
        px={2}
        rounded="full"
        bg={status.color}
        flexDir="row"
        alignItems="center"
        style={{ gap: 4 }}
      >
        <Icon
          key={String(status.is_positive)}
          as={FontAwesome6}
          name={status.is_positive ? 'face-laugh-wink' : 'angry'}
          color="white"
          size="md"
        />
        <Text fontSize="10" fontFamily="heading" color="white">
          {status.name.toUpperCase()}
        </Text>
      </Box>
    </HStack>
  );
}

export default StatusChip;
