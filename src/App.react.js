import React, { useCallback, useEffect, useState } from "react";
import { fetchOrders } from "utils/api";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import OrdersList from "components/OrdersList.react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export default function App() {
  // Store the orders
  const [orders, setOrders] = useState([]);
  // Store the selected order
  const [selectedOrder, setSelectedOrder] = useState(null);
  const classes = useStyles();

  // Fetch them only once
  useEffect(() => {
    async function fetchData() {
      const result = await fetchOrders();
      setOrders(result.orders);
    }
    fetchData();
  }, []);

  const onSelectOrder = useCallback((order) => setSelectedOrder(order), []);

  return (
    <div className={classes.root}>
      <Typography variant="h3" gutterBottom>
        Órdenes
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Selecciona una orden de la lista para ver los productos
      </Typography>
      <OrdersList orders={orders} onSelectOrder={onSelectOrder} />
    </div>
  );
}
