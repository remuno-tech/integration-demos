const callbacks = {
  onTransactionCompleted: (data) => {
    document.querySelector('.modal').classList.add('show');
    document.querySelector('.modal').style.display = 'block';
    document.querySelector('#order-id').innerHTML = data.orderId;
    console.log('TXN COMPLETED SUCCESS', data);
  },
  onTransactionExpired: (data) => console.log('TXN COMPLETED FAIL', data),
  onTransactionCreated: (data) => console.log('TXN CREATED SUCCESS', data),
  onTransactionFailed: (data) => console.log('TXN CREATED FAIL', data),
  onQuoteUpdated: (data) => console.log('QUOTE UPDATED', data),
  onTransactionCancelled: (data) => console.log(`TXN CANCELLED`, data),
  onClose: () => console.log('WIDGET CLOSED'),
  onOpen: () => console.log('WIDGET OPENED'),
};

const apiKey = localStorage.getItem('apiKey');
const merchantId = localStorage.getItem('merchantId');

let DEFAULT_SUMMARY = {
  template:
    'You will get:\nAt least {d:decimalAmount} coins {i:coinImage:20px#20px}',
  variables: {
    decimalAmount: '10000',
    coinImage: 'https://remuno.com/icons/icon-placeholder.png',
  },
};

// Widget initial configuration. Applying changes to it and running updateWidget() will cause widget to update with values in it.
// For example: handleChange function in formUtils.js will update config with corresponding values from the form.
let remunoConfig = {
  selector: '#widget-preview',
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
  isEnabledCustomDetails: false,
  customDetails: {},
  selectedCoins: [],
  isEnabledSummary: false,
  isSelectedCoinsEnabled: false,
  summary: DEFAULT_SUMMARY,
  callbacks,
};

if (window.Remuno && window.Remuno.Widget) {
  window.Remuno.Widget.init(remunoConfig);
} else {
  window.Remuno = {
    Widget: {
      onLoad: function () {
        window.Remuno.Widget.init(remunoConfig);
      },
    },
  };
}

// update widget with the latest values from the config. Can be used as patch (update only one or multiple params)
// For example: window.Remuno.Widget.updateConfig({ amount: 2 });
function updateWidget() {
  window.Remuno.Widget.updateConfig({
    selector: '#widget-preview',
    customDetails: remunoConfig.isEnabledCustomDetails
      ? stringToJson(remunoConfig.customDetails)
      : undefined,
    summary: remunoConfig.isEnabledSummary
      ? {
          ...remunoConfig.summary,
          template: formatBreakline(remunoConfig.summary.template),
        }
      : undefined,
    selectedCoins: remunoConfig.isSelectedCoinsEnabled
      ? remunoConfig.selectedCoins
      : undefined,
    ...remunoConfig,
  });
}
