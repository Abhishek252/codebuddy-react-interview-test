import { useReducer, useRef } from 'react';
import FormOneView from './FormOneView';
import FormTwoView from './FormTwoView';
import FormThreeView from './FormThreeView';
import reducer from '../store/store';
import styles from '../styles/form.module.css';
import formContext from '../store/formContextAPI';
import TabNavigation from './TabNavigation';
import Constants from './Constants';

function FormWrapper() {
  const formOneRef = useRef(null);
  const formTwoRef = useRef(null);
  const formThreeRef = useRef(null);

  const forms = [
    { id: 1, show: true, complete: false, isBackDisabled: true, saveNext: true, data: {} },
    { id: 2, show: false, complete: false, isBackDisabled: false, saveNext: true, data: {} },
    { id: 3, show: false, complete: false, isBackDisabled: false, saveNext: true, data: {} },
  ];

  const [formList, dispatch] = useReducer(reducer, forms);

  const handleStepOne = () => {
    if (formTwoRef.current) formTwoRef.current.onSubmit(Constants.SAVE_AND_NEXT);
    else if (formThreeRef.current) formThreeRef.current.onSubmit(Constants.SAVE_AND_NEXT_NEXT);
  };

  const handleStepTwo = () => {
    if (formOneRef.current) formOneRef.current.onSubmit(Constants.SAVE_AND_NEXT);
    else if (formThreeRef.current) formThreeRef.current.handleBack();
  };

  const handleStepThree = () => {
    if (formTwoRef.current) formTwoRef.current.onSubmit(Constants.SAVE_AND_NEXT);
    else if (formOneRef.current) formOneRef.current.onSubmit(Constants.SAVE_AND_NEXT_NEXT);
  };

  return (
    <formContext.Provider value={{ dispatch, formList }}>
      <div className={styles.form_main_wrapper}>
        <TabNavigation
          handleStepOne={handleStepOne}
          handleStepTwo={handleStepTwo}
          handleStepThree={handleStepThree}
        />

        {formList.map(form => {
          if (form.show === true) {
            switch (form.id) {
              case 1:
                return <FormOneView ref={formOneRef} key={`form_${form.id}`} />;
              case 2:
                return <FormTwoView ref={formTwoRef} key={`form_${form.id}`} />;
              default:
                return <FormThreeView ref={formThreeRef} key={`form_${form.id}`} />;
            }
          } else return null;
        })}
      </div>
    </formContext.Provider>
  );
}

export default FormWrapper;
