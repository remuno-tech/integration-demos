import * as yup from 'yup';

import { WidgetButtonSizeEnum } from '../types/enum/widget-button-size.enum';
import { WidgetThemeEnum } from '../types/enum/widget-theme.enum';
import { WidgetVariantEnum } from '../types/enum/widget-variant.enum';
import { QuoteExpireAnimationEnum } from '../types/enum/quote-expire-animation.enum';
import { FiatCurrencyEnum } from '../types/enum/fiat-currency.enum';

const schema = yup
  .object()
  .shape({
    apiKey: yup.string().required(),
    merchantId: yup.string().required(),
    buttonSize: yup
      .mixed()
      .oneOf(Object.values(WidgetButtonSizeEnum))
      .required(),
    orderId: yup.string().required(),
    fromFiat: yup.mixed().oneOf(Object.values(FiatCurrencyEnum)).required(),
    theme: yup.mixed().oneOf(Object.values(WidgetThemeEnum)).required(),
    orderDescription: yup.string(),
    variant: yup.mixed().oneOf(Object.values(WidgetVariantEnum)).required(),
    quoteExpireAnimation: yup
      .mixed()
      .oneOf(Object.values(QuoteExpireAnimationEnum)),
    notificationUrl: yup.string(),
    showCoinProtocolBanner: yup.boolean(),
    confirmCoinSelection: yup.boolean(),
    marketRate: yup.boolean(),
    selectedCoins: yup.array().of(yup.string()),
    customDetails: yup.string(),
    amount: yup.number().positive().required(),
  })
  .required();

export default schema;
