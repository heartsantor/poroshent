import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuData: [
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
            },
            {
              id: 'draft-invoice',
              title: 'Draft Invoice',
              type: 'item',
              url: '/invoice/draft-invoice'
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
  ]
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuData: (state, action) => {
      state.menuData = action.payload.menuData;
    }
  }
});

export const { setMenuData } = menuSlice.actions;
export default menuSlice.reducer;
