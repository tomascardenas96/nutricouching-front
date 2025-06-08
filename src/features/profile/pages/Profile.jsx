import ProfilePresentation from "../components/ProfilePresentation";
import useGetProfile from "../hooks/useGetProfile";
import "./Profile.css";

function Profile() {
  const { professionalProfile, profileLoading, profileError } = useGetProfile();

  return (
    <div className="profile-container">
      <div className="presentation-section">
        <ProfilePresentation professionalProfile={professionalProfile} />
      </div>
    </div>
  );
}

export default Profile;
