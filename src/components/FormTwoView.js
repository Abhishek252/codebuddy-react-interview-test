import { useState, useContext, forwardRef, useImperativeHandle } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import actionConstants from '../store/actionConstants';
import formContext from '../store/formContextAPI';

import styles from '../styles/form.module.css';
import Constants from './Constants';
import FooterAction from './FooterAction';

const FormTwoView = forwardRef((props, ref) => {
  const { formList, dispatch } = useContext(formContext);

  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const validateFname = () => {
    const { fname } = formList[1]?.data;
    const res = fname?.match(/[a-zA-Z]/g);
    const len = res?.length;
    if (len && len >= 2 && len <= 50) {
      return true;
    }

    return false;
  };

  const validateLname = () => {
    const { lname } = formList[1]?.data;

    const res = lname?.match(/[a-zA-Z]/g);
    const len = res?.length;

    if (lname === '') {
      return true;
    }

    if (len && len >= 2 && len <= 50) {
      return true;
    }

    return false;
  };

  const validateAddress = () => {
    const { address } = formList[1]?.data;
    const res = address?.match(/[a-zA-Z]/g);
    const len = res?.length;
    if (len && len > 9) {
      return true;
    }

    return false;
  };

  const handleFname = e => {
    dispatch({ type: actionConstants.UPDATE_FNAME, fname: e.target.value, id: 2 });
  };

  const handleLname = e => {
    dispatch({ type: actionConstants.UPDATE_LNAME, lname: e.target.value, id: 2 });
  };

  const handleAddress = e => {
    dispatch({ type: actionConstants.UPDATE_ADDRESS, address: e.target.value, id: 2 });
  };

  const handleBack = () => {
    dispatch({ type: 'COMPLETE', id: 2, show: false, next: 1 });
  };

  const onSubmit = type => {
    const { fname, lname, address } = formList[1]?.data;
    if (!validateFname()) {
      setFnameError('first name not valid');
    } else setFnameError('');

    if (!validateLname()) {
      setLnameError('Only allow alphabets and should be greater than 1');
    } else setLnameError('');
    if (!validateAddress()) {
      setAddressError('Reqired minimum length 10');
    } else setAddressError('');

    if (validateFname() && validateLname && validateAddress()) {
      dispatch({
        type: 'COMPLETE',
        id: 2,
        show: false,
        next: type === Constants.SAVE_AND_NEXT ? 3 : 2,
        data: { fname, lname, address },
      });
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      onSubmit,
    }),
    [],
  );

  const { fname, lname, address } = formList[1]?.data;

  return (
    <Container>
      <Form className={styles.form_main}>
        <div className={styles.input_group}>
          <label htmlFor="fname">First name</label>
          <input onChange={handleFname} type="text" value={fname} />
          {fnameError ? <p className={styles.error}>{fnameError}</p> : null}
        </div>
        <div className={styles.input_group}>
          <label htmlFor="lname">Last name</label>
          <input onChange={handleLname} type="text" value={lname} />
          {lnameError ? <p className={styles.error}>{lnameError}</p> : null}
        </div>
        <div className={styles.input_group}>
          <label htmlFor="fname">Address</label>
          <input onChange={handleAddress} type="text" value={address} />
          {addressError ? <p className={styles.error}>{addressError}</p> : null}
        </div>
        <FooterAction handleBack={handleBack} onSubmit={onSubmit} />
        {/* <Button onClick={onSubmit}>Goto Posts</Button> */}
      </Form>
    </Container>
  );
});

export default FormTwoView;
