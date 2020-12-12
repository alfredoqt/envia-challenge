import React from "react";
import Typography from "@material-ui/core/Typography";

export default function OrderDetails({ order, onProductAdded }) {
  // I'm not using === to handle both undefined and null
  if (order == null) {
    <Typography variant="subtitle1" gutterBottom>
      No hay ninguna orden seleccionada
    </Typography>;
  }
  return <div />;
}
