import React from 'react';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import defaultWidgetSettings from './form/defaultWidgetSettings';
import schema from './form/validation';

import WidgetPreview from './elements/WidgetPreview';
import WidgetSettings from './elements/WidgetSettings';
import SuccessPaymentModal from './elements/SuccessPaymentModal';
import { ApiTxn } from './types/api.types';

const App = () => {
  const { onClose } = useDisclosure();
  const [txn, setTxn] = React.useState<ApiTxn>();
  const [isWidgetOpen, setIsWidgetOpen] = React.useState(false);
  const methods = useForm({
    defaultValues: defaultWidgetSettings,
    resolver: yupResolver(schema),
  });

  const handleCloseModal = () => {
    setTxn(undefined);
    onClose();
  };

  const handleSuccess = (transaction: ApiTxn) => {
    setTxn(transaction);
  };

  const onWidgetOpen = () => {
    setIsWidgetOpen(true);
  };

  const onWidgetClose = () => {
    setIsWidgetOpen(false);
  };

  const isComplete = React.useMemo(
    () => !!(!isWidgetOpen && txn),
    [isWidgetOpen, txn],
  );

  return (
    <FormProvider {...methods}>
      <Flex>
        <WidgetSettings />
        <WidgetPreview
          handleSuccess={handleSuccess}
          onWidgetClose={onWidgetClose}
          onWidgetOpen={onWidgetOpen}
        />
      </Flex>
      <SuccessPaymentModal
        isOpen={isComplete}
        onClose={handleCloseModal}
        txn={txn}
      />
    </FormProvider>
  );
};

export default App;
