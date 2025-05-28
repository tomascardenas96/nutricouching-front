import { useContext } from "react";
import { DashboardContext } from "../context/DashboardContext";

export const useSelectMenuOption = () => {
  const context = useContext(DashboardContext);
  const { selectedOption, selectOptionDashboardMenu } = context;

  if (!context) {
    throw new Error("useSelectMenuOption must be within RootDashboardProvider");
  }

  return { selectedOption, selectOptionDashboardMenu };
};
