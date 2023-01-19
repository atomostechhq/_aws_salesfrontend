import { createContext, useContext, useEffect, useState } from "react";
import {
  CLIENT_BASE_URL,
  PEOPLES_BASE_URL,
  SALES_BASE_URL,
} from "../../config";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { parse } from "uuid";
import Alert from "../../components/Alert/Alert";

const SalesOrderContext = createContext();

export const useSalesOrderContext = () => {
  return useContext(SalesOrderContext);
};

const SalesOrderContextProvider = ({ children }) => {
  const [salesOrderData, setSalesorderData] = useState({});
  const urlSearchParams = new URLSearchParams(window.location.search);
  let params = Object.fromEntries(urlSearchParams.entries());
  const [localstorageData, setLocalstorageData] = useState();
  const [searchParams, setSearchParams] = useSearchParams(params);

  const fetchSalesOrders = () => {
    console.log("we are fetching");
    axios
      .get(`${SALES_BASE_URL}/sales/get-salesorder${window.location.search}`)
      .then((res) => {
        console.log(res.data);
        // setSalesorderDataCopy(res.data);
        setSalesorderData(res.data);
        // filterSalesOrder(res.data.salesOrders);
      })
      .then((err) => console.log(err));
  };

  useMemo(() => {
    console.log("#1");
    fetchSalesOrders();
  }, [searchParams]);

  const handleFilterChange = (key, value) => {
    if (value && value !== undefined && value !== null)
      setSearchParams((prev) => ({ ...params, [key]: value, page: 1 }));
    else {
      delete params[key];
      setSearchParams(() => ({ ...params, page: 1 }));
    }
    // filterSalesOrder(salesOrderData);
  };

  console.log(localstorageData);
  const value = {
    salesOrderData,
    handleFilterChange,
    params,
    fetchSalesOrders,
  };

  return (
    <SalesOrderContext.Provider value={value}>
      {children}
    </SalesOrderContext.Provider>
  );
};

export default SalesOrderContextProvider;
