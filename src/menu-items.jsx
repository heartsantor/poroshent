const menuItemsBn = [
  {
    id: 'sell',
    // title: 'ন্যাভিগেশন',
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
        title: 'বিল ইনভয়েস',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'make-invoice',
            title: 'ইনভয়েস তৈরী',
            type: 'item',
            url: '/invoice/make-invoice'
          },
          {
            id: 'invoice-list',
            title: 'ইনভয়েস লিস্ট',
            type: 'item',
            url: '/invoice/invoice-list'
          },
          {
            id: 'draft-invoice',
            title: 'ড্রাফট ইনভয়েস',
            type: 'item',
            url: '/invoice/draft-invoice'
          },
          {
            id: 'draft-invoice-list',
            title: 'ড্রাফট ইনভয়েস লিস্ট',
            type: 'item',
            url: '/invoice/draft-invoice-list'
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
            title: 'বাকীর রিপোর্ট',
            type: 'item',
            url: '/all-report/due-report'
          },
          {
            id: 'sales-report',
            title: 'বিক্রয় রিপোর্ট',
            type: 'item',
            url: '/all-report/sales-report'
          },
          {
            id: 'customer-report',
            title: 'কাস্টমার রিপোর্ট',
            type: 'item',
            url: '/all-report/customer-report'
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
            title: 'কাস্টমার এলাকা',
            type: 'item',
            url: '/customer/customer-area'
          }
        ]
      },
      {
        id: 'sms',
        title: 'এসএমএস',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'sms-dashboard',
            title: 'ড্যাশবোর্ড',
            type: 'item',
            url: '/sms/sms-dashboard'
          },
          {
            id: 'customer-sms',
            title: 'কাস্টমার অনুসারে',
            type: 'item',
            url: '/sms/customer-sms'
          },
          {
            id: 'due-sms',
            title: 'বাকী অনুসারে',
            type: 'item',
            url: '/sms/due-sms'
          },
          {
            id: 'sms-history',
            title: 'এসএমএস হিস্টোরি',
            type: 'item',
            url: '/sms/sms-history'
          }
        ]
      }
    ]
  }
];

const menuItemsEn = [
  {
    id: 'sell',
    // title: 'navvv',
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
          },
          {
            id: 'draft-invoice',
            title: 'Draft Invoice',
            type: 'item',
            url: '/invoice/draft-invoice'
          },
          {
            id: 'draft-invoice-list',
            title: 'Draft Invoice List',
            type: 'item',
            url: '/invoice/draft-invoice-list'
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
            id: 'sales-report',
            title: 'Sales Report',
            type: 'item',
            url: '/all-report/sales-report'
          },
          {
            id: 'customer-report',
            title: 'Customer Report',
            type: 'item',
            url: '/all-report/customer-report'
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
      },
      {
        id: 'sms',
        title: 'SMS',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'sms-dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/sms/sms-dashboard'
          },
          {
            id: 'customer-sms',
            title: 'According Customer',
            type: 'item',
            url: '/sms/customer-sms'
          },
          {
            id: 'due-sms',
            title: 'According Due',
            type: 'item',
            url: '/sms/due-sms'
          },
          {
            id: 'sms-history',
            title: 'SMS History',
            type: 'item',
            url: '/sms/sms-history'
          }
        ]
      }
    ]
  }
];

export { menuItemsEn, menuItemsBn };
