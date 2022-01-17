import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import TextField from "@mui/material/TextField";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  function onChange(e) {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredentials.user) {
        // navigate to home
        navigate("/profile", { replace: true });
      }
    } catch (error) {
      toast.error("Bad user credentials");
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back 🚀</p>
        </header>
        <main>
          <form className="form" onSubmit={onSubmit}>
            <TextField
              id="email"
              label="Email Address"
              value={email}
              onChange={onChange}
              variant="outlined"
              placeholder="Email Address"
              fullWidth
              className="form-input"
            />
            <TextField
              id="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              value={password}
              onChange={onChange}
              variant="outlined"
              placeholder="Password"
              fullWidth
              className="form-input"
            />
            <span
              className="form-span"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </span>
            <Link to="/forgot-password" className="forgotPasswordLink">
              Forgot Password
            </Link>
            <div className="signInBar">
              <p className="signInText">Sign in</p>
              <button className="signInButton">
                <ArrowRightIcon width="26px" height="26px" fill="#fff" />
              </button>
            </div>
          </form>
          <OAuth />
          <Link className="registerLink" to="/signup">
            Don't have an account? Sign up
          </Link>
        </main>
      </div>
    </>
  );
}
