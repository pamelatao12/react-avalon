import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../common/firebase';
import "./index.css";

const SignedOutPage = (props) => {
  const [input, setInput] = useState({});
  const firebase = useContext(FirebaseContext);
  const history = useHistory();

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = input;

    try {
      await firebase.doSignInWithEmailAndPassword(email, password);
      localStorage.setItem('logInStatus', true);
      history.push('/play');
    } catch(error) {
      alert(error);
    }
  }

  return (
    <div className="sign-in">
      <form className="form" onSubmit={handleSubmit}>
        <div className="header">Sign In</div>
        <div className="input">
          <label>Email:</label>
          <input className="textbox" type="text" name="email" onChange={handleInputChange} />
        </div>

        <div className="input">
          <label>Password:</label>
          <input className="textbox" type="password" name="password" onChange={handleInputChange} />
        </div>
  
        <input className="button" type="submit" />
      </form>
    </div>
  );
};

export default SignedOutPage;