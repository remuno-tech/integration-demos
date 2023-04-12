import { createSlice } from '@reduxjs/toolkit';

import { Summary } from '../../types/domain';

const DEFAULT_SUMMARY: Summary = {
  template:
    'You will get:\\nAt least {d:decimalAmount} coins {i:coinImage:20px#20px}',
  variables: {
    decimalAmount: '10000',
    coinImage: 'https://remuno.com/icons/icon-placeholder.png',
  },
};

const widgetSlice = createSlice({
  name: 'widget',
  initialState: {
    apiKey: '',
    merchantId: '',
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
  },
  reducers: {
    setMerchantId(state, action) {
      localStorage.setItem('merchantId', action.payload);
      state.merchantId = action.payload;
    },
    setButtonSize(state, action) {
      state.buttonSize = action.payload;
    },
    setFromFiat(state, action) {
      state.fromFiat = action.payload;
    },
    setVariant(state, action) {
      state.variant = action.payload;
    },
    setOrderId(state, action) {
      state.orderId = action.payload;
    },
    setOrderDescription(state, action) {
      state.orderDescription = action.payload;
    },
    setTheme(state, action) {
      state.theme = action.payload.toLowerCase();
    },
    setQuoteExpireAnimation(state, action) {
      state.quoteExpireAnimation = action.payload.toLowerCase();
    },
    setShowCoinProtocolBanner(state, action) {
      state.showCoinProtocolBanner = action.payload;
    },
    setCoinSelection(state, action) {
      state.confirmCoinSelection = action.payload;
    },
    setAmount(state, action) {
      state.amount = action.payload;
    },
    setNotificationUrl(state, action) {
      if (action.payload !== '') {
        state.notificationUrl = action.payload;
      }
    },
    setApiKey(state, action) {
      localStorage.setItem('apiKey', action.payload);
      state.apiKey = action.payload;
    },
    setMarketRate(state, action) {
      state.marketRate = action.payload;
    },
    setIsEnabledCustomDetails(state, action) {
      state.isEnabledCustomDetails = action.payload;
    },
    setCustomDetails(state, action) {
      state.customDetails = action.payload;
    },
    setIsEnabledSummary(state, action) {
      state.isEnabledSummary = action.payload;
    },
    setIsEnabledSelectedCoins(state, action) {
      state.isEnabledSelectedCoins = action.payload;
    },
    setSummaryTemplate(state, action) {
      state.summary.template = action.payload;
    },
    setSelectedCoins(state, action) {
      state.selectedCoins = action.payload;
    },
    setSummaryVariables(state, action) {
      state.summary.variables = {
        ...state.summary.variables,
        ...action.payload,
      };
    },
    init(state) {
      state.buttonSize = 'large';
    },
  },
});

export default widgetSlice.reducer;
export const {
  setMerchantId,
  setApiKey,
  setButtonSize,
  setFromFiat,
  setVariant,
  setOrderId,
  setOrderDescription,
  setMarketRate,
  setTheme,
  setQuoteExpireAnimation,
  setShowCoinProtocolBanner,
  setIsEnabledCustomDetails,
  setIsEnabledSummary,
  setSummaryTemplate,
  setSummaryVariables,
  setCustomDetails,
  setAmount,
  setNotificationUrl,
  setCoinSelection,
  setIsEnabledSelectedCoins,
  setSelectedCoins,
  init,
} = widgetSlice.actions;
