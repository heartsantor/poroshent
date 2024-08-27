import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  credentialData: {
    sms_local_url: '',
    sms_public_url: '',
    sms_cloud_url: '',
    sms_local_username: '',
    sms_local_password: '',
    sms_cloud_username: '',
    sms_cloud_password: '',
    simNumber: 1,
    gp_cookie: '',
    gp_next_dataId: '',
    gp_API: '',
    teletalk_cookie: '',
    teletalk_API: '',
    banglalink_cookie: '',
    banglalink_API: '',
    sms_server_active: '',
    sms_operator_active: ''
  }
};

const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.credentialData = action.payload.credentialData;
    },
    setServerActive: (state, action) => {
      state.credentialData.sms_server_active = action.payload;
    },
    setOperatorActive: (state, action) => {
      state.credentialData.sms_operator_active = action.payload;
    }
  }
});

export const { setCredentials, setServerActive, setOperatorActive } = credentialsSlice.actions;
export default credentialsSlice.reducer;
