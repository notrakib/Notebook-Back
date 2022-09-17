import { useRef } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "./firebase_config";
import {
  AutoSigninHandaler,
  ManualSigninHandaler,
  ManualSignupHandaler,
} from "./google-hook";

const App = () => {
  const email = useRef();
  const password = useRef();

  firebase.auth(initializeApp);

  const GoogleAutoSignin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        AutoSigninHandaler({
          idToken: res.credential.idToken,
          profile: res.additionalUserInfo.profile,
        });
      })
      .catch((error) => {
        console.log(error.messgae + "&" + error.code.split("/")[1]);
      });
  };

  const GoogleManualSignup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        email.current.value,
        password.current.value
      )
      .then((res) => {
        ManualSignupHandaler(res.user.multiFactor.user.email);
      })
      .catch((error) => {
        console.log(error.messgae + "&" + error.code.split("/")[1]);
      });
  };

  const GoogleManualSignin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email.current.value, password.current.value)
      .then((res) => {
        ManualSigninHandaler(res.user.multiFactor.user.email);
      })
      .catch((error) => {
        console.log(error.messgae + "&" + error.code.split("/")[1]);
      });
  };

  return (
    <div>
      <input ref={email} placeholder="email"></input>
      <input ref={password} placeholder="password"></input>
      <button onClick={GoogleAutoSignin}>Connect Google</button>
      <button onClick={GoogleManualSignup}>Sign up</button>
      <button onClick={GoogleManualSignin}>Sign in</button>
    </div>
  );
};

export default App;
