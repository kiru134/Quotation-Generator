import React, { useState, useEffect, useRef } from "react";
import { Grid, TextField } from "@mui/material";
// import { DatePicker } from "@mui/lab";
import CurrencyFormat from "react-currency-input-field";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { makeStyles } from "@material-ui/core";
import "../Components/form.css";
import FileUploader from "../Components/Fileuploader";

const useStyles = makeStyles({
  gridcontainer: {
    paddingBottom: 2,
    paddingRight: 2,

    //
  },
});

const Quotationeditadd = () => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  return (
    <>
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
          {/* xs={12} sm={6} md={6} */}
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Quote Name"
              type="text"
              defaultValue="Hello World"
            />
          </Grid>
          <Grid item xs={6}>
            <CurrencyFormat
              customInput={TextField}
              prefix="₹"
              decimalScale={0}
              label="Total Amount"
              // onChange={handleNewAmount}
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="QuoteValidity"
                defaultValue={"2022-04-17"}
                value={value}
                onChange={(newval) => setValue(newval)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <FileUploader />
            {/* <TextField
              required
              id="outlined-required"
              label="files"
              defaultValue="Hello World"
            /> */}
          </Grid>

          {/* <DatePicker
            label="Quote Validity"
             value="2022-04-17"
           
               onChange={(newValue) => setValue(newValue)}
          /> */}
          {/* <TextField
          required
          id="outlined-required"
          label="Quote Validity"
          defaultValue="Hello World"
        /> */}
        </Grid>
      </form>
    </>
  );
};
export default Quotationeditadd;
