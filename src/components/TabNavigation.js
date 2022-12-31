import styles from '../styles/tabNavigation.module.css';

function TabNavigation({ handleStepOne, handleStepTwo, handleStepThree }) {
  return (
    <div className={styles.steps_wrapper}>
      <button onClick={handleStepOne} type="button">
        Step 1
      </button>
      <button onClick={handleStepTwo} type="button">
        Step 2
      </button>
      <button onClick={handleStepThree} type="button">
        Step 3
      </button>
    </div>
  );
}

export default TabNavigation;
