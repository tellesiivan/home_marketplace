import googleIcon from "../assets/svg/googleIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../firebase.config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export default function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  async function onGoogleClick() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //check for user
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      // if user doesnt exist, create user
      if (!docSnap.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timeStamp: serverTimestamp(),
        });
      }
      // navigate to profile page
      navigate("/");
    } catch (error) {
      toast.error("Could not authenticate with Google");
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
