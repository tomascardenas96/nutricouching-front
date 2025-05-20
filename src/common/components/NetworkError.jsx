import "./NetworkError.css";
import { TbNetworkOff } from "react-icons/tb";

function NetworkError({ message }) {
  return (
    <div className="network-error">
      <TbNetworkOff className="network-icon" />
      <p>{message}</p>
    </div>
  );
}

export default NetworkError;
