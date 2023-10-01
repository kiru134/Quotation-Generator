import React, { useState, useEffect, useRef } from "react";
import { Grid, TextField, Button } from "@mui/material";
import CurrencyFormat from "react-currency-input-field";
import { makeStyles } from "@material-ui/core";
import FileUploader from "../Components/Fileuploader";
import { useSelector, useDispatch } from "react-redux";
import TableComponent from "../Components/tablenew";
import Snackbar from "@mui/material/Snackbar";
import { v4 as uuidv4 } from "uuid";
import Loading from "../Components/LoaderComponent";
import useHttp from "../Hooks/usehttphook";
import { useParams } from "react-router-dom";

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
  const param1 = useParams();

  const classes = useStyles();
  const { isLoading, error, sendRequest: createquote } = useHttp();
  const { isLoadingquote, errorquote, sendRequest: getquote } = useHttp();

  const [snackbarmessage, setsnackbarmessage] = useState("");
  const [quote, setquote] = useState("");

  const quoteid = useSelector((state) => state.selectedQuote.id);

  const dispatch = useDispatch();

  const resultantquote = (data) => {
    if (data) {
      setquote(data);
    }
  };

  useEffect(() => {
    if (param1.quotationid) {
      const fetchingquote = async () => {
        await getquote(
          {
            url: BASE_URL + `get/${param1.quotationid}`,
            headers: { "Content-Type": "application/json" },
          },
          resultantquote
        );
      };
      fetchingquote();
    }
  }, []);

  function formatdate(inputDate) {
    const year = inputDate.getFullYear();
    const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
    const day = inputDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  }

  const [quoteName, setQuoteName] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [quoteValidity, setQuoteValidity] = useState("");
  const [quotefiles, setQuotefiles] = useState([]);
  const [quotetables, setquotetables] = useState([{}]);
  const [isopen, setsnackbar] = useState(false);

  useEffect(() => {
    // Initialize form fields with existing quote data if available
    if (quote) {
      setQuoteName(quote.name || "");
      setTotalAmount(quote.totalAmount || "");
      setQuoteValidity(
        quote.expiryDate ? formatdate(new Date(quote.expiryDate)) : null
      );
      setQuotefiles(quote.files || []);
      setquotetables(quote.tables || [{}]);
    }
  }, [quote]);

  const createdquote = (data) => {
    setsnackbar(true);
    setsnackbarmessage(data.message);
  };

  useEffect(() => {
    quote
      ? (document.title = `Edit ${quote.name}`)
      : (document.title = "Create Quote");
  }, [quote]);

  useEffect(() => {
    if (error) {
      setsnackbar(true);

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

    const formattedQuoteValidity = quoteValidity + "T00:00:00Z";
    const newQuoteId = param1.quotationid
      ? param1.quotationid
      : quoteid
      ? quoteid
      : uuidv4();
    const newQuote = {
      id: newQuoteId,
      name: quoteName,
      totalAmount: parseFloat(totalAmount),
      expiryDate: formattedQuoteValidity,
      files: quotefiles ? quotefiles : [],
      tables:
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
    dispatch(updateSelectedQuote({ id: newQuoteId }));

    const createorupdate = async () => {
      if (param1.quotationid || quoteid) {
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
      {isLoading && <Loading />}
      {isLoadingquote && <Loading />}
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
                files={quote.files}
                updatedfiles={updatedquotefile}
              />
            </Grid>
            <Grid item xs={12}>
              <TableComponent
                quotetables={quote.tables}
                updatedtables={setquotetables}
              />
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
