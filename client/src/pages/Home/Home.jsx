import Button from "../../components/UI/Button";
import logOut from "../../firebase/logOut";
import SignIn from "../SignIn/SignIn";
import { useContext } from "react";
import { userAuth } from "../../context/Auth-context";
import Wrapper from "../../helper/Wrapper";
import SignUp from "../SignUp/SignUp";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { currentUser, isRegistered, loading } = useContext(userAuth);
  const navigate = useNavigate();

  if (loading) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  }

  const logOutHandler = () => {
    logOut();
    navigate("/");
  };

  return (
    <div>
      {!currentUser ? <SignIn /> : !isRegistered && <SignUp />}
      Home <Button text="Salir" onClick={logOutHandler} />
    </div>
  );
};

export default Home;
