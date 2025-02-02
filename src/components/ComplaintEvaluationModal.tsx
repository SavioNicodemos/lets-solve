import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, Text } from 'native-base';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { ScoreSelector } from './ScoreSelector';
import { ISubmitEvaluation } from '@/features/solves/types';

const ICreateEvaluation = z.object({
  isSolved: z.boolean(),
  score: z.number().min(1, 'A nota mínima é 1').max(5, 'A nota máxima é 5'),
});

export function ComplaintEvaluationModal({
  isOpen,
  onSuccessPress,
  onCancelPress,
}: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubmitEvaluation>({
    resolver: zodResolver(ICreateEvaluation),
    defaultValues: {
      isSolved: true,
      score: 0,
    },
  });

  return (
    <Modal isOpen={isOpen} avoidKeyboard>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Como foi a conclusão do Resolve?</Modal.Header>
        <Modal.Body style={{ gap: 8 }}>
          <Text>Foi resolvido?</Text>
          <Controller
            control={control}
            name="isSolved"
            render={({ field: { value, onChange } }) => (
              <RenderYesNo onChange={onChange} value={value} />
            )}
          />

          <Text>Qual a sua nota?</Text>
          <Controller
            control={control}
            name="score"
            render={({ field: { value, onChange } }) => (
              <ScoreSelector
                onChange={onChange}
                value={value}
                errorMessage={errors.score?.message}
              />
            )}
          />
        </Modal.Body>
        <Modal.Footer style={{ gap: 8 }}>
          <Button flex="1" bgColor="red.500" onPress={() => onCancelPress()}>
            Cancelar
          </Button>
          <Button
            flex="1"
            bgColor="blue.500"
            onPress={handleSubmit(onSuccessPress)}
          >
            Enviar
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

function RenderYesNo({ value, onChange }: YesNoProps) {
  return (
    <Button.Group
      isAttached
      size="md"
      colorScheme="blue"
      justifyContent="center"
    >
      <Button
        variant={value ? undefined : 'outline'}
        bgColor={value ? 'blue.500' : undefined}
        _text={{ color: value ? 'white' : 'blue.500' }}
        onPress={() => onChange(true)}
      >
        Sim
      </Button>
      <Button
        variant={!value ? undefined : 'outline'}
        bgColor={!value ? 'blue.500' : undefined}
        _text={{ color: !value ? 'white' : 'blue.500' }}
        onPress={() => onChange(false)}
      >
        Não
      </Button>
    </Button.Group>
  );
}

type Props = {
  isOpen: boolean;
  onSuccessPress: (form: ISubmitEvaluation) => void;
  onCancelPress: () => void;
};

type YesNoProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};
