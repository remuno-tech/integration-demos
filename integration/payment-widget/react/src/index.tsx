import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import {ChakraProvider} from '@chakra-ui/react';

import {Provider} from 'react-redux';

import App from './App';
import {setupStore} from './store';

const store = setupStore();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <ChakraProvider>
            <Suspense fallback={<div>Loading...</div>}>
                <App />
            </Suspense>
        </ChakraProvider>
    </Provider>
);
