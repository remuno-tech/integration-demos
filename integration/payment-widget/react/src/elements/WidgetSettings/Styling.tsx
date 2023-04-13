import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  Text,
  Switch,
} from '@chakra-ui/react';

import {
  BUTTON_SIZES,
  QUOTE_EXPIRE_ANIMATION,
  WIDGET_THEME,
  WIDGET_VARIANT,
} from '../../constants/widgetSettingsOptions';

const Styling = () => {
  const { register, control } = useFormContext();
  return (
    <>
      <Text as='b'>Styling</Text>
      <FormControl>
        <FormLabel>Button Size</FormLabel>
        <Select {...register('buttonSize')}>
          {BUTTON_SIZES.map((btnSize) => (
            <option value={btnSize}>{btnSize}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Widget Theme</FormLabel>
        <Select {...register('theme')}>
          {WIDGET_THEME.map((theme) => (
            <option value={theme}>{theme}</option>
          ))}
        </Select>
        <FormHelperText>
          The theme that the widget will be displayed in
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Widget Variant</FormLabel>
        <Select {...register('variant')}>
          {WIDGET_VARIANT.map((variant) => (
            <option value={variant}>{variant}</option>
          ))}
        </Select>
        <FormHelperText>
          Choose the type / positioning of the widget that is displayed once the
          button is clicked
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>Quote Expiry Animation</FormLabel>
        <Select {...register('quoteExpireAnimation')}>
          {QUOTE_EXPIRE_ANIMATION.map((variant) => (
            <option value={variant}>{variant}</option>
          ))}
        </Select>
        <FormHelperText>
          Your customer has a set period of time to settle the crypto
          transaction. When the time expires without payment, the refresh quote
          button will animate according to this setting if they need to pay
          more.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>
          Show coin protocol banners
          <Controller
            control={control}
            name={'showCoinProtocolBanner'}
            render={({ field: { onChange, value, ref } }) => (
              <Switch ml={2} onChange={onChange} ref={ref} isChecked={value} />
            )}
          />
        </FormLabel>
        <FormHelperText>
          Your customer has a set period of time to settle the crypto
          transaction. When the time expires without payment, the refresh quote
          button will animate according to this setting if they need to pay
          more.
        </FormHelperText>
      </FormControl>
      <FormControl>
        <FormLabel>
          Confirm coin selection
          <Controller
            control={control}
            name={'confirmCoinSelection'}
            render={({ field: { onChange, value, ref } }) => (
              <Switch ml={2} onChange={onChange} ref={ref} isChecked={value} />
            )}
          />
        </FormLabel>
        <FormHelperText>
          If enabled, displays a confirmation prompt after the user has selected
          a coin and chooses to proceed with the payment. This is enabled by
          default and we recommend leaving this on, so that the user confirms
          the coin they have chosen is the correct one.
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default Styling;
