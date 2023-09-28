import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import CreateTable from "./createTable";
import TextField from "@mui/material/TextField";
import { Paper, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TableComponent = ({ updatedtables }) => {
  // const [spreadsheetdata, setSpreadsheetdata] = useState(null);
  const quote = useSelector((state) => state.selectedQuote);
  const [tables, setTables] = useState(
    quote && quote.tables
      ? quote.tables[0].rows.length >= 1
        ? quote.tables
        : [[]]
      : [[]]
  );
  // console.log(quote.tables);
  useEffect(() => {
    updatedtables(tables);
  }, [tables]);

  const handleEditTableName = (tableIndex, newValue) => {
    // settableheader(newValue);
    if (tableIndex >= 0 && tableIndex < tables.length) {
      const updatedTables = [...tables];
      updatedTables[tableIndex].name = newValue;
      setTables(updatedTables);
    }
  };

  const handleDeleteTable = (tableIndex) => {
    const updatedTables = [...tables];
    updatedTables.splice(tableIndex, 1);
    setTables(updatedTables);
  };

  const handleAddTable = () => {
    const newTable = {
      name: `Table ${tables.length + 1}`,
      header: ["Product", "Price", "Quantity", "Subtotal"], // Default header
      rows: [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
      ],
    };
    console.log(tables.length);
    console.log(tables);
    if (tables[0].length === 0) {
      setTables([newTable]);
    } else {
      setTables([...tables, newTable]);
    }
  };

  const handleupdatedtable = (data, index) => {
    // console.log(data.splice(1, data.length), index);
    const updatedTables = [...tables];
    updatedTables[index].header = data[0];
    updatedTables[index].rows = data.splice(1, data.length);
    setTables(updatedTables);
  };

  console.log(tables);
  // &&
  // tables[0].rows[0].length === 0 &&
  // tables[0].headers === undefined &&
  // tables[0].name === undefined
  return (
    <div>
      {/* {(!quote.tables || quote.tables.length === 0) && tables.length === 0 ? (
        <Button variant="contained" color="primary" onClick={handleAddTable}>
          Add Table
        </Button>
      ) : ( */}

      <Button variant="contained" color="primary" onClick={handleAddTable}>
        Add Table
      </Button>
      {tables.map((table, tableIndex) => (
        <>
          {table.header && table.rows && (
            <Paper
              key={tableIndex}
              style={{ margin: "16px 0", padding: "16px" }}
            >
              <TextField
                label="Table Name"
                value={table.name}
                onChange={(e) =>
                  handleEditTableName(tableIndex, e.target.value)
                }
                style={{ marginBottom: "8px" }}
              />
              <IconButton
                onClick={() => handleDeleteTable(tableIndex)}
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
              <div>
                <CreateTable
                  tableIndex={tableIndex}
                  data={[[...table.header], ...table.rows]}
                  updatedtable={handleupdatedtable}
                ></CreateTable>
              </div>
            </Paper>
          )}
        </>
      ))}
    </div>
  );
};
export default TableComponent;
