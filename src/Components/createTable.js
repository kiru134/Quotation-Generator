import jspreadsheet from "jspreadsheet-pro";
import xls from "@jspreadsheet/xls";
import React, { useState, useRef, useEffect } from "react";
import { tab } from "@testing-library/user-event/dist/tab";
import { Paper } from "@mui/material";

const CreateTable = ({ data, tableIndex, updatedtable }) => {
  const [spreadsheetdata, setSpreadsheetdata] = useState(null);
  const spreadsheetRef = useRef(null);
  const license =
    "OWU5NmEwNjY1ODQxNDg4ODYyMjRlYjU0YzBmMmI1MDAxNTI1NzJlZWQyN2RmN2RiZjE0NGRhY2M0NzIyNjlhYWI2YTBlNGFkMzhjM2E0ZDZkZDZlYjhkNjkyMTNjZWM5ODYzMDE1ZWEzYjlmM2M0N2NmNDNiYzcwM2MzNjNhNzcsZXlKdVlXMWxJam9pY0dGMWJDNW9iMlJsYkNJc0ltUmhkR1VpT2pFMk5ETTJOek0yTURBc0ltUnZiV0ZwYmlJNld5SmpjMkl1WVhCd0lpd2lhbk5tYVdSa2JHVXVibVYwSWl3aWQyVmlMbUZ3Y0NJc0lteHZZMkZzYUc5emRDSmRMQ0p3YkdGdUlqb2lNeUo5";

  useEffect(() => {
    if (!spreadsheetRef.current.jexcel) {
      const instance = jspreadsheet(spreadsheetRef.current, {
        // data: [["Product", "Price", "Quantity", "Subtotal"]],
        data,
        // columns: [{ type: "text", mask: "#,##0.00", width: 100 }],
        columns: [
          { type: "text", width: 100 },
          { type: "text", width: 100 },
          { type: "text", width: 100 },
          { type: "text", width: 100 },
        ],
        minDimensions: [4, 1],
        tableOverflow: true,
        tableWidth: "500px",
        tableHeight: "300px",
        lazyLoading: true,
        license: license,
      });

      setSpreadsheetdata(instance);
      const searchBars = document.querySelectorAll(".jexcel_filters");
      searchBars.forEach((searchBar) => {
        searchBar.style.display = "none";
      });
    }
  });

  const handleclick = (e) => {
    e.preventDefault();
    updatedtable(spreadsheetdata.getData(), tableIndex);
  };
  //   console.log(quote.tables);

  return (
    <>
      <div ref={spreadsheetRef} />
      <br />
      <button
        onClick={(event) => handleclick(event)}
        style={{
          height: "20px",
          backgroundColor: "#1976d2",
          color: "white",
          border: "0px",
          borderRadius: "2px",
          cursor: "pointer",
        }}
      >
        Save Table
      </button>
      <input
        type="button"
        value="Download"
        onClick={() => xls(spreadsheetRef.current, { version: true })}
        style={{ margin: "5px" }}
      />
    </>
  );
};

export default CreateTable;
