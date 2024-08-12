export const getBagToKg = (item) => {
  // Define the stock keys and their corresponding bag sizes
  const stockKeys = [
    { key: 'check_stock_1', bag: 'stock_1', label: 1 },
    { key: 'check_stock_5', bag: 'stock_5', label: 5 },
    { key: 'check_stock_10', bag: 'stock_10', label: 10 },
    { key: 'check_stock_25', bag: 'stock_25', label: 25 },
    { key: 'check_stock_50', bag: 'stock_50', label: 50 }
  ];

  // Calculate total weight in kilograms
  const totalWeight = stockKeys.reduce((total, stock) => {
    const checkStock = item[stock.key] || 0;
    const bagStock = item[stock.bag] || 0;
    if (checkStock > 0 && bagStock > 0) {
      return total + stock.label * bagStock;
    }
    return total;
  }, 0);

  return totalWeight > 0 ? totalWeight : 0;
};

export const getStockTotalAmount = (item) => {
  const stockKeys = [
    { key: 'check_stock_1', bag: 'stock_1', label: 1 },
    { key: 'check_stock_5', bag: 'stock_5', label: 5 },
    { key: 'check_stock_10', bag: 'stock_10', label: 10 },
    { key: 'check_stock_25', bag: 'stock_25', label: 25 },
    { key: 'check_stock_50', bag: 'stock_50', label: 50 }
  ];

  const badges = stockKeys.filter((stock) => item[stock.key] > 0).map((stock) => stock.label * item[stock.bag] * item.stock_price);

  let stockTotalAmount = badges.reduce((total, amount) => total + amount, 0);

  if (typeof stockTotalAmount === 'string') {
    stockTotalAmount = parseFloat(stockTotalAmount);
  }

  if (!isNaN(stockTotalAmount)) {
    stockTotalAmount = stockTotalAmount.toFixed(2);
  } else {
    stockTotalAmount = '0.00'; // Default value if conversion fails
  }

  return stockTotalAmount;
};

export const getSellTotalAmount = (item) => {
  const stockKeys = [
    { key: 'check_stock_1', bag: 'stock_1', label: 1 },
    { key: 'check_stock_5', bag: 'stock_5', label: 5 },
    { key: 'check_stock_10', bag: 'stock_10', label: 10 },
    { key: 'check_stock_25', bag: 'stock_25', label: 25 },
    { key: 'check_stock_50', bag: 'stock_50', label: 50 }
  ];

  const badges = stockKeys.filter((stock) => item[stock.key] > 0).map((stock) => stock.label * item[stock.bag] * item.sell_price);

  // Sum up the values in the badges array
  let totalAmount = badges.reduce((total, amount) => total + amount, 0);

  // Ensure the value is a number and format it to two decimal places
  if (typeof totalAmount === 'string') {
    totalAmount = parseFloat(totalAmount);
  }

  if (!isNaN(totalAmount)) {
    totalAmount = totalAmount.toFixed(2);
  } else {
    totalAmount = '0.00'; // Default value if conversion fails
  }

  return totalAmount;
};
