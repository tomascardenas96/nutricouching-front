export const getSpecialtyById = (specialties, specialtyId) => {
  const specialty = specialties?.find(
    (specialty) => specialty?.specialtyId === specialtyId
  );
  return specialty?.name;
};
