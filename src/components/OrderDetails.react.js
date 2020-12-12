import React from "react";
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

const useStyles = makeStyles((theme) => ({
  addProductButton: {
    marginBottom: theme.spacing(1),
  },
}));

export default function OrderDetails({ order, onProductAdded }) {
  const classes = useStyles();
  // I'm not using === to handle both undefined and null
  if (order == null) {
    return (
      <Typography variant="subtitle1" gutterBottom>
        No hay ninguna orden seleccionada
      </Typography>
    );
  }
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.addProductButton}
      >
        Añadir nuevo producto
      </Button>
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
  );
}
