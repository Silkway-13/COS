import SummaryApi from "../common";
import { toast } from "react-toastify";

const addToFavourite = async (e, id) => {
  try {
    e?.stopPropagation();
    e?.preventDefault();

    const response = await fetch(SummaryApi.addToInterested.url, {
      method: SummaryApi.addToInterested.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workId: id }),
    });

    if (!response.ok) {
      throw new Error("Failed to add to favorites.");
    }

    const responseData = await response.json();

    if (responseData.success) {
      toast.success(responseData.message);
      return responseData;
    } else {
      throw new Error(responseData.message);
    }
  } catch (error) {
    toast.error("An error occurred: " + error.message);
    return { success: false, message: error.message };
  }
};

export default addToFavourite;
