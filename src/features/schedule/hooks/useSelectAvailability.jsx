import React, { useState } from "react";

function useSelectAvailability() {
  const [selectedAvailability, setSelectedAvailability] = useState(null);

  return { selectedAvailability, setSelectedAvailability };
}

export default useSelectAvailability;
