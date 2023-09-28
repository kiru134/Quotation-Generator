import React, { useState, useEffect, useRef } from "react";
import Cardcomp from "../Components/Card";
import useHttp from "../Hooks/usehttphook";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import "../Components/form.css";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch } from "react-redux";
import { clearSelectedQuote } from "../appStore/actions";
import { useLocation } from "react-router-dom";
import Loading from "../Components/LoaderComponent";

const useStyles = makeStyles({
  gridcontainer: {
    padding: "20px",
    marginBottom: "30px",
  },
  appBar: {
    marginBottom: "30px",
  },

  title: {
    padding: "10px",
  },

  addButton: {
    borderRadius: "30%",
    backgroundColor: "white",
    height: "40px",
    width: "40px",
  },
});

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AllQuotation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/custiv/quotation/all") {
      dispatch(clearSelectedQuote());
    }
  }, [location.pathname]);

  const classes = useStyles();
  const [allquotes, setallquotes] = useState([]);

  const { isLoading, error, sendRequest: getquotes } = useHttp();
  const fetchallquotes = (data) => {
    if (data) {
      console.log("inside");
      setallquotes(data);
    }
  };

  useEffect(() => {
    const fetchingquotes = async () => {
      await getquotes(
        {
          url: BASE_URL + "getall",
          headers: { "Content-Type": "application/json" },
        },
        fetchallquotes
      );
    };
    fetchingquotes();
  }, []);

  const removeQuote = (quoteId) => {
    console.log("deleted from parent");
    setallquotes((prevQuotes) =>
      prevQuotes.filter((quote) => quote.id !== quoteId)
    );
  };

  const onAddClick = () => {
    navigate(`/custiv/quotation/add`);
  };
  console.log(allquotes);
  return (
    <>
      {/* <h1>ALL Quotes</h1>
      <div>
        <h1>Add Quote</h1>
        <AddIcon></AddIcon>
      </div> */}
      <AppBar
        position="static"
        className={classes.appBar}
        style={{ backgroundColor: "#5979c2" }}
      >
        {/* className="top-app-bar"> */}
        <Toolbar>
          {/* Left-aligned header */}
          <Typography variant="h6" component="div">
            All Quotes
          </Typography>

          {/* Right-aligned header */}

          <Typography
            className={classes.title}
            variant="h6"
            component="div"
            style={{ marginLeft: "auto" }}
          >
            Add Quotes
          </Typography>
          <IconButton
            className={classes.addButton}
            onClick={onAddClick} // Add onClick functionality
          >
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {isLoading && <Loading></Loading>}

      <div style={{ marginTop: "35px" }}>
        <Grid
          container
          spacing={4}
          className={classes.gridcontainer}
          style={{ marginTop: "35px" }}
        >
          {allquotes.map((ele) => (
            <Grid item key={ele.id} xs={12} sm={6} md={4}>
              <Cardcomp
                id={ele.id}
                title={ele.name}
                expiry={ele.expiryDate}
                price={ele.totalAmount}
                files={ele.files}
                tables={ele.tables}
                onDelete={removeQuote}
              />
            </Grid>
          ))}

          {/* <Grid item xs={12} sm={6} md={4}>
          <Cardcomp title="Quote 2" chipcontent="expired" price="24500" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Cardcomp title="Quote 1" chipcontent="expired" price="24500" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Cardcomp title="Quote 2" chipcontent="expired" price="24500" />
        </Grid> */}
        </Grid>
      </div>
    </>
  );
};

export default AllQuotation;
