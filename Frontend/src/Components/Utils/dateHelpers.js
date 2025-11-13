export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    return new Date(dateString).toLocaleDateString();
  } catch (error) {
    console.error("Date formatting error:", error);
    return "Invalid Date";
  }
};

export const calculateDuration = (startDate, endDate) => {
  if (!startDate || !endDate) return "N/A";
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (error) {
    console.error("Duration calculation error:", error);
    return "N/A";
  }
};