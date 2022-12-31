import styles from '../styles/form.module.css';
import Constants from './Constants';

function FooterAction({
  handleBack,
  onSubmit,
  disabled,
  saveAndNetBtnLabel = Constants.FOOTER_BTN_LABEL.SAVE_AND_NEXT_BTN_LABEL,
  backBtnLabel = Constants.FOOTER_BTN_LABEL.BACK_BTN_LABEL,
  SaveBtnLabel = Constants.FOOTER_BTN_LABEL.SAVE_BTN_LABEL,
}) {
  return (
    <div className={styles.actions}>
      <button disabled={disabled} type="button" onClick={handleBack}>
        {backBtnLabel}
      </button>
      <button type="button" onClick={() => onSubmit(Constants.SAVE_BTN)}>
        {SaveBtnLabel}
      </button>
      <button onClick={() => onSubmit(Constants.SAVE_AND_NEXT)} type="button">
        {saveAndNetBtnLabel}
      </button>
    </div>
  );
}

export default FooterAction;
