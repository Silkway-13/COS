import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SummaryApi from "../common";
import VerticalWorkCardSearch from "../components/VerticalWorkCardSearch";

const SearchWork = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchWork = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.searchWork.url + query.search);
    const dataResponse = await response.json();
    setLoading(false);

    setData(dataResponse.data);
  };
  useEffect(() => {
    fetchSearchWork();
  }, [query]);
  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Уншиж байна ...</p>}

      <p className="text-lg font-semibold my-3">
        Хайлтын үр дүн : {data.length}
      </p>

      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">Илэрц байхгүй...</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalWorkCardSearch loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchWork;
