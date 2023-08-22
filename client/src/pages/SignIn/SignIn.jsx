import ReactDOM from "react-dom";
import Login from "./Login";

const SignIn = () => {
  return ReactDOM.createPortal(<Login />, document.getElementById("modals"));
};

export default SignIn;
