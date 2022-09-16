import { useRef } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "./firebase_config";
import jwt_decode from "jwt-decode";

const App = () => {
  const email = useRef();
  const password = useRef();

  firebase.auth(initializeApp);

  const VerifyTokenHandaler = () => {
    // const user = jwt_decode(user.idToken);
    // console.log(user);
  };

  const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const user = {
          idToken: res.credential.idToken,
          profile: res.additionalUserInfo.profile,
        };
        BackendHandaler(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SignupHandaler = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        email.current.value,
        password.current.value
      )
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SigninHandaler = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email.current.value, password.current.value)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const UserDataHandaler = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
      } else {
      }
    });
  };

  const SignoutHandaler = () => {
    firebase
      .auth()
      .signOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const BackendHandaler = (user) => {
    fetch("http://localhost:8080/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        return res.json();
      })
      .then((payload) => {
        console.log(payload);
      })
      .catch();
  };

  return (
    <div>
      <input ref={email} placeholder="email"></input>
      <input ref={password} placeholder="password"></input>
      <button onClick={handleGoogleSignIn}>Connect Google</button>
      <button onClick={SignupHandaler}>Sign up</button>
      <button onClick={SigninHandaler}>Sign in</button>
      <button onClick={UserDataHandaler}>Data</button>
      <button onClick={SignoutHandaler}>Sign out</button>
      <button onClick={VerifyTokenHandaler}>Verify</button>
      <button onClick={BackendHandaler}>Back</button>
    </div>
  );
};

export default App;
