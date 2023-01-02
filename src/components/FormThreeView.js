import { useState, useContext, useImperativeHandle, forwardRef } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import actionConstants from '../store/actionConstants';
import formContext from '../store/formContextAPI';
import styles from '../styles/form.module.css';
import Constants from './Constants';
import FooterAction from './FooterAction';

const FormThreeView = forwardRef((props, ref) => {
  const { formList, dispatch } = useContext(formContext);

  const [countryCodeError, setCountryCodeError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [tcError, setTcError] = useState(false);
  const navigate = useNavigate();

  const validateMobileNumber = () => {
    const { phoneNumber } = formList[2]?.data;
    const res = phoneNumber?.match(/\d/g);
    if (res?.length > 0) {
      if (parseInt(res[0], 10) !== 0 && res.length === 10) {
        return true;
      }

      return false;
    }

    return false;
  };

  const handleCountryCode = e => {
    dispatch({ type: actionConstants.UPDATE_COUNTRY_CODE, countryCode: e.target.value, id: 3 });
  };

  const handlePhoneNumber = e => {
    dispatch({ type: actionConstants.UPDATE_PHONE_NUMBER, phoneNumber: e.target.value, id: 3 });
  };

  const handleTc = e => {
    dispatch({ type: actionConstants.UPDATE_TC, tc: e.target.checked, id: 3 });
  };

  const handleBack = () => {
    dispatch({ type: 'COMPLETE', id: 2, show: false, next: 2 });
  };

  const onSubmitSuccess = () => {
    console.log('successfully submitted');
  };

  const onSubmitFailure = err => {
    console.log('Error occured => ', err);
  };

  const xhrSubmitRequest = async () => {
    const url = `${process.env.REACT_APP_API_URL}/submit`;

    fetch(url)
      .then(res => res.json())
      .then(data => onSubmitSuccess(data))
      .catch(err => onSubmitFailure(err));
  };

  const onSubmit = type => {
    const { countryCode, tc, phoneNumber } = formList[2]?.data;

    if (!validateMobileNumber()) {
      setPhoneNumberError('Phone Number not correct');
    } else {
      setPhoneNumberError('');
    }

    if (!tc) {
      setTcError('Required');
    } else setTcError('');
    if (!countryCode) {
      setCountryCodeError('Required');
    } else setCountryCodeError('');

    if (validateMobileNumber() && tc && countryCode) {
      if (type === Constants.SAVE_AND_NEXT_NEXT) {
        dispatch({
          type: 'COMPLETE',
          id: 3,
          show: false,
          next: 1,
          data: { phoneNumber, countryCode, tc },
        });
      } else {
        dispatch({
          type: 'COMPLETE',
          id: 3,
          show: false,
          next: 3,
          data: { phoneNumber, countryCode, tc },
        });
      }

      xhrSubmitRequest();
      if (type === Constants.SAVE_AND_NEXT) navigate('/posts');
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      handleBack,
      onSubmit,
    }),
    [],
  );

  const { countryCode, tc, phoneNumber } = formList[2]?.data;

  return (
    <Container>
      <Form className={styles.form_main}>
        <div className={styles.input_group}>
          <label htmlFor="country code">Country Code</label>
          <select onChange={handleCountryCode} value={countryCode}>
            <option value="">Select</option>
            <option value="india">India(+91)</option>
            <option value="america">America(+1)</option>
          </select>
          {countryCodeError ? <p className={styles.error}>{countryCodeError}</p> : null}
        </div>
        <div className={styles.input_group}>
          <label htmlFor="phome number">Phone Number</label>
          <input onChange={handlePhoneNumber} maxLength="10" type="text" value={phoneNumber} />
          {phoneNumberError ? <p className={styles.error}>{phoneNumberError}</p> : null}
        </div>
        <div className={styles.input_group}>
          <label htmlFor="fname" className={styles.label_wrapper}>
            <input onChange={handleTc} type="checkbox" checked={tc} />
            Address
          </label>
          {tcError ? <p className={styles.error}>{tcError}</p> : null}
        </div>
        <FooterAction saveAndNetBtnLabel="Save All" handleBack={handleBack} onSubmit={onSubmit} />

        {/* <Button onClick={onSubmit}>Goto Posts</Button> */}
      </Form>
    </Container>
  );
});

export default FormThreeView;
