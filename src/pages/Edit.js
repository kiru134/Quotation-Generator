import React, { useState, useEffect, useRef } from "react";
import { Grid, TextField, Button } from "@mui/material";
import CurrencyFormat from "react-currency-input-field";
import { makeStyles } from "@material-ui/core";
import FileUploader from "../Components/Fileuploader";
import { useSelector, useDispatch } from "react-redux";
import TableComponent from "../Components/tablenew";
import useHttp from "../Hooks/usehttphook";
import Snackbar from "@mui/material/Snackbar";
import { v4 as uuidv4 } from "uuid";
import Loading from "../Components/LoaderComponent";

import { updateSelectedQuote } from "../appStore/actions";

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
const Quotationeditadd = () => {
  const classes = useStyles();
  const { isLoading, error, sendRequest: createquote } = useHttp();
  const [snackbarmessage, setsnackbarmessage] = useState("");

  const quote = useSelector((state) => state.selectedQuote);

  const dispatch = useDispatch();

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
  const [quotefiles, setQuotefiles] = useState(
    quote && quote.files ? quote.files : []
  );
  const [quotetables, setquotetables] = useState(quote ? quote.tables : [[]]);
  const [isopen, setsnackbar] = useState(false);

  const createdquote = (data) => {
    setsnackbar(true);
    setsnackbarmessage(data.message);
  };
  useEffect(() => {
    quote
      ? (document.title = `Edit ${quote.title}`)
      : (document.title = "Create Quote");
  }, []);
  useEffect(() => {
    if (error) {
      setsnackbar(true);
      console.log(error);
      setsnackbarmessage(`Error : Quote cannot be saved,message:${error}`);
    }
  }, [error]);

  const handlesnckbarclose = () => {
    setsnackbar(false);
  };

  const handleSave = () => {
    if (!quoteName.trim()) {
      // Quote Name is empty
      alert("Please enter a Quote Name.");
      return;
    }

    if (!quoteValidity) {
      alert("Please select a Quote Validity date.");
      return;
    }

    if (!totalAmount) {
      alert("Please enter a Total Amount.");
      return;
    }
    console.log(quote);
    console.log(quotetables);
    console.log(quotetables.length);
    // console.log(quotetables[0].rows.length);
    // console.log(quote.ID);
    const formattedQuoteValidity = quoteValidity + "T00:00:00Z";
    const newQuoteId = quote ? (quote.ID ? quote.ID : quote.id) : uuidv4();
    const newQuote = {
      ID: newQuoteId,
      Name: quoteName,
      TotalAmount: parseFloat(totalAmount),
      ExpiryDate: formattedQuoteValidity,
      Files: quotefiles ? quotefiles : [],
      Tables:
        quotetables &&
        quotetables.length >= 1 &&
        quotetables[0].rows &&
        quotetables[0].rows.length >= 1
          ? quotetables
          : [
              {
                Name: "",
                Header: [],
                Rows: [[]],
              },
            ],
    };

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
    console.log(newQuoteId);
    console.log(newQuote);
    dispatch(updateSelectedQuote(newQuote));
  };
  const updatedquotefile = (file) => {
    setQuotefiles(file);
  };

  return (
    <>
      {isLoading && <Loading />}
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
                inputProps={{
                  maxLength: 50,
                }}
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
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Quote Validity"
                  onChange={(newDate) => setQuoteValidity(newDate)}
                  // renderInput={(params) => <TextField {...params} />}
                  // inputFormat={(value) =>
                  //   value ? formatdate(value, "YYYY-MM-DD") : ""
                  // }
                /> */}
              <TextField
                id="quoteValidity"
                type="date"
                label="Quote Validity"
                value={quoteValidity}
                onChange={(event) => setQuoteValidity(event.target.value)}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* </LocalizationProvider> */}
            </Grid>
            <Grid item xs={6}>
              <FileUploader
                files={quotefiles}
                updatedfiles={updatedquotefile}
              />
            </Grid>
            <Grid item xs={12}>
              <TableComponent updatedtables={setquotetables} />
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
          message={snackbarmessage}
        ></Snackbar>
      </div>
    </>
  );
};

export default Quotationeditadd;
