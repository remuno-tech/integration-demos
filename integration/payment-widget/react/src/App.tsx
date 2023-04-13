import { Flex } from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import WidgetPreview from './elements/WidgetPreview';
import WidgetSettings from './elements/WidgetSettings';

import defaultWidgetSettings from './form/defaultWidgetSettings';
import schema from './form/validation';

const App = () => {
  const methods = useForm({
    defaultValues: defaultWidgetSettings,
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Flex>
        <WidgetSettings />
        <WidgetPreview />
      </Flex>
    </FormProvider>
  );
};

export default App;
