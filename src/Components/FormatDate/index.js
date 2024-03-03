function formatDate(currentDate) {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    currentDate
  );

  return formattedDate;
}
export default formatDate();
