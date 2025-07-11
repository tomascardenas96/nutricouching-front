import {
  FaFacebookF,
  FaInstagram,
  FaRegEnvelope,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { MdOutlinePhone } from "react-icons/md";
import "./LeftContainer.css";
import useGetAllSpecialtiesByProfessional from "../../specialties/hooks/useGetAllSpecialtiesByProfessional";

function LeftContainer({ profile, email, professionalId }) {
  const { specialties, specialtiesError, specialtiesLoading } =
    useGetAllSpecialtiesByProfessional(professionalId);

  return (
    <div className="profile-posts_right-container">
      <div className="professional-section professional-information">
        <h1>Información de Contacto</h1>
        <div>
          <p>
            <GrLocation className="icons" />{" "}
            {profile?.location || "No definido"}
          </p>
          <p>
            <MdOutlinePhone className="icons" />{" "}
            {profile?.phone || "No definido"}
          </p>
          <p>
            <FaRegEnvelope className="icons" /> {email}
          </p>
        </div>
      </div>

      <div className="professional-section professional-specialties">
        <h1>Especialidades</h1>
        <div>
          {specialties.length > 0 ?
            specialties?.map((specialty) => (
              <p key={`specialty-${specialty.specialtyId}`}>{specialty.name}</p>
            )) : <span>No hay especialidades</span>}
        </div>
      </div>

      <div className="professional-section social-networks_container">
        <h1>Redes Sociales</h1>
        <div className="social-networks">
          <p>
            <a
              href={profile?.facebook || null}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
          </p>
          <p>
            <a
              href={profile?.instagram || null}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </p>
          <p>
            <a
              href={profile?.tiktok || null}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok />
            </a>
          </p>
          <p>
            <a
              href={profile?.x || null}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LeftContainer;
