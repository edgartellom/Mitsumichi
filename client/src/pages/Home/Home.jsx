import Button from "../../components/UI/Button";
import logOut from "../../functions/logOut";
import SignIn from "../SignIn/SignIn";
import { useContext, useEffect } from "react";
import { userAuth } from "../../context/Auth-context";
import Wrapper from "../../helper/Wrapper";
import SignUp from "../SignUp/SignUp";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Home = () => {
  const { currentUser, isRegistered, loading, setLoading } =
    useContext(userAuth);

  const loggedIn = currentUser !== null && !isRegistered;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  if (loading) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  }

  if (loggedIn) {
    return (
      <Wrapper>
        <SignUp />
      </Wrapper>
    );
  }

  return (
    <div>
      {!currentUser && <SignIn />}
      Home <Button text="Salir" onClick={logOut} />
    </div>
  );
};

export default Home;
