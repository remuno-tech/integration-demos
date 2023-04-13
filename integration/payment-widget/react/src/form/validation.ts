import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    apiKey: yup.string().required(),
    merchantId: yup.string().required(),
    buttonSize: yup.string().required(),
    orderId: yup.string().required(),
    fromFiat: yup.string().required(),
    theme: yup.string().required(),
    orderDescription: yup.string(),
    variant: yup.string().required(),
    quoteExpireAnimation: yup.string(),
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
