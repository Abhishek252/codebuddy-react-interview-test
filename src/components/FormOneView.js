import { forwardRef, useContext, useImperativeHandle, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import actionConstants from '../store/actionConstants';
import formContext from '../store/formContextAPI';
import styles from '../styles/form.module.css';
import Constants from './Constants';
import FooterAction from './FooterAction';

const FormOneView = forwardRef((props, ref) => {
  const { formList, dispatch } = useContext(formContext);
  const { isBackDisabled } = formList[0];
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const specialCharacterPattern = /[$&+,:;=?@#|'<>.^*()%!-]/g;
  const numberPattern = /[0-9]/g;
  const upperCasePattern = /[A-Z]/g;
  const lowerCasePattern = /[a-z]/g;

  const validateEmail = () => {
    const { email } = formList[0]?.data;
    const pattern = /^\S+@\S+\.\S+$/;
    return pattern.test(email);
  };

  const validatePassword = () => {
    const { password } = formList[0]?.data;

    const pwdRule = {
      capital: false,
      small: false,
      special: false,
      number: false,
    };
    if (password && password.match(specialCharacterPattern)?.length > 1) pwdRule.special = true;
    if (password && password.match(numberPattern)?.length > 1) pwdRule.number = true;
    if (password && password.match(upperCasePattern)?.length > 1) pwdRule.capital = true;
    if (password && password.match(lowerCasePattern)?.length > 1) pwdRule.small = true;
    const res = Object.values(pwdRule).every(item => item === true);
    if (res) {
      return res;
    }

    return false;
  };

  const onSubmit = type => {
    // navigate('/posts')

    const { email, password } = formList[0]?.data;

    if (!validateEmail()) {
      setEmailError('Enter valid email');
    } else setEmailError(false);
    if (!validatePassword()) {
      setPasswordError('Enter valid password');
    } else setPasswordError(false);

    if (validateEmail() && validatePassword()) {
      if (type === Constants.SAVE_AND_NEXT_NEXT) {
        dispatch({
          type: 'COMPLETE',
          id: 1,
          show: false,
          next: 3,
          data: { email, password },
        });
      } else {
        dispatch({
          type: 'COMPLETE',
          id: 1,
          show: false,
          next: type === Constants.SAVE_AND_NEXT ? 2 : 1,
          data: { email, password },
        });
      }
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      onSubmit,
    }),
    [],
  );

  const handleEmail = e => {
    dispatch({ type: actionConstants.UPDATE_EMAIL, email: e.target.value, id: 1 });
  };

  const handlePassword = e => {
    dispatch({ type: actionConstants.UPDATE_PASSWORD, password: e.target.value, id: 1 });
  };

  const { email, password } = formList[0]?.data;

  return (
    <Container>
      <Form className={styles.form_main}>
        <div className={styles.input_group}>
          <label htmlFor="email">Email</label>
          <input onChange={handleEmail} type="email" value={email} />
          {emailError ? <p className={styles.error}>{emailError}</p> : null}
        </div>
        <div className={styles.input_group}>
          <label htmlFor="password">Password</label>
          <input onChange={handlePassword} type="password" value={password} />
          {passwordError ? <p className={styles.error}>{passwordError}</p> : null}
        </div>
        <FooterAction disabled={isBackDisabled} onSubmit={onSubmit} />
        {/* <Button onClick={onSubmit}>Goto Posts</Button> */}
      </Form>
    </Container>
  );
});

export default FormOneView;
