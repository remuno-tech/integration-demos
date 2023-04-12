import { Flex } from '@chakra-ui/react';

import WidgetPreview from './elements/WidgetPreview';
import WidgetSettings from './elements/WidgetSettings';

const App = () => {
  return (
    <Flex>
      <WidgetSettings />
      <WidgetPreview />
    </Flex>
  );
};

export default App;
