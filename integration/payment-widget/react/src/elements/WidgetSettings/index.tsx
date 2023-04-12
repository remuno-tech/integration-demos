import React, {useEffect, useMemo} from "react";
import {
    Box,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    ListItem,
    Select,
    Text,
    Textarea,
    UnorderedList,
    VStack
} from "@chakra-ui/react";

import {
    BUTTON_SIZES,
    FIAT_CURRENCY,
    QUOTE_EXPIRE_ANIMATION,
    WIDGET_THEME,
    WIDGET_VARIANT
} from "../../constants/widgetSettingsOptions";

import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {
    setAmount,
    setApiKey,
    setButtonSize,
    setCoinSelection,
    setCustomDetails,
    setFromFiat,
    setIsEnabledCustomDetails,
    setIsEnabledSelectedCoins,
    setIsEnabledSummary,
    setMarketRate,
    setMerchantId,
    setNotificationUrl,
    setOrderDescription,
    setOrderId,
    setQuoteExpireAnimation, setSelectedCoins,
    setShowCoinProtocolBanner,
    setSummaryTemplate,
    setSummaryVariables,
    setTheme,
    setVariant
} from '../../store/slices/widgetSlice';
import useTemplate from "../../hooks/useTemplate";
import {Switch} from "../../components/Switch";
import {ApiCoin} from "../../types/api.types";

