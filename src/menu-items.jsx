const menuItemsBn = [
  {
    id: 'sell',
    title: 'ন্যাভিগেশন',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'ড্যাশবোর্ড',
        type: 'item',
        icon: 'feather icon-home',
        url: '/dashboard'
      },
      {
        id: 'invoice',
        title: 'Bill Invoice',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'make-invoice',
            title: 'New Invoice',
            type: 'item',
            url: '/invoice/make-invoice'
          },
          {
            id: 'invoice-list',
            title: 'Invoice List',
            type: 'item',
            url: '/invoice/invoice-list'
          }
        ]
      },
      {
        id: 'chalan-entry',
        title: 'চালান এন্ট্রি ',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'product-name-entry',
            title: 'প্রোডাক্টের নাম এন্ট্রি',
            type: 'item',
            url: '/chalan/product-name-entry'
          },
          {
            id: 'product-stock-entry',
            title: 'স্টক এন্ট্রি',
            type: 'item',
            url: '/chalan/product-stock-entry'
          }
        ]
      },
      {
        id: 'all-report',
        title: 'সকল রিপোর্ট',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'due-report',
            title: 'বাকির রিপোর্ট',
            type: 'item',
            url: '/all-report/due-report'
          },
          {
            id: 'customer-statement',
            title: 'কাস্টমার স্টেটমেন্ট',
            type: 'item',
            url: '/all-report/customer-statement'
          }
        ]
      },
      {
        id: 'customers',
        title: 'কাস্টমার',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'customer-add',
            title: 'কাস্টমার তৈরি',
            type: 'item',
            url: '/customer/customer-add'
          },
          {
            id: 'customer-area',
            title: 'কাস্টমার area',
            type: 'item',
            url: '/customer/customer-area'
          }
        ]
      }
    ]
  }
];

const menuItemsEn = [
  {
    id: 'sell',
    title: 'navvv',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'feather icon-home',
        url: '/dashboard'
      },
      {
        id: 'invoice',
        title: 'Bill Invoice',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'make-invoice',
            title: 'New Invoice',
            type: 'item',
            url: '/invoice/make-invoice'
          },
          {
            id: 'invoice-list',
            title: 'Invoice List',
            type: 'item',
            url: '/invoice/invoice-list'
          }
        ]
      },
      {
        id: 'chalan-entry',
        title: 'Chalan Entry',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'product-name-entry',
            title: 'Product Name Entry',
            type: 'item',
            url: '/chalan/product-name-entry'
          },
          {
            id: 'product-stock-entry',
            title: 'Stock Entry',
            type: 'item',
            url: '/chalan/product-stock-entry'
          }
        ]
      },
      {
        id: 'all-report',
        title: 'All Reports',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'due-report',
            title: 'Due Report',
            type: 'item',
            url: '/all-report/due-report'
          },
          {
            id: 'customer-statement',
            title: 'Customer Statement',
            type: 'item',
            url: '/all-report/customer-statement'
          }
        ]
      },
      {
        id: 'customers',
        title: 'Customers',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'customer-add',
            title: 'Add Customer',
            type: 'item',
            url: '/customer/customer-add'
          },
          {
            id: 'customer-area',
            title: 'Customer Area',
            type: 'item',
            url: '/customer/customer-area'
          }
        ]
      }
    ]
  }
];

export { menuItemsEn, menuItemsBn };
