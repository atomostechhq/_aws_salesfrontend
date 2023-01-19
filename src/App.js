// import logo from "./logo.svg";
import "./App.css";
import Test from "./pages/Test";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import Dashboard from "./pages/dashboard/Dashboard";
import Overview from "./pages/overview/Overview";
import InFieldProgress from "./pages/infield_progress/InFieldProgress";
import SalesOrder from "./pages/sales_order/SalesOrder";
import CreateOrder from "./pages/sales_order/create_order/CreateOrder";
import SalesOrderContextProvider from "./pages/sales_order/SalesOrderContext";
import Quotation from "./pages/quotation/Quotation";
import Zipcode from "./pages/zipcodepage/Zipcode";
import HelperDataContextProvider from "./context/HelperDataContext";
function App() {
  return (
    <>
      <Router>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path='/sales-order' element={<ProjectOrder/>}/> */}
          <Route
            path="/sales-order"
            element={
              <HelperDataContextProvider>
                <SalesOrderContextProvider>
                  <SalesOrder />
                </SalesOrderContextProvider>
              </HelperDataContextProvider>
            }
          />
          <Route
            path="/create-order"
            element={
              <HelperDataContextProvider>
                <CreateOrder />
              </HelperDataContextProvider>
            }
          />
          <Route
            path="/sales-order/overview/:id"
            element={
              <SalesOrderContextProvider>
                <HelperDataContextProvider>
                  <Overview />
                </HelperDataContextProvider>
              </SalesOrderContextProvider>
            }
          />
          <Route
            path="/sales-order/infield-progress/:id"
            element={<InFieldProgress />}
          />
          <Route path="/test" element={<Test />} />
          <Route
            path="/sales-order/overview/:id/screener/:name"
            element={<Zipcode />}
          />
          <Route path="/quotation/:id" element={<Quotation />} />
          {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} /> */}
        </Routes>
        {/* <Test /> 
          <Dashboard/> */}
      </Router>
    </>
  );
}

export default App;
