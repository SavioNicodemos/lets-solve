import { Button, FormControl } from 'native-base';
import { useState } from 'react';

export function ScoreSelector({
  length = 5,
  value = 0,
  onChange,
  errorMessage,
}: Props) {
  const [score, setScore] = useState(value);

  function handleSelectScore(newScore: number) {
    setScore(newScore);
    onChange(newScore);
  }

  return (
    <FormControl isInvalid={!!errorMessage}>
      <Button.Group
        isAttached
        colorScheme="blue"
        mx={{
          base: 'auto',
          md: 0,
        }}
        size="md"
      >
        {Array.from({ length }, (_, i) => i + 1).map(i => (
          <Button
            key={i}
            variant={score === i ? undefined : 'outline'}
            onPress={() => handleSelectScore(i)}
            bgColor={score === i ? 'blue.500' : undefined}
            _text={{ color: score === i ? 'white' : 'blue.500' }}
          >
            {i}
          </Button>
        ))}
      </Button.Group>

      <FormControl.ErrorMessage
        justifyContent="center"
        alignItems="center"
        _text={{ color: 'red.500' }}
        bg="red.100"
        borderRadius="sm"
        mt={2}
        px={2}
        pb={1}
      >
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}

type Props = {
  length?: number;
  value?: number;
  onChange: (value: number) => void;
  errorMessage?: string;
};
