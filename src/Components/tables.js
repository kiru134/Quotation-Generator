import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Tables.css";

const Tablecomp = ({ updatedtables }) => {
  const quote = useSelector((state) => state.selectedQuote);
  const [tables, setTables] = useState(quote ? quote.tables : []);
  const [newtableheader, settableheader] = useState("");
  const [focusedCell, setFocusedCell] = useState({
    tableIndex: -1,
    rowIndex: -1,
    cellIndex: -1,
  });

  useEffect(() => {
    updatedtables(tables);
  }, [tables]);

  const handleEditCell = (tableIndex, rowIndex, cellIndex, newValue) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows[rowIndex][cellIndex] = newValue;
    setTables(updatedTables);
  };

  const handleEditHeader = (tableIndex, headerIndex, newValue) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].header[headerIndex] = newValue;
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
    setTables([...tables, newTable]);
  };

  const handleDeleteRow = (tableIndex, rowIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows.splice(rowIndex, 1);
    setTables(updatedTables);
  };

  const handleDeleteTable = (tableIndex) => {
    const updatedTables = [...tables];
    updatedTables.splice(tableIndex, 1);
    setTables(updatedTables);
  };

  const handleEditTableName = (tableIndex, newValue) => {
    settableheader(newValue);
    if (tableIndex >= 0 && tableIndex < tables.length) {
      const updatedTables = [...tables];
      updatedTables[tableIndex].name = newValue;
      setTables(updatedTables);
    }
  };

  const handlePasteData = (tableIndex, rowIndex, data) => {
    const updatedTables = [...tables];
    const rows = data.split("\n");

    rows.forEach((row, i) => {
      const cells = row.split("\t"); // Assuming tab-separated data

      if (
        tableIndex < updatedTables.length &&
        rowIndex + i < updatedTables[tableIndex].rows.length
      ) {
        cells.forEach((cell, j) => {
          const currentRow = updatedTables[tableIndex].rows[rowIndex + i];
          if (j < currentRow.length) {
            currentRow[j] = cell;
          }
        });
      } else {
        // If there is no row at the current index, do nothing
      }
    });

    setTables(updatedTables);
  };

  const handleCellFocus = (tableIndex, rowIndex, cellIndex) => {
    setFocusedCell({ tableIndex, rowIndex, cellIndex });
  };

  return (
    <div>
      {tables.length === 0 ? (
        <Button variant="contained" color="primary" onClick={handleAddTable}>
          Add Table
        </Button>
      ) : (
        <>
          <Button variant="contained" color="primary" onClick={handleAddTable}>
            Add Table
          </Button>
          {tables.map((table, tableIndex) => (
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
              <div className="table-container">
                <Table>
                  <TableHead>
                    <TableRow>
                      {table.header.map((header, headerIndex) => (
                        <TableCell key={headerIndex}>
                          <TextField
                            value={header}
                            onChange={(e) =>
                              handleEditHeader(
                                tableIndex,
                                headerIndex,
                                e.target.value
                              )
                            }
                          />
                        </TableCell>
                      ))}
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {table.rows.map((row, rowIndex) => (
                      <TableRow key={rowIndex} className="table-row">
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>
                            <TextField
                              value={cell}
                              onChange={(e) =>
                                handleEditCell(
                                  tableIndex,
                                  rowIndex,
                                  cellIndex,
                                  e.target.value
                                )
                              }
                              onPaste={(e) => {
                                e.preventDefault();
                                const pastedData =
                                  e.clipboardData.getData("text/plain");
                                handlePasteData(
                                  tableIndex,
                                  rowIndex,
                                  pastedData
                                );
                              }}
                              onFocus={() =>
                                handleCellFocus(tableIndex, rowIndex, cellIndex)
                              }
                            />
                          </TableCell>
                        ))}
                        <TableCell>
                          <IconButton
                            onClick={() =>
                              handleDeleteRow(tableIndex, rowIndex)
                            }
                            color="secondary"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          ))}
        </>
      )}
    </div>
  );
};

export default Tablecomp;
