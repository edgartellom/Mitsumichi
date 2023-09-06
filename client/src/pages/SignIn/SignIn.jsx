import ReactDOM from "react-dom";
import Login from "./Login";

const SignIn = ({ setShowLogin }) => {
  return ReactDOM.createPortal(
    <Login setShowLogin={setShowLogin} />,
    document.getElementById("modals")
  );
};

export default SignIn;
