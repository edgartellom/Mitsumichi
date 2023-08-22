import Button from "../../components/UI/Button";
import logOut from "../../firebase/logOut";
import SignIn from "../SignIn/SignIn";
import { useContext } from "react";
import { userAuth } from "../../context/Auth-context";
import Wrapper from "../../helper/Wrapper";
import SignUp from "../SignUp/SignUp";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Home = () => {
  const { currentUser, isRegistered, loading } = useContext(userAuth);

  const loggedIn = currentUser !== null && !isRegistered;

  if (loading) {
    return (
      <Wrapper>
        <LoadingSpinner />
      </Wrapper>
    );
  }

  // if (loggedIn) {
  //   return (
  //     <Wrapper>
  //       <SignUp />
  //     </Wrapper>
  //   );
  // }

  return (
    <div>
      {!currentUser ? <SignIn /> : !isRegistered && <SignUp />}
      Home <Button text="Salir" onClick={logOut} />
    </div>
  );
};

export default Home;
