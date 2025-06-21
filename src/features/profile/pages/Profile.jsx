import ProfilePresentation from "../components/ProfilePresentation";
import useGetProfile from "../hooks/useGetProfile";
import "./Profile.css";

function Profile() {
  const { professionalProfile, profileLoading, profileError } = useGetProfile();

  if (profileLoading) {
    return (
      <div className="no-user-profile">
        <h1>Cargando...</h1>
      </div>
    );
  }

  if (Object.keys(professionalProfile).length === 0)
    return (
      <div className="no-user-profile">
        <h1>Perfil no existente</h1>
      </div>
    );

  return (
    <div className="profile-container">
      <div className="presentation-section">
        <ProfilePresentation professionalProfile={professionalProfile} />
      </div>
    </div>
  );
}

export default Profile;
