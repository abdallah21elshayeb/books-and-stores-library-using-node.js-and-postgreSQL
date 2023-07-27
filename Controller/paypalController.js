const { error } = require('winston');
let paypalService = require('../services/paypalService');

exports.createPayment = (req, res) => {
  let payment = {
    intent: 'authorize',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://127.0.0.1:4000/success',
      cancel_url: 'http://127.0.0.1:4000/err',
    },
    transactions: [
      {
        amount: {
          total: 39.0,
          currency: 'USD',
        },
        description: ' a book on mean stack ',
      },
    ],
  };

  paypalService
    .createPaypalPayment(payment)
    .then((transaction) => {
      console.log('Create Payment Response');
      console.log('Transaction : ' + JSON.stringify(transaction));
      let transactionId = transaction.id;
      console.log('id : ' + transactionId);
      // NEED TO LOG ALL TRANSACTION FOR EACH REQUEST AND RESPONSE FOR AUDITING
      // generate transaction reference number tx_randomNumber
      // transaction status [Success , failed , cancelled , pending]
      res.redirect('/success');
    })
    .catch((err) => {
      console.log(err);
      res.redirect('/err');
      throw error;
    });
};
