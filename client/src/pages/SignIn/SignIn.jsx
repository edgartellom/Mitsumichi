import { useContext } from "react";
import Login from "./Login";
import { userAuth } from "../../context/Auth-context";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ReactDOM from "react-dom";
import Wrapper from "../../helper/Wrapper";

const SignIn = () => {
  const { loading } = useContext(userAuth);

  if (loading)
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );

  return ReactDOM.createPortal(<Login />, document.getElementById("modals"));
};

export default SignIn;
