import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";

function HeaderTopbar() {
  return (
    <div className="header-topbar">
      <div className="header-topbar__social">
        <a href="#" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="#" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="#" aria-label="Twitter">
          <FaXTwitter />
        </a>
        <a href="#" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>
      <div className="header-topbar__contact">
        <span>
          <MdOutlinePhone /> +549 2281-332211
        </span>
        <span>
          <MdOutlineEmail /> administracion@cohesiva.com
        </span>
      </div>
    </div>
  );
}

export default HeaderTopbar;
