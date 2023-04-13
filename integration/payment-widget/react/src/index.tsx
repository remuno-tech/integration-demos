import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <ChakraProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </ChakraProvider>,
);
