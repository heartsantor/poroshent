import React, { createContext, useState, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetProductMutation } from '../store/features/product/productApi';

const ProductContext = createContext();

export const useProductContext = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const { accessToken } = useSelector((state) => state.auth);
  const [getProduct, { isLoading, isError }] = useGetProductMutation();
  const [products, setProducts] = useState([]);
  const [activeKey, setActiveKey] = useState('1');

  const fetchProductData = async (type) => {
    const data = {
      accessToken: accessToken,
      type: type
    };
    try {
      const res = await getProduct(data).unwrap();
      if (res.product) {
        setProducts(res.product);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchProductData(activeKey);
  }, [activeKey]);

  return (
    <ProductContext.Provider value={{ products, activeKey, setActiveKey, fetchProductData, isLoading, isError }}>
      {children}
    </ProductContext.Provider>
  );
};
