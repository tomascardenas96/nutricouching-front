import { useMediaQuery } from "react-responsive";
import PostsSection from "../../posts/components/PostsSection";
import useGetProfessionalByProfilename from "../../professional/hooks/useGetProfessionalByProfilename";
import LeftContainer from "../components/LeftContainer";
import SectionSwitch from "../components/mobile/SectionSwitch";
import ProfilePresentation from "../components/ProfilePresentation";
import RightContainer from "../components/RightContainer";
import useGetProfileByName from "../hooks/useGetProfileByName";
import useSwitchSectionProfile from "../hooks/useSwitchSectionProfile";
import "./Profile.css";
import FullSpinner from "../../../common/components/FullSpinner";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

function Profile() {
  const isMobile = useMediaQuery({ query: "(max-width: 890px)" });

  const {
    professional,
    setProfessional,
    professionalLoading,
    professionalError,
  } = useGetProfessionalByProfilename();

  console.log(professional);

  const { profile, setProfile, profileLoading, profileError } =
    useGetProfileByName();

  const { selectedOption, handleSelectOption } = useSwitchSectionProfile();

  if (profileLoading || professionalLoading) {
    return (
      <div className="profile_full-spinner">
        <FullSpinner />
      </div>
    );
  }

  if (Object.keys(professional).length === 0)
    return (
      <div className="no-user-profile">
        <h1>Perfil no existente</h1>
        <p>
          <Link to="/">
            Ir al inicio <IoIosArrowForward className="arrow" />
          </Link>
        </p>
      </div>
    );

  return (
    <div className="profile-container" id="profile">
      <div className="presentation-section">
        <div>
          <ProfilePresentation
            professional={professional}
            professionalProfile={profile}
            setProfessionalProfile={setProfile}
          />
        </div>
      </div>

      <div className="profile-content">
        <div>
          <div className="section-switch_container">
            <SectionSwitch
              selectedOption={selectedOption}
              handleSelectOption={handleSelectOption}
            />
          </div>

          {(selectedOption === "information" || !isMobile) && (
            <div className="content_left-container">
              <LeftContainer
                profile={profile}
                email={professional?.email}
                professionalId={professional?.professionalId}
              />
            </div>
          )}

          {(selectedOption === "posts" || !isMobile) && (
            <div className="content_center-container">
              <PostsSection
                profileId={profile?.profileId}
                profilePicture={profile?.picture}
                name={professional?.fullname}
              />
            </div>
          )}

          {(selectedOption === "schedules" || !isMobile) && (
            <div className="content_right-container">
              <RightContainer
                professionalId={professional?.professionalId}
                professionalName={professional.fullname}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
