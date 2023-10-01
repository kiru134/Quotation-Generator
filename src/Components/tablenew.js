import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import CreateTable from "./createTable";
import TextField from "@mui/material/TextField";
import { Paper, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const TableComponent = ({ quotetables, updatedtables }) => {
  const [tables, setTables] = useState(quotetables || []);

  useEffect(() => {
    setTables(quotetables || []);
  }, [quotetables]);

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
    let newtablename = "";
    tables
      ? (newtablename = `Table ${tables.length + 1}`)
      : (newtablename = "Table 1");
    const newTable = {
      name: newtablename,
      header: ["Product", "Price", "Quantity", "Subtotal"],
      rows: [
        ["", "", "", ""],
        ["", "", "", ""],
        ["", "", "", ""],
      ],
    };

    if (tables && tables.length > 0) {
      tables[0].length === 0
        ? setTables([newTable])
        : setTables([...tables, newTable]);
    } else {
      setTables([newTable]);
    }
  };

  const handleupdatedtable = (data, index) => {
    const updatedTables = [...tables];
    updatedTables[index].header = data[0];

    updatedTables[index].rows = data
      .slice(1)
      .map((row) => row.map((cell) => cell.trim()));

    setTables(updatedTables);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleAddTable}>
        Add Table
      </Button>

      {tables !== undefined &&
        tables.map((table, tableIndex) => (
          <div key={tableIndex}>
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
          </div>
        ))}
    </div>
  );
};
export default TableComponent;
