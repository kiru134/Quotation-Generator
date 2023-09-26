import { Routes, Route } from "react-router-dom";
import AllQuotation from "./pages/Quotation";
import logo from "./logo.svg";
import "./App.css";
import Quotationeditadddummy from "./pages/Edit";
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
            element={<Quotationeditadddummy />}
            path="custiv/quotation/edit/:quotationid"
          />
          <Route
            element={<Quotationeditadddummy />}
            path="custiv/quotation/add"
          />
        </Routes>
      </Provider>
      {/* </Routes> */}
    </>
  );
}

export default App;
