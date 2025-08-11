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

function Profile() {
  const isMobile = useMediaQuery({ query: "(max-width: 890px)" });

  console.log(isMobile);

  const {
    professional,
    setProfessional,
    professionalLoading,
    professionalError,
  } = useGetProfessionalByProfilename();

  const { profile, setProfile, profileLoading, profileError } =
    useGetProfileByName();

  const { selectedOption, handleSelectOption } = useSwitchSectionProfile();

  if (profileLoading) {
    return (
      <div className="no-user-profile">
        <h1>Cargando...</h1>
      </div>
    );
  }

  if (Object.keys(professional).length === 0)
    return (
      <div className="no-user-profile">
        <h1>Perfil no existente</h1>
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
              <RightContainer professionalId={professional?.professionalId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
