import "./ServicesList.css";
import { CiSearch } from "react-icons/ci";
import useGetServices from "../../../hooks/useGetServices";
import ServicesCmsCard from "./ServicesCmsCard";

function ServicesList() {
  const { services } = useGetServices();

  return (
    <div className="cms-services">
      <div className="cms-services_filter">
        <form>
          <input type="text" placeholder="Buscar" />
          <CiSearch className="search-filter_icon" />
        </form>
      </div>
      <div className="cms-services_body">
        <table>
          <tr className="header_table">
            <th className="header_table-name">Nombre</th>
            <th className="header_table-price">Precio</th>
            <th className="header_table-options">Opciones</th>
          </tr>
          {services?.map((service) => (
            <tr>
              <ServicesCmsCard key={service.serviceId} service={service} />
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default ServicesList;
