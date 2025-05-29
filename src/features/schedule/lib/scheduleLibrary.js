// Ordenar los horarios por hora de inicio.
export const orderSchedules = (events) => {
  return events.sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });
};
