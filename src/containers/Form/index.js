/* eslint-disable import/no-unresolved */
/* eslint-disable react/button-has-type */
import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);

  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      // const data = new FormData(evt.target);
      // console.log(Object.fromEntries(data));

      setSending(true);
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setSending(false);
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" name="Nom" />

          <Field placeholder="" label="Prénom" name="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />

          <Field
            placeholder=""
            label="Email"
            name="Email"
            type={FIELD_TYPES.InputEmail}
          />
          <Button
            type={BUTTON_TYPES.SUBMIT}
            disabled={sending}
            onClick={onSuccess}
          >
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            name="msg"
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => !null,
};

export default Form;