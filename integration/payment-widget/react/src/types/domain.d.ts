
import { ApiQuote, ApiTxn } from '@/types/api.types';

import { QuoteExpireAnimationEnum } from './enum/quote-expire-animation.enum';
import { WidgetButtonSizeEnum } from './enum/widget-button-size.enum';
import { WidgetPopupPlacementEnum } from './enum/widget-popup-placement.enum';
import { WidgetThemeEnum } from './enum/widget-theme.enum';
import { WidgetVariantEnum } from './enum/widget-variant.enum';

export type WidgetCallbacks = {
  onTransactionCompleted: (data: ApiTxn) => void;
  onTransactionExpired: (data: ApiTxn) => void;
  onTransactionCreated: (data: ApiTxn) => void;
  onTransactionFailed: (error?: string) => void;
  onTransactionCancelled: (data: ApiTxn) => void;
  onQuoteUpdated: (data: ApiQuote) => void;
  onOpen: () => void;
  onClose: () => void;
};

export type Summary = {
  template?: string;
  variables?: Record<string, string>;
};

export type AppConfig = {
  isOpened: boolean;
  isDisabled: boolean;
  selector: string;
  apiKey: string;
  merchantId: string;
  notificationUrl: string;
  apiBaseUrl: string;
  callbacks?: Partial<WidgetCallbacks>;
  amount: number;
  fromFiat: string;
  variant?: WidgetVariantEnum;
  unbranded: boolean;
  orderDescription: string;
  theme: WidgetThemeEnum;
  orderId: string;
  buttonSize: WidgetButtonSizeEnum;
  quoteExpireAnimation: QuoteExpireAnimationEnum;
  showCoinProtocolBanner: boolean;
  quoteExpiryPeriod: number;
  paymentExpiryPeriod: number;
  confirmCoinSelection: boolean;
  marketRate: boolean;
  unbrandedTitle: string;
  popupPlacement: WidgetPopupPlacementEnum;
  selectedCoins?: string[] | undefined;
  summary?: Summary;
  customDetails?: Record<string, unknown>;
};

