// Replace the import line with:
const getTriviaData = async () => {
  console.log("Fetching data...");
  try {
    const response = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
    const data = await response.json();
    console.log("API Response:", data);
    if (data.response_code === 0) {
      return data.results;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch trivia data:", error);
    return [];
  }
};