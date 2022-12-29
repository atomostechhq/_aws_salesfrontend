import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { CLIENT_BASE_URL, PEOPLES_BASE_URL, SALES_BASE_URL } from "../config";
const HelperDataContext = createContext();

export const useHelperDataContext = () => {
  return useContext(HelperDataContext);
};

const HelperDataContextProvider = ({ children }) => {
  const [helperData, setHelperData] = useState({});

  useEffect(() => {
    const func = async () => {
      try {
        let clients = [],
          targetAudiences = [],
          methodologies = [],
          studyTypes = [],
          industries = [],
          devices = [],
          countries = [],
          currencies = [],
          salesManagers = [],
          accountManagers = [],
          projectManagers = [],
          secTargetAudience = [];

        let salesManagersRes = await axios.get(
          `${PEOPLES_BASE_URL}/employee/get_allEmployees`
        );
        salesManagersRes.data?.forEach((emp) => {
          // console.log(emp);
          salesManagers.push({
            label: emp?.basicInfo[0]?.name,
            value: emp?.id,
            email: emp?.email,
          });
        });

        let accountManagersRes = await axios.get(
          `${PEOPLES_BASE_URL}/employee/get_salesManagers`
        );
        accountManagersRes.data?.forEach((emp) => {
          accountManagers.push({
            label: emp?.workDetails?.basicInfo[0]?.name,
            value: emp?.Employee_ID,
          });
        });

        let projectManagersRes = await axios.get(
          `${PEOPLES_BASE_URL}/employee/get_projectManagers`
        );
        projectManagersRes.data?.forEach((pm) => {
          // console.log(pm);
          projectManagers.push({
            label: pm?.workDetails?.basicInfo[0]?.name,
            value: pm?.Employee_ID,
          });
        });

        let clientRes = await axios.get(`${CLIENT_BASE_URL}/customer`);

        clientRes?.data?.forEach((client) => {
          clients.push({
            label: client?.companyName,
            value: client?.id,
          });
        });

        let targetAudienceRes = await axios.get(
          `${SALES_BASE_URL}/sales/getall-targetAudience/`
        );
        targetAudienceRes.data?.forEach((targetAudience) => {
          let secTgs = targetAudience?.secTargetAudiences?.map((secTg) => {
            return {
              value: secTg?.sectargetAudienceId,
              label: secTg?.secondaryTargetAudience,
            };
          });
          targetAudiences.push({
            value: targetAudience?.targetAudienceId,
            label: targetAudience?.targetAudience,
            secTgs,
          });
        });

        let methodolgyRes = await axios.get(
          `${SALES_BASE_URL}/sales/getall-methodology`
        );
        methodolgyRes.data?.forEach((methdology) => {
          methodologies.push({
            value: methdology?.methodology_id,
            label: methdology?.methodology,
          });
        });

        let studyTypesRes = await axios.get(
          `${SALES_BASE_URL}/sales/getall-studytype`
        );
        studyTypesRes.data?.forEach((studyType) => {
          studyTypes.push({
            value: studyType?.studyType_id,
            label: studyType?.studyTypeName,
          });
        });

        let industryRes = await axios.get(
          `${SALES_BASE_URL}/sales/get-all-industry`
        );
        industryRes.data?.forEach((industry) => {
          industries.push({
            value: industry?.industry_id,
            label: industry?.industry_name,
          });
        });

        let devicesRes = await axios.get(
          `${SALES_BASE_URL}/sales/devices/getAllDevices`
        );
        devicesRes.data.devices?.forEach((device) => {
          devices.push({
            value: device?.deviceId,
            label: device?.deviceName,
          });
        });

        let countriesRes = await axios.get(
          `${SALES_BASE_URL}/sales/country/get`
        );
        countriesRes?.data?.countries?.forEach((country) => {
          console.log(country);
          countries.push({
            value: country?.countryId,
            label: country?.countryName,
          });
        });

        let currenciesRes = await axios.get(
          `${SALES_BASE_URL}/sales/currency/get`
        );
        currenciesRes?.data?.forEach((currency) => {
          // console.log(currency);
          currencies.push({
            value: currency?.currencyId,
            label:
              currency?.currencyName + "(" + currency?.currencySymbol + ")",
            symbol: currency?.currencySymbol,
          });
        });

        setHelperData((prev) => {
          return {
            ...prev,
            clients,
            targetAudiences,
            methodologies,
            studyTypes,
            industries,
            devices,
            countries,
            currencies,
            secTargetAudience,
            salesManagers,
            projectManagers,
            accountManagers,
          };
        });
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, []);

  const value = {
    helperData,
    setHelperData,
  };
  return (
    <HelperDataContext.Provider value={value}>
      {children}
    </HelperDataContext.Provider>
  );
};

export default HelperDataContextProvider;
