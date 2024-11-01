import SummaryApi from "../common";

const fetchCategoryAllWork = async (category) => {
  try {
    const response = await fetch(SummaryApi.categoryAllWorks.url, {
      method: SummaryApi.categoryAllWorks.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch category works");
    }

    const dataResponse = await response.json();

    return dataResponse;
  } catch (error) {
    return { error: error.message || "An error occurred" };
  }
};

export default fetchCategoryAllWork;
