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
  const [alertSettings, setAlertSettings] = useState({
    open: false,
    setalert: "",
    color: "",
    msg: "",
    posi: "",
    hide: "",
  });
  let params = Object.fromEntries(urlSearchParams.entries());
  const [localstorageData, setLocalstorageData] = useState();
  const [searchParams, setSearchParams] = useSearchParams(params);
  const [alertOpen, setAlertOpen] = useState(false);
  const fetchSalesOrders = () => {
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

  const handlealert = () => {
    setAlertSettings(true);
  };

  useMemo(() => {
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
    alertSettings,
    setAlertSettings,
    handlealert,
  };

  return (
    <SalesOrderContext.Provider value={value}>
      {children}
      <Alert
        alertOpen={alertSettings?.open}
        setAlertOpen={handlealert}
        variant={alertSettings?.color}
        message={alertSettings?.msg}
        position={alertSettings?.posi}
        hidesnackbar={alertSettings?.hide}
      />
    </SalesOrderContext.Provider>
  );
};

export default SalesOrderContextProvider;
