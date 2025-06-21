import CoverPhoto from "./CoverPhoto";
import ProfilePicture from "./ProfilePicture";
import "./ProfilePresentation.css";
import { FaLocationDot } from "react-icons/fa6";
import { AiFillSchedule } from "react-icons/ai";
import { GrFacebookOption } from "react-icons/gr";
import { BsThreeDots } from "react-icons/bs";

function ProfilePresentation({ professionalProfile }) {
  return (
    <div className="professional-profile">
      <CoverPhoto>
        <ProfilePicture image={professionalProfile?.profile?.picture} />
      </CoverPhoto>

      <div className="professional-profile_info">
        <h1>
          {professionalProfile?.fullname}.{" "}
          <span>
            <BsThreeDots />
          </span>
        </h1>
        <p>Nutricionista con especializacion en deportistas</p>
        <div>
          <span>
            <FaLocationDot /> Benito Juarez, Argentina
          </span>
          <span>
            <AiFillSchedule /> Se unio en Febrero del 2017
          </span>
          <span>
            <GrFacebookOption /> @natasha123
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfilePresentation;
