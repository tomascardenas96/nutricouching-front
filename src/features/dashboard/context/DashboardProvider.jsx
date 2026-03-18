import { useEffect, useState } from "react";
import { DashboardContext } from "./DashboardContext";

function DashboardProvider({ children }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const selectOptionDashboardMenu = (option) => {
    setSelectedOption(option);
    setSearchTerm("");
  };

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
      value={{ selectedOption, selectOptionDashboardMenu, searchTerm, setSearchTerm }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export default DashboardProvider;
