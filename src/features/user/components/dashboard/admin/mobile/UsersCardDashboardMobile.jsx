import { MdDelete } from "react-icons/md";
import "./UsersCardDashboardMobile.css";

function UsersCardDashboardMobile({ user, setUsers }) {
  return (
    <>
      <div className="user-card-dashboard-container">
        <div className="info-container">
          <p className="name">
            <b>Nombre: </b>
            {user.name} {user.lastname}
          </p>

          <div className="stock-price">
            <p>
              <b>E-mail:</b> {user.email}
            </p>
          </div>

          <div className="buttons-container">
            <button
              className="delete-btn"
              // onClick={() => openModal(user.userId)}
            >
              <MdDelete />
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersCardDashboardMobile;
