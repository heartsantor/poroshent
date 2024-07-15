export const getItemName = (item) => {
  switch (item) {
    case 1:
      return 'মুরগীর খাবার';
    case 2:
      return 'মাছের খাবার';
    case 3:
      return 'গরুর খাবার';
    case 4:
      return 'ঔষধ';
    default:
      return '';
  }
};
