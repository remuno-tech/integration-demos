import React, {useMemo, useState, useEffect} from "react";
import Helmet from "react-helmet";

import {useAppSelector} from "../../store/hooks";
import stringToJson from "../../utils/stringToJson";
import formatBreakline from "../../utils/formatBreakline";
import {Box} from "@chakra-ui/react";
import {ApiQuote, ApiTxn} from "../../types/api.types";

const WidgetPreview = () => {
    const widgetParams = useAppSelector((state) => state.widget);

    const [isScriptLoaded, setIsScriptLoaded] = useState(
        !!(window as any).Remuno?.Widget,
    );

    const callbacks = useMemo(() => {
        return {
            onTransactionCompleted: (data: ApiTxn) => console.log('TXN COMPLETED SUCCESS', data),
            onTransactionExpired: (data: ApiTxn) => console.log('TXN COMPLETED FAIL', data),
            onTransactionCreated: (data: ApiTxn) => console.log('TXN CREATED SUCCESS', data),
            onTransactionFailed: (err: string) => console.log('TXN CREATED FAIL', err),
            onQuoteUpdated: (data: ApiQuote) => console.log('QUOTE UPDATED', data),
            onTransactionCancelled: (data: ApiTxn) => console.log('TXN CANCELLED', data),
            onClose: () => console.log('WIDGET CLOSED'),
            onOpen: () => console.log('WIDGET OPENED'),
        };
    }, []);

    const widgetConfig = useMemo(
        () => ({
            ...widgetParams,
            selector: '#widget-preview',
            customDetails: widgetParams.isEnabledCustomDetails
                ? stringToJson(widgetParams.customDetails)
                : undefined,
                summary: widgetParams.isEnabledSummary
                    ? {
                        ...widgetParams.summary,
                        template: formatBreakline(widgetParams.summary.template as string),
                    }
                    : undefined,
            callbacks
        }),
        [callbacks, widgetParams],
    );

    useEffect(() => {
        if (!(window as any).Remuno?.Widget) {
            (window as any).Remuno = {
                Widget: {
                    onLoad: () => setIsScriptLoaded(true),
                },
            };
            return () => {
                (window as any).Remuno.Widget.destroy(widgetConfig);
                (window as any).Remuno.Widget.onLoad = undefined;
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isScriptLoaded) {
            (window as any).Remuno.Widget.init(widgetConfig);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isScriptLoaded]);

    useEffect(() => {
        if (isScriptLoaded) {
            (window as any).Remuno.Widget.updateConfig(widgetConfig);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [widgetConfig]);

    return (
        <>
            <Helmet>
                <script
                    defer
                    src={`https://pay.remuno.com/widget.min.js`}
                    type='text/javascript'
                />
            </Helmet>
            <Box p={5}>
                <div id='widget-preview' />
            </Box>

        </>
    );
}

export default WidgetPreview;