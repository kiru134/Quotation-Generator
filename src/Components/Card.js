import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Snackbar from "@mui/material/Snackbar";
import useHttp from "../Hooks/usehttphook";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Chip,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  CardActionArea,
} from "@mui/material";
import { useDispatch } from "react-redux";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { setSelectedQuote } from "../appStore/actions";

const useStyles = makeStyles({
  chip: {
    fontSize: "16px",
    padding: "20px",
    margin: "15px",
    backgroundColor: "green",
  },
  card: {
    maxWidth: 400,
    minHeight: 150,
    padding: "8px",
  },
});
const BASE_URL = process.env.REACT_APP_BASE_URL;
function Cardcomp({ id, title, expiry, price, files, tables, onDelete }) {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest: deletequote } = useHttp();

  const classes = useStyles();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const dispatch = useDispatch();
  // const [deletedquote, setdeletequote] = useState(false);

  // useEffect(() => {
  //   if (deletedquote) {
  //     const timer = setTimeout(() => {
  //       setIsSnackbarOpen(true);
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   }
  // }, [deletedquote]);

  const delquote = (data) => {
    if (data) {
      setIsSnackbarOpen(true);

      if (id !== null) {
        onDelete(id);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setIsSnackbarOpen(!isSnackbarOpen);
  };

  const handleRemoveClick = () => {
    const deletingquotes = async () => {
      await deletequote(
        {
          url: BASE_URL + `delete/${id}`,
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
        delquote
      );
    };
    deletingquotes();
  };

  const dateString = expiry;
  const providedDate = new Date(dateString);
  let status = "";
  const currentDate = new Date();

  if (providedDate < currentDate) {
    status = "Expired";
  } else {
    status = "Active";
  }
  const handleCardClick = () => {
    // const selectedQuote = {
    //   ID: id,
    //   Name: title,
    //   ExpiryDate: expiry,
    //   TotalAmount: price,
    //   Files: files,
    //   Tables: tables,
    // };
    const selectedQuote = {
      id,
    };
    dispatch(setSelectedQuote(selectedQuote));
    navigate(`/custiv/quotation/edit/${id}`);
  };

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea
          onClick={handleCardClick}
          // component={RouterLink}
          // to={`/custiv/quotation/edit/${id}`}
        >
          <CardHeader
            title={title}
            action={
              <Chip
                label={status}
                variant="outlined"
                className={classes.chip}
              />
            }
          />
          <CardContent>
            <Typography variant="body" color="text.secondary">
              ₹ {price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <IconButton size="small" onClick={handleRemoveClick}>
            <RemoveCircleIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={`${title} deleted successfully`}
      ></Snackbar>
    </>
  );
}

export default Cardcomp;
