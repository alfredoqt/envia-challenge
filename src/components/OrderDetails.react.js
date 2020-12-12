import React, { useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import useBoolean from "hooks/useBoolean";
import NewProductDialog from "components/NewProductDialog.react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  button: {
    marginBottom: theme.spacing(1),
  },
}));

export default function OrderDetails({ order, onProductAdded }) {
  const {
    value: openDialog,
    setFalse: setOpenDialogFalse,
    setTrue: setOpenDialogTrue,
  } = useBoolean(false);
  const {
    value: openSnackbar,
    setFalse: setOpenSnackbarFalse,
    setTrue: setOpenSnackbarTrue,
  } = useBoolean(false);
  const classes = useStyles();
  const onProductSaved = useCallback(
    (product) => {
      // Handle null and undefined
      if (order != null) {
        setOpenDialogFalse();
        onProductAdded(order.id, product);
      }
    },
    [onProductAdded, order, setOpenDialogFalse]
  );
  // I'm not using === to handle both undefined and null
  if (order == null) {
    return (
      <Typography variant="subtitle1" gutterBottom>
        No hay ninguna orden seleccionada
      </Typography>
    );
  }

  return (
    <>
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={setOpenDialogTrue}
        >
          Añadir nuevo producto
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={setOpenSnackbarTrue}
        >
          Pagar
        </Button>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={setOpenSnackbarFalse}
          message="Orden pagada"
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={setOpenSnackbarFalse}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
        <Typography variant="h6" gutterBottom>
          Productos
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SKU</TableCell>
                <TableCell align="right">Nombre</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.items.map((product) => (
                <TableRow key={product.id}>
                  <TableCell component="th" scope="row">
                    {product.sku}
                  </TableCell>
                  <TableCell align="right">{product.name}</TableCell>
                  <TableCell align="right">{product.quantity}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <NewProductDialog
        open={openDialog}
        onClose={setOpenDialogFalse}
        onSave={onProductSaved}
      />
    </>
  );
}
