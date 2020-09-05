import React from 'react'
import { Button } from "@material-ui/core"
import './login.css';
import { auth, provider } from "./firebase";
import { useStateValue } from './StateProvider';
import {actionTypes} from './reducer';

function Login() {
    const [{}, dispatch] = useStateValue();
    const signIn=() => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                console.log(result)
                dispatch({
                    type:actionTypes.SET_USER,
                    user:result.user,
                })
            })
            .catch((error)=>alert(error.message));
    }
    return (
      <div className="login">
        <div className="login__container">
          <img
            src="https://image.flaticon.com/icons/svg/3050/3050502.svg"
            alt="logo"
          />
          <div className="login__text">
            <h1>Sign in to Chat</h1>
          </div>
          <Button onClick={signIn} type="submit">
            Sign In with Google
          </Button>
        </div>
      </div>
    );
}

export default Login
