import { useState } from "react";
import { auth } from "../firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(e) {
    setEmail(e.target.value);
  }
  async function onSubmit(e) {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Email was sent successfully");
    } catch (error) {
      toast.error("Unable to send password reset email");
    }
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <TextField
            id="email"
            label="Email Address"
            variant="outlined"
            value={email}
            onChange={onChange}
            placeholder="Email Address"
            fullWidth
            className="form-input"
          />
          <Link to="/signin" className="forgotPasswordLink">
            Sign in
          </Link>
          <div className="signInBar">
            <div className="signInText" onClick={onSubmit}>
              Send Reset Password
            </div>
            <button className="signInButton">Send</button>
          </div>
        </form>
      </main>
    </div>
  );
}
