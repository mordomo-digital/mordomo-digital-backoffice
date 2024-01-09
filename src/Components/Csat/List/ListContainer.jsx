import React, { useEffect, useState } from "react";

// Modules
import { message } from "antd";

// Components
import ListView from "./ListView";

const ListContainer = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [total, setTotal] = useState(0);
  const [chartModal, setChartModal] = useState(false);
  const [functionalitiesModal, setFunctionalitiesModal] = useState(false);

  const getData = async () => {
    setLoading(true);

    // Call API
    const response = await fetch(
      `https://us-central1-lucid-burner-371712.cloudfunctions.net/get-csat-responses`
    );
    const apiResponse = await response.json();

    if (apiResponse.statusCode === 200) {
      setData([...apiResponse.data.result]);
      setLoading(false);
      setAllData([...apiResponse.data.result]);
      setTotal(apiResponse.data.result.length);
    } else {
      message.error(apiResponse.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ListView
      loading={loading}
      data={data}
      total={total}
      setTotal={(e) => setTotal(e)}
      chartModal={chartModal}
      openCloseChartModal={() => setChartModal(!chartModal)}
      functionalitiesModal={functionalitiesModal}
      openCloseFunctionalitiesModal={() =>
        setFunctionalitiesModal(!functionalitiesModal)
      }
    />
  );
};

export default ListContainer;
