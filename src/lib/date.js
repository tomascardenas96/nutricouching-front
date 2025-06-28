// Convertimos la fecha al formato [nombre del dia], [numero del dia] DE [mes] DEL [año].
export const parseDate = (date) => {
  const weekDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const dateObj = new Date(date + "T00:00:00");
  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  if (
    today.getFullYear() === dateObj.getFullYear() &&
    today.getMonth() === dateObj.getMonth() &&
    today.getDate() === dateObj.getDate()
  ) {
    return "Hoy";
  }

  if (
    tomorrow.getFullYear() === dateObj.getFullYear() &&
    tomorrow.getMonth() === dateObj.getMonth() &&
    tomorrow.getDate() === dateObj.getDate()
  ) {
    return "Mañana";
  }

  return `${weekDays[dateObj.getDay()]}, ${dateObj.getDate()} de ${
    months[dateObj.getMonth()]
  } ${dateObj.getFullYear()}`;
};

export const shortDate = (time) => {
  return time.substring(0, 5);
};

// Función para verificar si la fecha es anterior a la actual.
export const isPreviousDate = (date) => {
  const today = new Date(Date.now());
  today.setHours(0, 0, 0, 0);
  today.setMinutes(0, 0, 0, 0);
  today.setMilliseconds(0, 0, 0, 0);

  const dateObj = new Date(date + "T00:00:00");

  return dateObj < today;
};

export const getSpanishDay = (day) => {
  const weekDays = {
    Mon: "Lunes",
    Tue: "Martes",
    Wed: "Miercoles",
    Thu: "Jueves",
    Fri: "Viernes",
    Sat: "Sabado",
    Sun: "Domingo",
  };

  return weekDays[`${day}`];
};

export const publishedAgo = (date) => {
  const now = new Date();
  const diference = now - new Date(date); // en milisegundos

  const seconds = Math.floor(diference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return "Hace un momento";
  } else if (minutes < 60) {
    return `Hace ${minutes} minuto${minutes === 1 ? "" : "s"}`;
  } else if (hours < 24) {
    return `Hace ${hours} hora${hours === 1 ? "" : "s"}`;
  } else {
    return `Hace ${days} día${days === 1 ? "" : "s"}`;
  }
};
