import { createPortal } from "react-dom";
import { AiFillSchedule } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { GrFacebookOption } from "react-icons/gr";
import { useAuthUser } from "../../auth/hooks/useAuthUser";
import useUpdateProfileModals from "../hooks/useUpdateProfileModals";
import CoverPhoto from "./CoverPhoto";
import OptionsModal from "./modals/OptionsModal";
import UpdateProfileModal from "./modals/UpdateProfileModal";
import ProfilePicture from "./ProfilePicture";
import "./ProfilePresentation.css";

function ProfilePresentation({
  professional,
  professionalProfile,
  setProfessionalProfile,
}) {
  const {
    handleOpenOptionsModal,
    handleCloseOptionsModal,
    handleOpenUpdateProfileModal,
    handleCloseUpdateProfileModal,
    isOptionsModalOpen,
    isUpdateProfileModalOpen,
  } = useUpdateProfileModals();

  const { user } = useAuthUser();

  const isProfileOwner =
    user?.professional?.professionalId === professional?.professionalId;

  return (
    <div className="professional-profile">
      <CoverPhoto
        image={professionalProfile?.coverPhoto}
        setProfessionalProfile={setProfessionalProfile}
        profileId={professionalProfile?.profileId}
        isProfileOwner={isProfileOwner}
      >
        <ProfilePicture
          image={professionalProfile?.picture}
          profileId={professionalProfile?.profileId}
          setProfessionalProfile={setProfessionalProfile}
          isProfileOwner={isProfileOwner}
        />
      </CoverPhoto>

      <div className="professional-profile_info">
        <h1>
          {professional?.fullname}.{" "}
          {isProfileOwner && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                handleOpenOptionsModal();
              }}
            >
              <BsThreeDots />
              {isOptionsModalOpen && (
                <OptionsModal
                  handleOpenUpdateProfileModal={handleOpenUpdateProfileModal}
                  handleCloseOptionsModal={handleCloseOptionsModal}
                  professional={professional}
                />
              )}
            </span>
          )}
        </h1>
        <p>
          {professionalProfile?.bio || "No hay descripción en la biografia"}
        </p>
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

      {isUpdateProfileModalOpen &&
        createPortal(
          <UpdateProfileModal
            handleCloseUpdateProfileModal={handleCloseUpdateProfileModal}
            professionalProfile={professionalProfile}
            setProfessionalProfile={setProfessionalProfile}
          />,
          document.getElementById("profile")
        )}
    </div>
  );
}

export default ProfilePresentation;
