import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Alert, Button } from 'react-bootstrap';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../store/features/auth/authApi';
import { userLoggedIn } from '../../store/features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';
import { toastAlert } from '../../utils/AppHelpers';

const JWTLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const [loginError, setLoginError] = useState('');

  return (
    <Formik
      initialValues={{
        phone: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        phone: Yup.string().required('Mobile Number is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={(values, { setErrors, setSubmitting }) => {
        setLoginError('');
        const mutationData = {
          phone: String(values.phone),
          password: values.password
        };
        login(mutationData)
          .unwrap()
          .then((payload) => {
            setLoginError(payload.error);
            const { accessToken } = payload || {};
            const decoded = jwtDecode(accessToken);
            const result = {
              accessToken,
              user: {
                dealerId: decoded.dealerId,
                dealerName: decoded.dealerName,
                dealerphone: decoded.dealerphone,
                exp: decoded.exp,
                iat: decoded.iat
              }
            };
            console.log('🚀 ~ .then ~ result:', result);

            if (result) {
              localStorage.setItem('auth', JSON.stringify(result));
              dispatch(userLoggedIn(result));
            }

            if (result.accessToken) {
              navigate('/dashboard');
            } else {
              navigate('/');
            }
            toastAlert('success', payload?.flag == 200 ? 'Success Login' : '');
          })
          .catch((err) => {
            console.log('🚀 ~ JWTLogin ~ err:', err);
            toastAlert('error', err);
          })
          .finally((final) => {
            setSubmitting(false);
          });
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              className="form-control"
              placeholder="Phone Number"
              label="Phone Number"
              name="phone"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.phone}
              autoComplete="off" // Disable autocomplete
            />
            {touched.phone && errors.phone && <small className="text-danger form-text">{errors.phone}</small>}
          </div>
          <div className="form-group mb-2">
            <input
              className="form-control"
              label="Password"
              placeholder="Password"
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              type="password"
              value={values.password}
              autoComplete="off" // Disable autocomplete
            />
            {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
          </div>
          <small className="text-danger form-text text-start d-flex">{loginError}</small>
          <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
            <input type="checkbox" className="custom-control-input mx-2" id="customCheck1" />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember Me
            </label>
          </div>

          {errors.submit && (
            <Col sm={12}>
              <Alert>{errors.submit}</Alert>
            </Col>
          )}

          <Row>
            <Col mt={2}>
              <Button
                // onClick={() => navigate('/dashboard')}
                className="btn-block mb-4"
                color="primary"
                disabled={isLoading}
                size="large"
                type="submit"
                variant="primary"
              >
                {isLoading ? 'Authenticating...' : 'Sign in'}
                {/* {t('login')} */}
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Formik>
  );
};

export default JWTLogin;
