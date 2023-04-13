import React from 'react';
import { VStack } from '@chakra-ui/react';

import ApiIntegration from './ApiIntegration';
import Preview from './Preview';
import Callbacks from './Callbacks';
import Styling from './Styling';

const WidgetSettings = () => {
  return (
    <VStack w='50%' h='100vh' p={2} overflow='auto' spacing='8px'>
      <ApiIntegration />
      <Styling />
      <Preview />
      <Callbacks />
    </VStack>
  );
};

export default WidgetSettings;
