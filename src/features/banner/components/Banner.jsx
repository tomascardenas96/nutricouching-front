import "./Banner.css";
import { TbActivityHeartbeat } from "react-icons/tb";
import BannerIcon from "/assets/icons/eat-food-healthy-life-svgrepo-com.svg";

function Banner() {
  return (
    <article className="banner__container">
      <div>
        <div className="banner__icon">
          <img src={BannerIcon} />
        </div>

        <div className="banner__health">
          <TbActivityHeartbeat className="icon-1" />
          <TbActivityHeartbeat className="icon-2" />
        </div>

        <h1>“Tu salud empieza por lo que ponés en tu plato”</h1>
      </div>
    </article>
  );
}

export default Banner;
