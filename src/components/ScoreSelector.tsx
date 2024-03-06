import {
  Button,
  ButtonGroup,
  FormControl,
  FormControlErrorText,
} from '@gluestack-ui/themed';
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
      <ButtonGroup isAttached mx={0}>
        {Array.from({ length }, (_, i) => i + 1).map(i => (
          <Button
            key={i}
            onPress={() => handleSelectScore(i)}
            bgColor={score === i ? 'blue.500' : undefined}
            sx={{
              _text: { color: score === i ? 'white' : 'blue.500' },
            }}
          >
            {i}
          </Button>
        ))}
      </ButtonGroup>

      <FormControlErrorText
        justifyContent="center"
        alignItems="center"
        sx={{
          _text: { color: 'red.500' },
        }}
        bg="red.100"
        borderRadius="$sm"
        mt={2}
        px={2}
        pb={1}
      >
        {errorMessage}
      </FormControlErrorText>
    </FormControl>
  );
}

type Props = {
  length?: number;
  value?: number;
  onChange: (value: number) => void;
  errorMessage?: string;
};
