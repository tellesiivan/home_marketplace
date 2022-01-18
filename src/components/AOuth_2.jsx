import googleIcon from "../assets/svg/googleIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export default function AOuth_2() {
  const navigate = useNavigate();
  const location = useLocation();

  async function onGoogleClick() {
    // set provider
    const provider = new GoogleAuthProvider();

    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;

      // firestore >>>
      // set reference to doc
      const docRef = doc(db, "users", user.uid);
      // check if user already exists
      const docSnapshot = await getDoc(docRef);
      console.log(user);
      // if user does not exist, add it to firestore db
      if (!docSnapshot.exists()) {
        setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
          avatarImg: user.photoURL,
        });
      }
      // navigate to home page
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Unable to to login with Google account.");
    }
  }

  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === "/signup" ? "up" : "in"} with </p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img src={googleIcon} alt="google" className="socialIconImg" />
      </button>
    </div>
  );
}
