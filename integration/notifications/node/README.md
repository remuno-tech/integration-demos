# Node JS Payment Notification Validation Demo

The demo uses Express to setup a lightweight web server which is capable of validating incoming Remuno payment notifications against the path `/notification-test`. The validation is limited to ensuring that the header checksum is correct and therefore the notification was received from the Remuno services.

Steps to running the demo:

1. Obtain your notification key from the merchant dashboard [Integration / Api](https://remuno.com/merchant/1/api-keys) page and update the value of the `notificationKey` variable with this.
2. Host the demo in a publically available domain.
3. Test notification receipt by creating a transaction with the `notificationUrl` property supplied. For this demo, the URL will be in the format: `http://yourdomain.com/notification-test`. `yourdomain.com` is the domain name where you hosted the demo. Visit the [Integration / Payment widget](https://remuno.com/merchant/1/payment-widget) page to create a transaction. 
4. The transaction will be a live transaction, and to test notifications, you can either let it expire, or you can transfer crypto to the wallet address provided in the payment widget. See the [documentation](https://docs.remuno.com/#transaction-notifications) for more details.
