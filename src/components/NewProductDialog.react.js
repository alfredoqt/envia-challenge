import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// Generate an ID for the product saved
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  paper: {
    minWidth: 768,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  field: {
    marginBottom: 16,
  },
});

export default function NewProductDialog({ open, onClose, onSave }) {
  const classes = useStyles();
  const [fields, setFields] = useState({
    sku: "",
    name: "",
    quantity: "",
    price: "",
  });
  const [fieldErrors, setFieldErrors] = useState({
    sku: null,
    name: null,
    quantity: null,
    price: null,
  });

  const handleFormOnSubmit = useCallback(() => {
    let errors = {
      sku: null,
      name: null,
      quantity: null,
      price: null,
    };

    if (validator.isEmpty(fields.sku)) {
      errors = { ...errors, sku: "No debe estar vacío" };
    }

    if (validator.isEmpty(fields.name)) {
      errors = { ...errors, name: "No debe estar vacío" };
    }

    if (validator.isEmpty(fields.quantity)) {
      errors = { ...errors, quantity: "No debe estar vacío" };
    }

    if (!validator.isInt(fields.quantity, { min: 0 })) {
      errors = { ...errors, quantity: "Debe ser un entero" };
    }

    if (validator.isEmpty(fields.price)) {
      errors = { ...errors, price: "No debe estar vacío" };
    }

    if (!validator.isNumeric(fields.price)) {
      errors = { ...errors, price: "Debe ser un número" };
    }

    setFieldErrors(errors);

    const noNullErrors = Object.keys(errors).reduce((acc, current) => {
      if (errors[current] == null) {
        return acc;
      }
      acc[current] = errors[current];
      return acc;
    }, {});

    if (Object.keys(noNullErrors).length !== 0) {
      return;
    }

    onSave({
      id: uuidv4(),
      sku: fields.sku,
      name: fields.name,
      quantity: fields.quantity,
      price: fields.price,
    });
  }, [fields.sku, fields.name, fields.quantity, fields.price, onSave]);

  return (
    <Dialog
      classes={{ paper: classes.paper }}
      open={open}
      onClose={onClose}
      aria-labelledby="create-game-dialog"
    >
      <DialogTitle id="create-game-dialog">Create a Game</DialogTitle>
      <DialogContent>
        <div className={classes.form}>
          <TextField
            fullWidth
            className={classes.field}
            label="SKU"
            value={fields.sku}
            onChange={(e) => setFields({ ...fields, sku: e.target.value })}
            error={fieldErrors.sku != null}
            helperText={fieldErrors.sku}
          />
          <TextField
            fullWidth
            className={classes.field}
            label="Nombre"
            value={fields.name}
            onChange={(e) => setFields({ ...fields, name: e.target.value })}
            error={fieldErrors.name != null}
            helperText={fieldErrors.name}
          />
          <TextField
            fullWidth
            className={classes.field}
            label="Cantidad"
            value={fields.quantity}
            onChange={(e) => setFields({ ...fields, quantity: e.target.value })}
            error={fieldErrors.quantity != null}
            helperText={fieldErrors.quantity}
          />
          <TextField
            fullWidth
            className={classes.field}
            label="Precio"
            value={fields.price}
            onChange={(e) => setFields({ ...fields, price: e.target.value })}
            error={fieldErrors.price != null}
            helperText={fieldErrors.price}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleFormOnSubmit} color="primary">
          Añadir producto
        </Button>
      </DialogActions>
    </Dialog>
  );
}
