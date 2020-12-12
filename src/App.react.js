import React, { useCallback, useEffect, useState } from "react";
import { fetchOrders } from "utils/api";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import OrdersList from "components/OrdersList.react";
import OrderDetails from "components/OrderDetails.react";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  gridItem: {
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
  const onProductAdded = useCallback(
    (orderId, newProduct) => {
      // Create a new product list with the previous products and the new one
      const orderIndex = orders.findIndex((order) => order.id === orderId);
      if (orderId === -1) {
        return;
      }

      // Create a shallow copy of that order
      const orderCopy = { ...orders[orderIndex] };
      // Add the product at the front to see it more easily
      // Notice that I am never mutating
      orderCopy.items = [newProduct, ...orderCopy.items];

      // Recreate the orders
      setOrders([
        ...orders.slice(0, orderIndex),
        orderCopy,
        ...orders.slice(orderIndex + 1),
      ]);
      setSelectedOrder(orderCopy);
    },
    [orders]
  );

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid className={classes.gridItem} item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            Órdenes
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Selecciona una orden de la lista para ver los productos
          </Typography>
          <OrdersList orders={orders} onSelectOrder={onSelectOrder} />
        </Grid>
        <Grid className={classes.gridItem} item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            Detalles de la orden
          </Typography>
          <OrderDetails order={selectedOrder} onProductAdded={onProductAdded} />
        </Grid>
      </Grid>
    </div>
  );
}
