import React, { useEffect, useState } from "react";

// Modules
import { message } from "antd";

// Components
import ListView from "./ListView";

const ListContainer = (props) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);

  const getData = async () => {
    setLoading(true);

    // Call API
    let apiResponse = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        access_token:
          sessionStorage.getItem("access_token") ||
          localStorage.getItem("access_token"),
      },
      method: "GET",
    });
    apiResponse = await apiResponse.json();

    if (apiResponse.code === 200) {
      apiResponse.data.users = apiResponse.data.users.map((el) => {
        if (typeof el.premiumFreebie === "string")
          el.premiumFreebie = el.premiumFreebie === "true" ? true : false;

        return el;
      });

      setData([...apiResponse.data.users]);
      setLoading(false);
      setAllData([...apiResponse.data.users]);
      setTotalUsers(apiResponse.data.users.length);
    } else {
      message.error(apiResponse.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  /**
   * Method to remove.
   * @param {String} id
   */
  const removeData = async (id) => {
    // Call API
    let apiResponse = await fetch(
      `${process.env.REACT_APP_API_URL}/users/${id}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          access_token:
            sessionStorage.getItem("access_token") ||
            localStorage.getItem("access_token"),
        },
        method: "DELETE",
      }
    );
    apiResponse = await apiResponse.json();

    // Check if response was successfuly
    if (apiResponse.code === 200) {
      getData();
    } else {
      message.error(apiResponse.message);
    }
  };

  const search = async () => {
    setLoading(true);

    const dataFiltered = allData.filter((el) => {
      return (
        (el.email || "")
          .toLowerCase()
          .includes((searchTerm || "").toLowerCase()) ||
        (el.username || "")
          .toLowerCase()
          .includes((searchTerm || "").toLowerCase()) ||
        (el.userType || "")
          .toLowerCase()
          .includes((searchTerm || "").toLowerCase())
      );
    });
    setData([...dataFiltered]);
    setTotalUsers(dataFiltered.length);

    setLoading(false);
  };

  /**
   * Method to convert a string to a phone number
   * @param {String} phoneNumberString
   */
  const stringToPhone = (phoneNumberString) => {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{2})(\d{5})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+1 " : "";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return null;
  };

  return (
    <ListView
      loading={loading}
      data={data}
      removeData={(id) => removeData(id)}
      setSearchTerm={(e) => setSearchTerm(e)}
      search={() => search()}
      stringToPhone={(phoneNumberString) => stringToPhone(phoneNumberString)}
      totalUsers={totalUsers}
      setTotalUsers={(e) => setTotalUsers(e)}
    />
  );
};

export default ListContainer;
