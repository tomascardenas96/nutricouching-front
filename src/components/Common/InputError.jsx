import { MdError } from "react-icons/md";
import "./InputError.css";

function InputError({ message }) {
  return (
    <div className="input-error">
      <MdError className="icon"/>

      <div className="message">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default InputError;
