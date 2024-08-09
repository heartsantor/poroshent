export const getPaymentType = (paymentType) => {
  switch (paymentType) {
    case 1:
      return 'Cash';
    case 2:
      return 'Bkash';
    case 3:
      return 'Nagad';
    case 4:
      return 'Rocket';
    case 5:
      return 'Bank';
    case 6:
      return 'Check';
    default:
      return 'Invalid payment type';
  }
};
