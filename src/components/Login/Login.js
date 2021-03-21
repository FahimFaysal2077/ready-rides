
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSingIn, handleGoogleSingIn, handleSingOut, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';
import './Login.css';
import { Button, Form, FormGroup, Lebel, Input, Label } from 'reactstrap';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { Link } from 'react-router-dom';


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSingIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const fbSingIn = () => {
    handleFbSingIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const singOut = () => {
    handleSingOut()
      .then(res => {
        handleResponse(res, false);
      })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if(redirect){
      history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    // console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name ,user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })

    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }
    e.preventDefault();
  }



  return (
    <div style={{ textAlign: 'center' }}>
      
      
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
        <div className="sing-up">
            
            <Form className="login-form" onSubmit={handleSubmit}>
                <h1>
                  <span className="font-weight-bold text-center">{newUser ? 'Create an account' : 'Login'}</span>
                </h1>
                {newUser && <> 
                <FormGroup>
                  <Label>Name</Label>
                  <br/>
                  <input type="text" name="name" onBlur={handleBlur} placeholder="Your Name" required />
                </FormGroup>
                <FormGroup>
                  <Label>Username or Email</Label>
                  <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required />
                </FormGroup>
                <FormGroup>
                  <Label>Confirm Password</Label>
                  <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
                </FormGroup>
                </>
                }
                <FormGroup>
                <Label>Email</Label>
                <br/>
                <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email" required />
                </FormGroup>
                <FormGroup>
                <Label>Password</Label>
                <br/>
                <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
                </FormGroup>
                
                <br />
                <button type="submit"  className="btn-lg btn-dark btn-block">{newUser ? 'Sing up' : 'Sing In'}</button>
                <div className="d-flex">
                  <p>{newUser ? `Already have an account?` : `Don't have an account?`}</p> 
                  <Link onClick={() => setNewUser(!newUser)} htmlFor="newUser">{newUser ? 'Login' : 'Create an account'}</Link>
                </div>
                
                <div className="text-center pt-3">
                  Or continue with your social account
                </div>
                  {
                      user.isSignedIn ? <GoogleLoginButton onClick={singOut} className="mt-4 mb-2" /> :
                      <GoogleLoginButton onClick={googleSignIn} className="mt-4 mb-2" />
                  }
                <FacebookLoginButton onClick={fbSingIn} className="mt-4 mb-2" />
                <br/>
                  <p style={{ color: 'red' }}>{user.error}</p>
                  {
                      user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged IN'} Successfully</p>
                  }
            </Form>
            
        </div>
      
    </div>
  );
}

export default Login;
