import React from "react";
import withFirebaseAuth, { WrappedComponentProps } from "react-with-firebase-auth";
import { Firebase } from "../../modules/Firebase";
import style from "./login.module.scss";
import GoogleButton from "react-google-button";

const firebase = new Firebase();

// Use it as a HOC to protect the whole application
export const Login : React.FC<WrappedComponentProps> = ({user, signOut, signInWithGoogle, error, children}) => {
    if(user) {
        return <React.Fragment>{children}</React.Fragment>;
    }
    return (
        <div className={style.login}>
            <div className={style.content}>
                { 
                    user
                    ? <GoogleButton label="Log out" onClick={signOut} />
                    : <GoogleButton onClick={signInWithGoogle} />
                }
                {
                    error && <div className={style.error}>{error}</div>
                }
            </div>
        </div>
    );
}

export default withFirebaseAuth({
    providers: firebase.getAuthProviders(),
    firebaseAppAuth: firebase.getAuth(),
})(Login);