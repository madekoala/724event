/* istanbul ignore file */
import PropTypes from "prop-types";
import "./style.scss";

const Logo = ({ size }) => (
  <div className="Logo">
    <svg
      width={size === "large" ? "160" : "130"}
      height={size === "large" ? "60" : "60"}
      viewBox="0 0 130 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ajout des corrections dans le texte */}
      <text
        fill="url(#paint5_linear_56_57)"
        style={{
          fontFamily: "Kalimati",
          fontSize: "39px",
          fontWeight: 700,
          whiteSpace: "pre",
        }}
        x="-1.125"
        y="44.995"
      >
        724
      </text>
      <defs>
        <linearGradient
          id="paint0_linear_56_57"
          x1="31.4312"
          y1="28.0978"
          x2="93.0547"
          y2="27.4592"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3300FF" />
          <stop offset="1" stopColor="#3300FF" />
        </linearGradient>
        {/* Autres gradients */}
      </defs>
    </svg>
  </div>
);

Logo.propTypes = {
  size: PropTypes.string,
};

Logo.defaultProps = {
  size: "small",
};

export default Logo;
