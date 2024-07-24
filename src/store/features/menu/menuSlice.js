import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuData: [
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
          id: 'food-sell',
          title: 'খাবার বিক্রয়',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'chiken-food',
              title: 'মুরগীর খাবার ',
              type: 'item',
              url: '/selling/chicken-selling'
            },
            {
              id: 'fish-food',
              title: 'মাছের খাবার ',
              type: 'item',
              url: '/sell/fish-food'
            },
            {
              id: 'cattle-food',
              title: 'গরুর খাবার ',
              type: 'item',
              url: '/sell/cattle-food'
            },
            {
              id: 'medicine',
              title: 'ঔষধ',
              type: 'item',
              url: '/sell/medicine'
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
