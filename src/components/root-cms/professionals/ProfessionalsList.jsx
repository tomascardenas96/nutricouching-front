import "./ProfessionalList.css";
import { CiSearch } from "react-icons/ci";
import useGetProfessionals from "../../../hooks/useGetProfessionals";
import ProfessionalCmsCard from "./ProfessionalCmsCard";
import { LiaAddressCard } from "react-icons/lia";

function ProfessionalsList() {
  const { professionals, professionalsError, professionalsLoading } =
    useGetProfessionals();

  return (
    <div className="cms-professional-list">
      <div className="cms-professional_filter">
        <form>
          <input type="text" placeholder="Buscar" />
          <CiSearch className="professionals_search-filter_icon" />
        </form>
      </div>
      <div className="cms-professional_body">
        <table>
          <thead>
            <tr className="header_table">
              <th className="header_table-name">Nombre</th>
              <th className="header_table-options">Profesion</th>
            </tr>
          </thead>
          <tbody>
            {professionals?.map((professional) => (
              <tr
                key={`professional-${professional.professionalId}`}
                className="cms-professional_tr-table"
              >
                <ProfessionalCmsCard professional={professional} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="cms-professional-add">
        <LiaAddressCard className="add-professional_icon" />
        <h1>GESTIONAR PROFESIONALES</h1>
      </div>
    </div>
  );
}

export default ProfessionalsList;
