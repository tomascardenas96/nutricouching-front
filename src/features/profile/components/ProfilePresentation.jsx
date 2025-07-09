import { AiFillSchedule } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { GrFacebookOption } from "react-icons/gr";
import CoverPhoto from "./CoverPhoto";
import ProfilePicture from "./ProfilePicture";
import "./ProfilePresentation.css";

function ProfilePresentation({
  professional,
  professionalProfile,
  setProfessionalProfile,
}) {
  return (
    <div className="professional-profile">
      <CoverPhoto
        image={professionalProfile?.coverPhoto}
        setProfessionalProfile={setProfessionalProfile}
        profileId={professionalProfile?.profileId}
      >
        <ProfilePicture
          image={professionalProfile?.picture}
          profileId={professionalProfile?.profileId}
          setProfessionalProfile={setProfessionalProfile}
        />
      </CoverPhoto>

      <div className="professional-profile_info">
        <h1>
          {professional?.fullname}.{" "}
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
