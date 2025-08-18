import { useEffect, useState } from "react";
import { DashboardContext } from "./DashboardContext";

function DashboardProvider({ children }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const selectOptionDashboardMenu = (option) => {
    setSelectedOption(option);
  };

  // Definimos la opcion por defecto dependiendo si se abre el menu de root o professional.
  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/root") {
      setSelectedOption("Usuarios");
    }

    if (pathname === "/professional") {
      setSelectedOption("Turnos");
    }
  }, []);

  return (
    <DashboardContext.Provider
      value={{ selectedOption, selectOptionDashboardMenu }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;
