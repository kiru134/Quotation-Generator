import { Routes, Route, Navigate } from "react-router-dom";
import AllQuotation from "./pages/Quotation";
import TableComponent from "./Components/tablenew";
import logo from "./logo.svg";
import "./App.css";
import Quotationeditadd from "./pages/Edit";
import { Provider } from "react-redux";
import store from "./appStore/Store";

function App() {
  return (
    <>
      {/* <Routes path="custiv/quotation"> */}
      <Provider store={store}>
        <Routes>
          <Route element={<AllQuotation />} path="custiv/quotation/all"></Route>
          <Route
            element={<Quotationeditadd />}
            path="custiv/quotation/edit/:quotationid"
          />
          <Route element={<Quotationeditadd />} path="custiv/quotation/add" />
          <Route element={<TableComponent />} path="custiv/quotation/table" />
          <Route
            element={<Navigate to="custiv/quotation/all" replace={true} />}
            path="*"
          ></Route>
        </Routes>
      </Provider>
      {/* </Routes> */}
    </>
  );
}

export default App;
