import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

export const useSelectMenuOption = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error("useSelectMenuOption must be within RootDashboardProvider");
  }

  const { selectedOption, selectOptionDashboardMenu, searchTerm, setSearchTerm } = context;

  return { selectedOption, selectOptionDashboardMenu, searchTerm, setSearchTerm };
};
