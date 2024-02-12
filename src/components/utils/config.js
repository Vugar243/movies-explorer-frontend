export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const formattedHours = hours > 0 ? `${hours}ч` : '';
  const formattedMinutes = remainingMinutes > 0 ? `${remainingMinutes}м` : '';

  return `${formattedHours} ${formattedMinutes}`;
};