const WidgetSettings = () => {
    const dispatch = useAppDispatch();
    const {parseTemplate} = useTemplate();
    const widgetParams = useAppSelector((state) => state.widget);
    const [coinsList, setCoinsList] = React.useState([]);

    const summaryVariables = useMemo(() => {
        return parseTemplate(widgetParams?.summary?.template);
    }, [parseTemplate, widgetParams?.summary?.template]);

    useEffect(() => {
        if (localStorage.getItem('apiKey')) {
            dispatch(setApiKey(localStorage.getItem('apiKey')));
        }
        if (localStorage.getItem('merchantId')) {
            dispatch(setMerchantId(localStorage.getItem('merchantId')));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (widgetParams.merchantId && widgetParams.apiKey) {
            fetch(`https://api.remuno.com/v1/merchants/${widgetParams.merchantId}/coins`, {headers: {'x-api-key': widgetParams.apiKey}})
                .then(res => res.json()).then(data => setCoinsList(data))
        }
    }, [widgetParams.apiKey, widgetParams.merchantId]);

    const handleSelectCoin = (coin: string) => {
        const isInList = widgetParams.selectedCoins.includes(coin);
        if (isInList) {
            dispatch(setSelectedCoins(widgetParams.selectedCoins.filter(c => c !== coin)))
        } else {
            dispatch(setSelectedCoins([...widgetParams.selectedCoins, coin]))
        }
    }

    return <VStack w='50%' h='100vh' p={2} overflow='auto' spacing='8px'>
        <Text as='b'>API Integration</Text>
        <FormControl>
            <FormLabel>Api Key</FormLabel>
            <Input placeholder='API key' value={widgetParams.apiKey}
                   onChange={(e) => dispatch(setApiKey(e.target.value))} />
            <FormHelperText>The payment widget should only be used with a Widget API key. You can get it in Integration
                -{">"} API. Remember to enable your key!</FormHelperText>
        </FormControl>
        <FormControl>
            <FormLabel>Merchant ID</FormLabel>
            <Input placeholder='Merchant ID' value={widgetParams.merchantId}
                   onChange={(e) => dispatch(setMerchantId(e.target.value))} />
        </FormControl>
        <FormControl>
            <FormLabel>Notification URL</FormLabel>
            <Input placeholder='Notification URL' value={widgetParams.notificationUrl}
                   onChange={(e) => dispatch(setNotificationUrl(e.target.value))} />
            <FormHelperText>This is an optional notification URL. Updates to the state of transactions will be POSTed to
                this endpoint.</FormHelperText>
        </FormControl>
        <Text as='b'>Styling</Text>
        <FormControl>
            <FormLabel>Button Size</FormLabel>
            <Select
                onChange={(e) => dispatch(setButtonSize(e.target.value))}
                value={widgetParams.buttonSize}
            >
                {
                    BUTTON_SIZES.map((btnSize) => <option value={btnSize}>{btnSize}</option>)
                }
            </Select>
        </FormControl>
        <FormControl>
            <FormLabel>Widget Theme</FormLabel>
            <Select
                onChange={(e) => dispatch(setTheme(e.target.value))}
                value={widgetParams.theme}
            >
                {
                    WIDGET_THEME.map((theme) => <option value={theme}>{theme}</option>)
                }
            </Select>
            <FormHelperText>The theme that the widget will be displayed in</FormHelperText>
        </FormControl>
        <FormControl>
            <FormLabel>Widget Variant</FormLabel>
            <Select
                onChange={(e) => dispatch(setVariant(e.target.value))}
                value={widgetParams.variant}
            >
                {
                    WIDGET_VARIANT.map((variant) => <option value={variant}>{variant}</option>)
                }
            </Select>
            <FormHelperText>Choose the type / positioning of the widget that is displayed once the button is
                clicked</FormHelperText>
        </FormControl>
        <FormControl>
            <FormLabel>Quote Expiry Animation</FormLabel>
            <Select
                onChange={(e) => dispatch(setQuoteExpireAnimation(e.target.value))}
                value={widgetParams.quoteExpireAnimation}
            >
                {
                    QUOTE_EXPIRE_ANIMATION.map((variant) => <option value={variant}>{variant}</option>)
                }
            </Select>
            <FormHelperText>Your customer has a set period of time to settle the crypto transaction. When the time
                expires without payment, the refresh quote button will animate according to this setting if they need to
                pay more.</FormHelperText>
        </FormControl>
        <FormControl>
            <FormLabel>
                Show coin protocol banners
                <Switch
                    defaultValue={widgetParams.showCoinProtocolBanner}
                    onChange={(value) => dispatch(setShowCoinProtocolBanner(value))}
                />
            </FormLabel>
            <FormHelperText>Your customer has a set period of time to settle the crypto transaction. When the time
                expires without payment, the refresh quote button will animate according to this setting if they need to
                pay more.</FormHelperText>
        </FormControl>
        <FormControl>
            <FormLabel>
                Confirm coin selection
                <Switch
                    defaultValue={widgetParams.confirmCoinSelection}
                    onChange={(value) => dispatch(setCoinSelection(value))}
                />
            </FormLabel>
            <FormHelperText>If enabled, displays a confirmation prompt after the user has selected a coin and chooses to
                proceed with the payment. This is enabled by default and we recommend leaving this on, so that the user
                confirms the coin they have chosen is the correct one.</FormHelperText>
        </FormControl>
        <Text as='b'>Preview parameters</Text>
        <FormControl>
            <FormLabel>Amount in Fiat</FormLabel>
            <Input
                value={widgetParams.amount}
                placeholder='Amount in Fiat'
                onChange={(e) => dispatch(setAmount(e.target.value))}
            />
            <FormHelperText>The amount the customer will be charged (specified in the selected fiat currency). Your web
                page should feed this dynamically to the widget for each transaction.</FormHelperText>
        </FormControl>
        <FormControl>
            <FormLabel>Fiat Currency</FormLabel>
            <Select
                onChange={(e) => dispatch(setFromFiat(e.target.value))}
                value={widgetParams.fromFiat}
            >
                {
                    FIAT_CURRENCY.map((currency) => <option value={currency}>{currency}</option>)
                }
            </Select>
            <FormHelperText>The fiat currency that the customer will be charged in</FormHelperText>
        </FormControl>
        <FormControl>
            <FormLabel>Order ID</FormLabel>
            <Input
                value={widgetParams.orderId}
                placeholder='Order ID'
                onChange={(e) => dispatch(setOrderId(e.target.value))}
            />
            <FormHelperText>This is a unique transaction reference that you provide and is mandatory. Your web page
                should feed this dynamically to the widget for each transaction.</FormHelperText>
        </FormControl>
        <FormControl>
            <FormLabel>Order Description</FormLabel>
            <Input
                value={widgetParams.orderDescription}
                placeholder='Order Description'
                onChange={(e) => dispatch(setOrderDescription(e.target.value))}
            />
            <FormHelperText>This will provide a description for your transactions e.g “white t shirt”</FormHelperText>
        </FormControl>
        <FormControl>
            <FormLabel>
                Market Rate
                <Switch
                    defaultValue={widgetParams.marketRate}
                    onChange={(value => dispatch(setMarketRate(value)))}
                />
            </FormLabel>

            <FormHelperText>If enabled, makes the payment widget transaction a market rate transaction. For non-market
                rate transactions, the exchange rate is adjusted to include the Remuno fee and then transaction fees are
                added, meaning the buyer bears the cost of the transaction. For a market rate transaction, the user is
                quoted the current market exchange rate for a coin and no additional fees are added. However, the Remuno
                fees are deducted at settlement, so the merchant bears the cost of the transaction and does not get the
                full amount.</FormHelperText>
        </FormControl>
        <FormControl>
            <FormLabel>
                Custom Details
                <Switch
                    defaultValue={widgetParams.isEnabledCustomDetails}
                    onChange={(value) => dispatch(setIsEnabledCustomDetails(value))}
                />
            </FormLabel>
            {
                widgetParams.isEnabledCustomDetails &&
              <Textarea
                mt={2}
                value={widgetParams.customDetails}
                onChange={(e) => dispatch(setCustomDetails(e.target.value))}
              />
            }
            <FormHelperText>A json object you can store with the transaction. It will be returned with the other
                transaction details when fetching the transaction from the API.</FormHelperText>
        </FormControl>
        <FormControl>
            <FormLabel>
                Items message for quote update
                <Switch
                    defaultValue={widgetParams.isEnabledSummary}
                    onChange={(value) => dispatch(setIsEnabledSummary(value))}
                />
            </FormLabel>
            {
                widgetParams.isEnabledSummary && <>
                <Input mt={2} value={widgetParams.summary.template} placeholder='Template'
                       onChange={(e) => dispatch(setSummaryTemplate(e.target.value))} />
                    {
                        summaryVariables?.map(variable => (
                                <Box mt={2}>
                                    <FormLabel>{variable.name}</FormLabel>
                                    <Input
                                        value={widgetParams?.summary?.variables?.[variable.name]}
                                        onChange={(e) =>
                                            dispatch(setSummaryVariables({[variable.name]: e.target.value}))
                                        } />
                                </Box>
                            )
                        )
                    }
              </>
            }
            <FormHelperText>For market rate transactions the amount that you will get varies per coin, as some coins
                have larger transaction fees. This feature allows you to provide a string which recalculates what the
                user will receive after the coin has been selected or the quote is updated. The string is displayed to
                the buyer within the widget.</FormHelperText>
        </FormControl>
        <FormControl>
            <FormLabel>
                Selected Coins
                <Switch
                    defaultValue={widgetParams.isEnabledSelectedCoins}
                    onChange={(value) => dispatch(setIsEnabledSelectedCoins(value))}
                />
            </FormLabel>
            {
                widgetParams.isEnabledSelectedCoins &&
                coinsList.map((coin: ApiCoin) => <Box>
                    {coin.displayCode} <Switch
                    defaultValue={widgetParams.isEnabledSummary}
                    onChange={() => handleSelectCoin(coin.code)}
                />
                </Box>)
            }
            <FormHelperText>Narrows list of available coins to selected ones</FormHelperText>
        </FormControl>
        <Text as='b'>Callbacks (check types for more details)</Text>
        <Box w='100%'>
            <UnorderedList>
                <ListItem>onTransactionCompleted: (data: ApiTxn) ={">"} void;</ListItem>
                <ListItem>onTransactionExpired: (data: ApiTxn) ={">"} void;</ListItem>
                <ListItem>onTransactionCreated: (data: ApiTxn) ={">"} void;</ListItem>
                <ListItem>onTransactionFailed: (error?: string) ={">"} void;</ListItem>
                <ListItem>onTransactionCancelled: (data: ApiTxn) ={">"} void;</ListItem>
                <ListItem>onQuoteUpdated: (data: ApiQuote) ={">"} void;</ListItem>
                <ListItem>onOpen: () ={">"} void;</ListItem>
                <ListItem>onClose: () ={">"} void;</ListItem>
            </UnorderedList>
        </Box>
    </VStack>
}

export default WidgetSettings;