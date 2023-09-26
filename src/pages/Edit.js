import React, { useState, useEffect, useRef } from "react";
import { Grid, TextField, Button } from "@mui/material";
import CurrencyFormat from "react-currency-input-field";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { makeStyles } from "@material-ui/core";
import FileUploader from "../Components/Fileuploader";
import { useSelector, useDispatch } from "react-redux";
import Tablecomp from "../Components/tables";
import useHttp from "../Hooks/usehttphook";
import Snackbar from "@mui/material/Snackbar";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles({
  gridcontainer: {
    paddingBottom: 2,
    paddingRight: 2,
  },
  button: {
    marginTop: 20,
  },
});
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Quotationeditadddummy = () => {
  const classes = useStyles();
  const { isLoading, error, sendRequest: createquote } = useHttp();

  const quote = useSelector((state) => state.selectedQuote);

  function formatdate(inputDate) {
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const [quoteName, setQuoteName] = useState(quote ? quote.title : "");
  const [totalAmount, setTotalAmount] = useState(quote ? quote.price : "");
  const [quoteValidity, setQuoteValidity] = useState(
    quote && quote.expiry ? formatdate(new Date(quote.expiry)) : null
  );
  const [quotefiles, setQuotefiles] = useState(quote ? quote.files : []);
  const [quotetables, setquotetables] = useState(quote ? quote.tables : [[]]);
  const [isopen, setsnackbar] = useState(false);

  const createdquote = (data) => {
    setsnackbar(true);
  };
  const handlesnckbarclose = () => {
    setsnackbar(false);
  };

  const handleSave = () => {
    const newQuoteId = quote ? quote.id : uuidv4();
    const newQuote = {
      ID: newQuoteId,
      Name: quoteName,
      TotalAmount: parseFloat(totalAmount),
      ExpiryDate: quoteValidity ? quoteValidity : null,
      Files: quotefiles ? quotefiles : [],
      Tables: quotetables,
    };
    // {
    //     "ID": "2",
    //       "Name":"Quote 2",
    //       "ExpiryDate": "2024-12-31T00:00:00Z",
    //       "TotalAmount":2969.56,
    //          "Files": ["file4.pdf", "file5.doc"],
    //      "Tables": [
    //         {
    //            "Name": "Table 1",
    //         "Header": ["Part Name", "Unit Price", "Quantity", "Total Price"],
    //         "Rows": [
    //           ["Part D", "10.0", "5", "50.0"],
    //           ["Part B", "10.0", "5", "50.0"],
    //           ["Part C", "10.0", "5", "50.0"]
    //         ]
    //       },
    //         {
    //           "Name": "Table 2",
    //         "Header": ["Product", "Price", "Quantity", "Subtotal"],
    //         "Rows": [
    //          ["Part A", "10.0", "5", "50.0"],
    //       ["Part B", "15.0", "3", "45.0"],
    //       ["Part C", "8.0", "7", "56.0"]
    //         ]
    //         }
    //      ]
    //   }
    const createorupdate = async () => {
      if (quote) {
        await createquote(
          {
            url: BASE_URL + "update",
            headers: { "Content-Type": "application/json" },
            method: "PUT",
            body: JSON.stringify(newQuote),
          },
          createdquote
        );
      } else {
        await createquote(
          {
            url: BASE_URL + "create",
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newQuote),
          },
          createdquote
        );
      }
    };
    createorupdate();
  };
  const updatedquotefile = (file) => {
    setQuotefiles(file);
  };

  return (
    <>
      <div className="formcontainer">
        <h1>Edit/Create</h1>

        <form className="form-box">
          <Grid
            container
            spacing={2}
            direction="row"
            alignItems="center"
            justifyItems="center"
            className={classes.gridcontainer}
          >
            <Grid item xs={6}>
              <TextField
                required
                id="outlined-required"
                label="Quote Name"
                type="text"
                value={quoteName}
                onChange={(e) => setQuoteName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <CurrencyFormat
                customInput={TextField}
                prefix="₹"
                decimalScale={0}
                label="Total Amount"
                value={totalAmount}
                onValueChange={(value) => setTotalAmount(value)}
              />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Quote Validity"
                  onChange={(newDate) => setQuoteValidity(newDate)}
                  // renderInput={(params) => <TextField {...params} />}
                  // inputFormat={(value) =>
                  //   value ? formatdate(value, "YYYY-MM-DD") : ""
                  // }
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <FileUploader
                files={quotefiles}
                updatedfiles={updatedquotefile}
              />
            </Grid>
            <Grid item xs={12}>
              <Tablecomp updatedtables={setquotetables} />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleSave}
          >
            Save
          </Button>
        </form>
        <Snackbar
          open={isopen}
          autoHideDuration={3000}
          onClose={handlesnckbarclose}
          message="Quote updated successfully."
        ></Snackbar>
      </div>
    </>
  );
};

export default Quotationeditadddummy;
