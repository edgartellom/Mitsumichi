import ReactDOM from "react-dom";
import Login from "./Login";

const SignIn = ({ onClose }) => {
  return ReactDOM.createPortal(
    <Login onClose={onClose} />,
    document.getElementById("modals")
  );
};

export default SignIn;
