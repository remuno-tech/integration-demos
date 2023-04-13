import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';

const ApiIntegration = () => {
  const { register } = useFormContext();

  const apiKey = register('apiKey');
  const merchantId = register('merchantId');

  return (
    <>
      <Text as='b'>API Integration</Text>
      <FormControl>
        <FormLabel>Api Key</FormLabel>
        <Input
          placeholder='API key'
          {...apiKey}
          onChange={(e) => {
            apiKey.onChange(e);
            localStorage.setItem('apiKey', e.target.value);
          }}
        />
        <FormHelperText>
          The payment widget should only be used with a Widget API key. You can
          get it in Integration -{'>'} API. Remember to enable your key!
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Merchant ID</FormLabel>
        <Input
          placeholder='Merchant ID'
          {...merchantId}
          onChange={(e) => {
            merchantId.onChange(e);
            localStorage.setItem('merchantId', e.target.value);
          }}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Notification URL</FormLabel>
        <Input
          placeholder='Notification URL'
          {...register('notificationUrl')}
        />
        <FormHelperText>
          This is an optional notification URL. Updates to the state of
          transactions will be POSTed to this endpoint.
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default ApiIntegration;
