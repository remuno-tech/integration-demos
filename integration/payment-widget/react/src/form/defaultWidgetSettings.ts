import { Summary } from '../types/domain';

const DEFAULT_SUMMARY: Summary = {
  template:
    'You will get:\\nAt least {d:decimalAmount} coins {i:coinImage:20px#20px}',
  variables: {
    decimalAmount: '10000',
    coinImage: 'https://remuno.com/icons/icon-placeholder.png',
  },
};

const apiKey = localStorage.getItem('apiKey');
const merchantId = localStorage.getItem('merchantId');

const defaultWidgetSettings = {
  apiKey: apiKey || '',
  merchantId: merchantId || '',
  buttonSize: 'small',
  fromFiat: 'USD',
  amount: 1,
  variant: 'dialog',
  orderId:
    'Order' +
    Math.floor(Math.random() * 10) +
    Math.floor(Math.random() * 10) +
    Math.floor(Math.random() * 10) +
    Math.floor(Math.random() * 10),
  orderDescription: '',
  theme: 'light',
  quoteExpireAnimation: 'skew',
  showCoinProtocolBanner: true,
  notificationUrl: '',
  scriptHtml: '',
  buttonHtml: '',
  confirmCoinSelection: false,
  marketRate: false,
  isEnabledSelectedCoins: false,
  isEnabledCustomDetails: false,
  customDetails: '{}',
  isEnabledSummary: false,
  selectedCoins: [] as Array<string>,
  summary: DEFAULT_SUMMARY,
};

export default defaultWidgetSettings;
