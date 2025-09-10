export const getSpecialtyById = (specialties, specialtyId) => {
  const specialty = specialties?.find(
    (sp) => sp?.specialtyId === specialtyId
  );
  return specialty?.name;
};
