import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function LinkItem({ icon: IconComponent, text, link, hidden }) {
  return (
    <Link
      className={`flex items-center ${
        !hidden ? "space-x-3" : ""
      } py-3 my-2 md:px-4 px-2 md:mt-4 rounded-md text-[#493983] hover:text-purple-500 hover:bg-purple-100 cursor-pointer transition-colors`}
      to={link}
    >
      {IconComponent && <IconComponent className="h-6 w-6" />}
      <div
        className={`md:text-[15px] text-sm font-semibold whitespace-nowrap ${
          hidden ? "hidden" : ""
        }`}
      >
        {text}
      </div>
    </Link>
  );
}

LinkItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
};
