import "./SelectedUserToMakeProfessional.css";

function SelectedUserToMakeProfessional({ user, onClose }) {
  return (
    <div
      className="users-card_professional-form"
      onClick={() => (onClose ? onClose(user) : null)}
    >
      <img
        src="/src/public/assets/default-avatar.webp"
        alt="professional-form_user-picture"
      />
      <p>
        {user.name} {user.lastname}
      </p>
      <span>{user.email}</span>
    </div>
  );
}

export default SelectedUserToMakeProfessional;
