export const professionalSpecialties = (specialties) => {
  if (!specialties?.length) return `Sin especialidad`;
  if (specialties?.length === 1) return `${specialties[0]?.name}`;

  return `${specialties[0]?.name} y ${specialties.length - 1} más`;
};
