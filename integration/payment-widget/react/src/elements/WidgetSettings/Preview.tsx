import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Switch,
  Text,
  Textarea,
} from '@chakra-ui/react';

import { FIAT_CURRENCY } from '../../constants/widgetSettingsOptions';
import { ApiCoin } from '../../types/api.types';

import useTemplate from '../../hooks/useTemplate';

const Preview = () => {
  const [coinList, setCoinList] = React.useState([]);
  const { register, control, watch } = useFormContext();
  const { parseTemplate } = useTemplate();

  const isEnabledCustomDetails = watch('isEnabledCustomDetails');
  const isEnabledSummary = watch('isEnabledSummary');
  const isEnabledSelectedCoins = watch('isEnabledSelectedCoins');
  const summaryTemplate = watch('summary.template');
  const apiKey = watch('apiKey');
  const merchantId = watch('merchantId');

  const summaryVariables = useMemo(() => {
    return parseTemplate(summaryTemplate);
  }, [parseTemplate, summaryTemplate]);

  const handleToggleCoin = (value: Array<string>, code: string) => {
    const isInList = value.includes(code);
    if (isInList) {
      return value.filter((c: string) => c !== code);
    } else {
      return [...value, code];
    }
  };

  React.useEffect(() => {
    if (merchantId && apiKey) {
      fetch(`https://api.remuno.com/v1/merchants/${merchantId}/coins`, {
        headers: { 'x-api-key': apiKey },
      })
        .then((res) => res.json())
        .then((data) => setCoinList(data))
        .catch((err) => console.log(err));
    }
  }, [apiKey, merchantId]);

  return (
    <>
      <Text as='b'>Preview parameters</Text>
      <FormControl>
        <FormLabel>Amount in Fiat</FormLabel>
        <Input placeholder='Amount in Fiat' {...register('amount')} />
        <FormHelperText>
          The amount the customer will be charged (specified in the selected
          fiat currency). Your web page should feed this dynamically to the
          widget for each transaction.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Fiat Currency</FormLabel>
        <Select {...register('fromFiat')}>
          {FIAT_CURRENCY.map((currency) => (
            <option key={currency} value={currency}>{currency}</option>
          ))}
        </Select>
        <FormHelperText>
          The fiat currency that the customer will be charged in
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Order ID</FormLabel>
        <Input {...register('orderId')} placeholder='Order ID' />
        <FormHelperText>
          This is a unique transaction reference that you provide and is
          mandatory. Your web page should feed this dynamically to the widget
          for each transaction.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Order Description</FormLabel>
        <Input
          {...register('orderDescription')}
          placeholder='Order Description'
        />
        <FormHelperText>
          This will provide a description for your transactions e.g “white t
          shirt”
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>
          Market Rate
          <Controller
            control={control}
            name={'marketRate'}
            render={({ field: { onChange, value, ref } }) => (
              <Switch ml={2} onChange={onChange} ref={ref} isChecked={value} />
            )}
          />
        </FormLabel>

        <FormHelperText>
          If enabled, makes the payment widget transaction a market rate
          transaction. For non-market rate transactions, the exchange rate is
          adjusted to include the Remuno fee and then transaction fees are
          added, meaning the buyer bears the cost of the transaction. For a
          market rate transaction, the user is quoted the current market
          exchange rate for a coin and no additional fees are added. However,
          the Remuno fees are deducted at settlement, so the merchant bears the
          cost of the transaction and does not get the full amount.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>
          Custom Details
          <Controller
            control={control}
            name={'isEnabledCustomDetails'}
            render={({ field: { onChange, value, ref } }) => (
              <Switch ml={2} onChange={onChange} ref={ref} isChecked={value} />
            )}
          />
        </FormLabel>
        {isEnabledCustomDetails && (
          <Textarea {...register('customDetails')} mt={2} />
        )}
        <FormHelperText>
          A json object you can store with the transaction. It will be returned
          with the other transaction details when fetching the transaction from
          the API.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>
          Items message for quote update
          <Controller
            control={control}
            name={'isEnabledSummary'}
            render={({ field: { onChange, value, ref } }) => (
              <Switch ml={2} onChange={onChange} ref={ref} isChecked={value} />
            )}
          />
        </FormLabel>
        {isEnabledSummary && (
          <>
            <Input
              mt={2}
              {...register('summary.template')}
              placeholder='Tempalte'
            />
            {summaryVariables?.map((variable) => (
              <Box key={variable.name} mt={2}>
                <FormLabel>{variable.name}</FormLabel>
                <Input {...register(`summary.variables.${variable.name}`)} />
              </Box>
            ))}
          </>
        )}
        <FormHelperText>
          For market rate transactions the amount that you will get varies per
          coin, as some coins have larger transaction fees. This feature allows
          you to provide a string which recalculates what the user will receive
          after the coin has been selected or the quote is updated. The string
          is displayed to the buyer within the widget.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>
          Selected Coins
          <Controller
            control={control}
            name={'isEnabledSelectedCoins'}
            render={({ field: { onChange, value, ref } }) => (
              <Switch ml={2} onChange={onChange} ref={ref} isChecked={value} />
            )}
          />
        </FormLabel>
        {!!coinList?.length && isEnabledSelectedCoins && (
          <Controller
            control={control}
            name={'selectedCoins'}
            render={({ field: { onChange, value, ref } }) => (
              <FormControl>
                {coinList?.map((coin: ApiCoin) => (
                  <Box key={coin.code}>
                    {coin.displayCode}
                    <Switch
                      ml={2}
                      onChange={(e) =>
                        onChange(handleToggleCoin(value, coin.code))
                      }
                      ref={ref}
                      isChecked={value.includes(coin.code)}
                    />
                  </Box>
                ))}
              </FormControl>
            )}
          />
        )}
        <FormHelperText>
          Narrows list of available coins to selected ones
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default Preview;
