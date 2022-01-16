import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as Avatar } from "../assets/svg/personOutlineIcon.svg";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  function pathMatchRoute(route) {
    let color = "";
    route === location.pathname ? (color = "#44c987") : (color = "#888");
    return color;
  }

  return (
    <footer className="navbar">
      <nav className="navbarNav">
        <ul className="navbarListItems">
          <li className="navbarListItem" onClick={() => navigate("/")}>
            <ExploreIcon
              fill={pathMatchRoute("/")}
              width="24px"
              height="24px"
            />
            <p style={{ color: `${pathMatchRoute("/")}` }}>Explore</p>
          </li>
          <li className="navbarListItem" onClick={() => navigate("/offers")}>
            <OfferIcon
              fill={pathMatchRoute("/offers")}
              width="24px"
              height="24px"
            />
            <p style={{ color: `${pathMatchRoute("/offers")}` }}> Offer</p>
          </li>
          <li className="navbarListItem" onClick={() => navigate("/profile")}>
            <Avatar
              fill={pathMatchRoute("/profile")}
              width="24px"
              height="24px"
            />
            <p style={{ color: `${pathMatchRoute("/profile")}` }}>Profile</p>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
