import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import "./App.css";
import app from "./Firebase/firebase.init";
const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const [gitUser, setGitUser] = useState({});

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handkeGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => console.log(error));
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };
  const handleGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setGitUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="App">
      {user.email ? (
        <button onClick={handleSignOut}>Google Sign Out</button>
      ) : (
        <div>
          <button onClick={handkeGoogle}>Google Sign in</button>
          <button onClick={handleGithub}>Github Sign in</button>
        </div>
      )}
      {user.uid && (
        <div>
          <h1>User name: {user.displayName}</h1>
        </div>
      )}
      <img src={gitUser.photoURL} alt="" />
    </div>
  );
}

export default App;
