import { Feather } from '@expo/vector-icons';
import {
  Checkbox,
  HStack,
  Heading,
  Icon,
  IconButton,
  Modal,
  Text,
  VStack,
} from 'native-base';
import { useState } from 'react';

import { Button } from '@/components/Button';
import { IFiltersDTO } from '@/dtos/FiltersDTO';

type Props = {
  visible: boolean;
  onClose?: () => void;
  onChangeFilters?: (filters: IFiltersDTO) => void;
  defaultValue: IFiltersDTO;
};

export const emptyFilters: IFiltersDTO = {
  complaintName: null,
};
export function FiltersModal({
  visible,
  onClose = () => {},
  onChangeFilters = () => {},
  defaultValue,
}: Props) {
  const [filters, setFilters] = useState<IFiltersDTO>(defaultValue);

  const IS_IMPLEMENTED = false;

  const handleResetFilters = () => {
    setFilters(emptyFilters);
    onChangeFilters(emptyFilters);
    onClose();
  };

  const handleApplyFilters = () => {
    onChangeFilters(filters);
    onClose();
  };

  return (
    <Modal
      isOpen={visible}
      onClose={onClose}
      animationPreset="slide"
      justifyContent="flex-end"
    >
      <VStack
        width="full"
        bg="gray.600"
        py="8"
        px="6"
        borderTopLeftRadius="3xl"
        borderTopRightRadius="3xl"
        space="5"
      >
        <HStack alignItems="center" justifyContent="space-between">
          <Heading color="gray.100" fontSize="lg">
            Filtrar Resolves
          </Heading>
          <IconButton
            rounded="full"
            icon={<Icon as={Feather} name="x" color="gray.400" size="lg" />}
            onPress={onClose}
          />
        </HStack>

        {!IS_IMPLEMENTED ? (
          <Text>Ainda não implementado</Text>
        ) : (
          <>
            <VStack space={2}>
              <HStack alignItems="baseline">
                <Heading fontSize="lg">Estados</Heading>
              </HStack>
              <Checkbox.Group
                colorScheme="blue"
                // defaultValue={filters.paymentMethods}
                accessibilityLabel="pick an item"
                onChange={values => {
                  setFilters(prev => ({ ...prev, paymentMethods: values }));
                }}
              >
                <Checkbox
                  value="pix"
                  my="1"
                  _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
                >
                  Sem Resposta
                </Checkbox>
                <Checkbox
                  value="2"
                  my="1"
                  _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
                >
                  Respondido
                </Checkbox>
                <Checkbox
                  value="3"
                  my="1"
                  _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
                >
                  Sem Solução
                </Checkbox>
                <Checkbox
                  value="4"
                  my="1"
                  _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
                >
                  Resolvido
                </Checkbox>
              </Checkbox.Group>
            </VStack>
            <HStack space={2} mt="4">
              <Button
                title="Resetar filtros"
                variant="secondary"
                flex={1}
                onPress={handleResetFilters}
              />
              <Button
                title="Aplicar filtros"
                flex={1}
                onPress={handleApplyFilters}
              />
            </HStack>
          </>
        )}
      </VStack>
    </Modal>
  );
}
