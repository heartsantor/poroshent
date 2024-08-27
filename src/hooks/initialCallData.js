import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../store/features/credentials/credentialsSlice';
import { useAllCredentialsMutation } from '../store/features/credentials/credentialsApi';
import { size } from 'lodash';

const initialCallData = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [allCredentials] = useAllCredentialsMutation();

  const fetchData = async () => {
    const data = {
      accessToken
    };
    try {
      const res = await allCredentials(data).unwrap();
      if (size(res)) {
        dispatch(setCredentials({ credentialData: res.data }));
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
};

export default initialCallData;
