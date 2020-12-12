import React, { useCallback, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function OrdersList({ orders, onSelectOrder }) {
  // To show the selected item in the list
  const [selectedId, setSelectedId] = useState(-1);

  const onSelect = useCallback(
    (order) => {
      setSelectedId(order.id);
      onSelectOrder(order);
    },
    [onSelectOrder]
  );

  return (
    <List>
      {orders.map((order) => (
        <ListItem
          key={order.id}
          button
          selected={selectedId === order.id}
          onClick={() => onSelect(order)}
        >
          <ListItemText
            primary={`Orden #${order.number}`}
            secondary={`Id: ${order.id}`}
          />
        </ListItem>
      ))}
    </List>
  );
}
