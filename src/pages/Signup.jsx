import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import TextField from "@mui/material/TextField";
import OAuth from "../components/OAuth";

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  function onChange(e) {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // current user
      const user = userCredentials.user;

      // update auth user with name entered in form
      updateProfile(auth.currentUser, {
        displayName: name,
      });

      // add user to storage
      const formDataCopy = { ...formData };
      delete formDataCopy.password;
      formDataCopy.timeStamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy); // setDoc(doc(database, 'data base name', 'unique id'), data)

      // navigate to home
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Oops! Something went wrong.");
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Create Account</p>
        </header>
        <main>
          <form className="form" onSubmit={onSubmit}>
            <TextField
              id="name"
              label="Name"
              value={name}
              onChange={onChange}
              variant="outlined"
              placeholder="Name"
              fullWidth
              className="form-input"
            />
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
              <p className="signInText">Sign up</p>
              <button className="signInButton">
                <ArrowRightIcon width="26px" height="26px" fill="#fff" />
              </button>
            </div>
          </form>
          <Link className="registerLink" to="/signin">
            Already have an account? Sign in
          </Link>
          <OAuth />
        </main>
      </div>
    </>
  );
}
