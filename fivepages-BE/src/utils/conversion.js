export const convertToIST = (date) => {
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC + 5:30
  return new Date(date.getTime() + istOffset);
}