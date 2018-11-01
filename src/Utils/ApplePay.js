import Config from 'react-native-config';
import {PaymentRequest} from 'react-native-payments'
import { PaymentAddress } from '../../node_modules/react-native-payments/lib/js/types';
import PaymentRequestUpdateEvent from '../../node_modules/react-native-payments/lib/js/PaymentRequestUpdateEvent';
import { SHIPPING_ADDRESS_CHANGE_EVENT } from '../../node_modules/react-native-payments/lib/js//constants';

export const getPaymentData = (platform) => {
    if (platform === "ios") {
        return [{
            supportedMethods: ['apple-pay'],
            data: {
                merchantIdentifier: 'merchant.com.imoveapp.sirva',
                supportedNetworks: ['visa', 'mastercard', 'amex', 'jcb', 'discover'],
                countryCode: 'US',
                currencyCode: 'USD',
                paymentMethodTokenizationParameters: {
                    parameters: {
                        gateway: 'stripe',
                        'stripe:publishableKey': Config.STRIPE_PUB_KEY,
                    }
                }
            }
        }]
    } else {
        return []
    }
}

// displayItems: [{ name: string, value: number }], total: number
export const getPaymentDetails = (displayItems, total, includeShippingOptions = false) => {
    const details = {
        displayItems: [],
        shippingOptions: [],
        total: {
            label: 'Sirva (via imove)',
            amount: { currency: 'USD', value: total }
        },
    }

    if (includeShippingOptions) {
        details.shippingOptions = [
            {
                id: 'standard',
                label: 'Standard Shipping',
                amount: { currency: 'USD', value: '0.00' },
                detail: '',
                selected: false
            }
        ]
    }

    for (let i = 0; i < displayItems.length; i++) {
        if (displayItems[i].value > 0) {
            details.displayItems.push({
                label: displayItems[i].name,
                amount: { currency: 'USD', value: displayItems[i].value }
            })
        }
    }

    return details
}

export const getShippingAddressPaymentOptions = () => {
    return {
        requestShipping: true
    }
}

export class ImovePaymentRequest extends PaymentRequest {
    _handleShippingAddressChange(postalAddress: PaymentAddress) {
        this._shippingAddress = postalAddress;

        const event = new PaymentRequestUpdateEvent(
            SHIPPING_ADDRESS_CHANGE_EVENT,
            this
        );
        this._shippingAddressChangesCount++;

        // Eventually calls `PaymentRequestUpdateEvent._handleDetailsUpdate` when
        // after a details are returned
        this._shippingAddressChangeFn(event);
    }
}