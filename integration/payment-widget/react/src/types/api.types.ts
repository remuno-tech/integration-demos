export interface ApiCoin {
  id: string;
  displayCode?: string;
  code: string;
  displayName: string;
  extraId: string | null;
  extraIdRegex: string | null;
  logoUrl: string;
  network: string;
  protocol: string;
  tokenAddress?: string | null;
  chainId?: number | null;
  transferGasLimit: number | null;
  isPromoted?: boolean;
  isPopular: boolean;
  isStableCoin: boolean;
  isNativeCoin: boolean;
  isTrending: boolean;
  decimals: number;
}

export interface ApiQuote {
  quote: {
    adjustedAmount: string;
    amount: string;
    quote: string;
    fromFiat: string;
    marketRate: boolean;
    networkFeesCoin: string;
    networkFeesFiat: string;
    toCoin: string;
    createdAt: string;
    exchangeRate: string;
    nonce: string;
    toNetwork: string;
    marketExchangeRate: string;
  };
  token: string;
}

export interface ApiTxn {
  adjustedInitialAmount: string;
  id: string;
  txnStatus: TransactionStatus;
  merchantId: string;
  walletCoinId: string;
  orderId: string;
  orderDescription: string;
  walletAddress: string;
  fromFiat: string;
  toCoin: string;
  quote: string;
  quoteExpiresAt: string;
  paymentMarkupPercent: string;
  maxPaymentCompletePercent: string;
  minPaymentCompletePercent: string;
  txnFeePercent: number;
  paymentExpiryPeriodSeconds: number;
  paymentExpiresAt: string;
  keyName: string | null;
  paymentStatus: PaymentStatus;
  settlementStatus: string;
  paymentNotificationUrl: string;
  createdAt: string;
  updatedAt: string;
  initialAmount: string;
  receivedAmount: string;
  nextPaymentStatus?: PaymentStatus;
}

export type TransactionStatus =
  | 'pending'
  | 'confirming'
  | 'received'
  | 'quote_expired'
  | 'expired';
export type PaymentStatus =
  | 'underpaid'
  | 'paid'
  | 'overpaid'
  | 'no_payment'
  | 'failure';
