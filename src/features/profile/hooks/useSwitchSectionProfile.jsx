import { useState } from "react";

function useSwitchSectionProfile() {
  const [selectedOption, setSelectedOption] = useState("posts");

  const handleSelectOption = (section) => {
    setSelectedOption(section);
  };

  return { selectedOption, handleSelectOption };
}

export default useSwitchSectionProfile;
