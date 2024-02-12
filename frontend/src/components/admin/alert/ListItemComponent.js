import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ListItemComponent = ({ alert, handleAlertClick, classes }) => {
  return (
    <ListItem key={alert.id} button onClick={() => handleAlertClick(alert)} className={classes.listItem}>
      <ListItemText
        primary={`Alert ${alert.msgId}: ${alert.message}`}
        secondary={`Date: ${alert.formattedDate} | Time: ${alert.formattedTime} | Location: ${alert.camLat},${alert.camLon}`}
      />
    </ListItem>
  );
};

export default ListItemComponent;