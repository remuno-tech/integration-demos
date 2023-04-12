window.Remuno = {
  Widget: {
    onLoad: function () {
      var callbacks = {
        onTransactionCompleted: (data) =>
          console.log('TXN COMPLETED SUCCESS', data),
        onTransactionExpired: (data) =>
          console.log('TXN COMPLETED FAIL', data),
        onTransactionCreated: (data) =>
          console.log('TXN CREATED SUCCESS', data),
        onTransactionFailed: (data) =>
          console.log('TXN CREATED FAIL', data),
        onQuoteUpdated: (data) => console.log('QUOTE UPDATED', data),
        onTransactionCancelled: (data) =>
          console.log(`TXN CANCELLED`, data),
        onClose: () => console.log('WIDGET CLOSED'),
        onOpen: () => console.log('WIDGET OPENED'),
      };

      window.Remuno.Widget.init({
        selector: '#widget-preview',
        callbacks,
      });
    },
  },
};