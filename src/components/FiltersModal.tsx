import { Feather } from '@expo/vector-icons';
import {
  Checkbox,
  HStack,
  Heading,
  Icon,
  IconButton,
  Modal,
  Switch,
  Text,
  VStack,
} from 'native-base';
import { useState } from 'react';

import { Button } from '@components/Button';
import { FilterChip } from '@components/FilterChip';
import { IFiltersDTO } from '@dtos/FiltersDTO';
import { chooseIfNewOrUsedIsBooleanOrNull } from '@utils/helpers/conditions';

type Props = {
  visible: boolean;
  onClose?: () => void;
  onChangeFilters?: (filters: IFiltersDTO) => void;
  defaultValue: IFiltersDTO;
};

export const emptyFilters: IFiltersDTO = {
  productName: null,
  isNew: null,
  acceptTrade: null,
  paymentMethods: [],
};
export function FiltersModal({
  visible,
  onClose = () => { },
  onChangeFilters = () => { },
  defaultValue,
}: Props) {
  const [filters, setFilters] = useState<IFiltersDTO>(defaultValue);
  const [isNewSelected, setIsNewSelected] = useState(
    defaultValue.isNew === true,
  );
  const [isUsedSelected, setIsUsedSelected] = useState(
    defaultValue.isNew === false,
  );

  const handleResetFilters = () => {
    setFilters(emptyFilters);
    onChangeFilters(emptyFilters);
    onClose();
  };

  const handleApplyFilters = () => {
    onChangeFilters(filters);
    onClose();
  };

  const handleChangeIsNewFilter = (
    isEnabled: boolean,
    type: 'new' | 'used',
  ) => {
    setFilters(prev => ({
      ...prev,
      isNew: chooseIfNewOrUsedIsBooleanOrNull(isEnabled, type, filters.isNew),
    }));
    if (type === 'new') {
      setIsNewSelected(prev => !prev);
      return;
    }
    setIsUsedSelected(prev => !prev);
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
        <VStack space={3}>
          <Text fontSize="sm" fontWeight="bold">
            Condição
          </Text>
          <HStack space={2}>
            <FilterChip
              title="Novo"
              onChange={isEnabled => handleChangeIsNewFilter(isEnabled, 'new')}
              value={isNewSelected}
            />
            <FilterChip
              title="Usado"
              onChange={isEnabled => handleChangeIsNewFilter(isEnabled, 'used')}
              value={isUsedSelected}
            />
          </HStack>
        </VStack>
        <VStack alignItems="flex-start">
          <Text fontSize="sm" fontWeight="bold">
            Aceita troca?
          </Text>
          <Switch
            offTrackColor="gray.500"
            thumbColor="white"
            onTrackColor="blue.500"
            value={!!filters.acceptTrade}
            onValueChange={value =>
              setFilters(prev => ({ ...prev, acceptTrade: value }))
            }
          />
        </VStack>
        <VStack space={2}>
          <HStack alignItems="baseline">
            <Heading fontSize="lg">Meios de pagamento aceito</Heading>
          </HStack>
          <Checkbox.Group
            colorScheme="blue"
            defaultValue={filters.paymentMethods}
            accessibilityLabel="pick an item"
            onChange={values => {
              setFilters(prev => ({ ...prev, paymentMethods: values }));
            }}
          >
            <Checkbox
              _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
              value="boleto"
              my="1"
            >
              Boleto
            </Checkbox>
            <Checkbox
              value="pix"
              my="1"
              _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
            >
              Pix
            </Checkbox>
            <Checkbox
              value="cash"
              my="1"
              _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
            >
              Dinheiro
            </Checkbox>
            <Checkbox
              value="card"
              my="1"
              _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
            >
              Cartão de crédito
            </Checkbox>
            <Checkbox
              value="deposit"
              my="1"
              _checked={{ bg: 'blue.500', borderColor: 'blue.500' }}
            >
              Depósito Bancário
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
      </VStack>
    </Modal>
  );
}
