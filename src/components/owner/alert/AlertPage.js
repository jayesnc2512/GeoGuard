import React, { useState,useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@material-ui/core';

import SearchBar from './SearchBar';
import FilterMenu from './FilterMenu';
import ListItemComponent from './ListItemComponent';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Nav from '../../nav/Nav';
import { useAuthContext } from '../../../hooks/useAuthContext';



const useStyles = makeStyles((theme) => ({
  card: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    margin: '13px 0',
    boxShadow: theme.shadows[3],
    position: 'relative',
    width: '500px', // Set the desired width
    maxWidth: '100%', // Ensure the card doesn't exceed the screen width
    

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '4px',
      background: 'linear-gradient(to right, #2CB02A, #DBF1A4)',
    },
  },
  cardContent: {
    paddingBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FCF4EA',
    boxShadow: theme.shadows[3],
  },
  searchBarContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '4px',
    padding: '8px',

  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '40px',
    justifyContent: 'center',
    
  },
}));

const AlertPage = () => {
  const classes = useStyles();
  const { userData } = useAuthContext();
  const [cameras, setCameras] = useState([]);
  const [alerts, setAlerts] = useState();
  const [readAlerts, setReadAlerts] = useState([]);
  const [unreadAlerts, setUnreadAlerts] = useState([]);

  const [currentAlertCount, setCurrentAlertCount] = useState(0);
  const [CAlerts, setCAlerts] = useState({
    camera1: [
      {
        "id": 1,
        "message": "Displaced",
        "date": "2023-12-20",
        "time": "08:00 AM",
        "location": "City A",
      },
      // Add more camera1 alerts as needed
    ],
    camera2: [
      {
        "id": 2,
        "message": "Blackout",
        "date": "2023-12-21",
        "time": "12:30 PM",
        "location": "City B",
      },
      {
        "id": 3,
        "message": "Blackout",
        "date": "2023-14-21",
        "time": "12:50 PM",
        "location": "City B",
      },
      // Add more camera2 alerts as needed
    ],
    camera3: [
      // Add camera3 alerts as needed
    ],
  });
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [viewedAlert, setViewedAlert] = useState({ 
    camera1: [
      {
        "id": 3,
        "message": "Already Viewed Alert",
        "date": "2023-12-22",
        "time": "03:45 PM",
        "location": "City C",
      },
      // Add more camera1 viewed alerts as needed
    ],
    camera2: [
      // Add more camera2 viewed alerts as needed
    ],
    camera3: [
      // Add more camera3 viewed alerts as needed
    ],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCamera, setSelectedCamera] = useState('camera1');

  // const showAlert = (message) => {
  //   setCurrentAlertCount((prevCount) => prevCount + 1);
  //   setCAlerts((cAlerts) => ({
  //     ...cAlerts,
  //     [selectedCamera]: [
  //       ...cAlerts[selectedCamera],
  //       {
  //         "message": message,
  //         "id": currentAlertCount + 1,
  //         "date": "2023-12-25",
  //         "time": getCurrentTime(),
  //         "location": getRandomLocation(),
  //       },
  //     ],
  //   }));
  // };
  const cameraOptions = [
    { value: 'all', label: 'All Alerts' },
    ...cameras.map((cam) => {
      return { value: cam.camLid, label: cam.camName };
    })
  ];

  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
  };

  const handleClose = () => {
    setSelectedAlert(null);
  };

  const handleView = () => {
    if (selectedAlert) {
      setViewedAlert((prevViewedAlerts) => ({
        ...prevViewedAlerts,
        [selectedCamera]: [...prevViewedAlerts[selectedCamera], selectedAlert],
      }));
      setCAlerts((cAlerts) => ({
        ...cAlerts,
        [selectedCamera]: cAlerts[selectedCamera].filter((alert) => alert !== selectedAlert),
      }));
      setSelectedAlert(null);
    }
  };

  // const getCameras = (async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/camera/getCamByUserId/`, {
  //       method: 'GET',
  //       headers: {
  //         'token': userData.token,
  //         'userId': userData.user._id,
  //       },
  //     });
  //     if (response.ok) {
  //       const camerasList = await response?.json();
  //       console.log(camerasList.camByUser);
  //       const mappedCameras = await camerasList?.camByUser.map((cam) => ({
  //         userId: cam.userId,
  //         camLid: cam.licenseId,
  //         camName: cam.nickName,
  //         camLat: cam.location.lat,
  //         camLon:cam.location.lon
  //       }));
  //       setCameras(mappedCameras);
  //       console.log('cameras:', cameras);
  //     }
  //   } catch (err) {
  //     console.log("getCameras failed", err);
  //   }
  // })

  const getCameras = (async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/camera/getCamByUserId/`, {
        method: 'GET',
        headers: {
          'token': userData.token,
          'userId': userData.user._id,
        },
      });
      if (response.ok) {
        const camerasList = await response.json();
        //console.log(camerasList.camByUser);
        // setCameras(camerasList.camByUser);
        const mappedCameras = await camerasList.camByUser.map((cam) => ({
          userId: cam.userId,
          camLid: cam.licenseId,
          camName: cam.nickName,
          camLat: cam.location.lat,
          camLon: cam.location.lon
        }));
        setCameras(mappedCameras);
        console.log("mappedCam",mappedCameras)

      }
    } catch (err) {
      console.warn("getCameras failed", err);
    }
  })
  useEffect(() => {
    getCameras();
  }, []);

  const getAlerts = (async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/alert/alertById`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'token': userData.token,
          'userid': userData.user._id, // Replace with the actual user ID
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Alerts:', data);
        const formattedAlerts =await data.alerts?.map((alert) => {
          const dateObject = new Date(alert.createdAt);
          const formattedDate = dateObject.toISOString().split('T')[0]; // "yyyy-mm-dd"
          const formattedTime = dateObject.toISOString().split('T')[1].split('.')[0]; // "hh:mm:ss"
          const camName = cameras?.find((cam) => cam.camLid === alert.camLid)?.camName;
          const camLat = cameras?.find((cam) => cam.camLid === alert.camLid)?.camLat;
          const camLon = cameras?.find((cam) => cam.camLid === alert.camLid)?.camLon;

          return {
            ...alert,
            camName,
            camLat,
            camLon,
            formattedDate,
            formattedTime,
          };
        });
        await setAlerts(formattedAlerts);
        console.log(formattedAlerts);
        const unreadAlerts = formattedAlerts.filter((alert) => !alert.read);
        // Update the readAlerts state with unread alerts
        setUnreadAlerts(unreadAlerts);

        const readAlerts = formattedAlerts.filter((alert) => alert.read);
        // Update the readAlerts state with unread alerts
        setReadAlerts(readAlerts);
      } else {
        const errorData = await response.json();
        console.error('Error fetching alerts:', errorData.message);
        alert(errorData.message);
      }
    } catch (err) {
      console.log("get Alerts failed",err)
    }
  })
  useEffect(() => {
    getAlerts();
  }, [cameras]);
 
  const updateRead = (async (msgId,read_status) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/alert/readStatus`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'token': userData.token,
        },
        body: JSON.stringify({
          'msgid': msgId,
        })
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        getAlerts();
        handleClose();
      }
    } catch (err) {
      console.log('error in read status', err);
    }
})

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (selectedCamera) => {
    setSelectedCamera(selectedCamera);
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <Nav /> */}
      <div className={classes.searchBarContainer}>
        <Typography variant="h4" style={{ marginRight: '15px' }}>
          {selectedCamera.camName}
        </Typography>
        <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />
        <IconButton
          edge="end"
          aria-label="filter"
          onClick={handleFilterIconClick}
          style={{ marginTop: '-4px' }}
        >
          <FilterAltIcon fontSize="large" />
        </IconButton>
        {/* <FilterMenu
          anchorEl={anchorEl}
          handleFilterClose={handleFilterClose}
          handleFilterChange={handleFilterChange}
          cameraOptions={cameraOptions}
        /> */}
      </div>
      <div className={classes.cardContainer}>
      <Card className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Typography variant="h5">Alerts ({unreadAlerts.length})</Typography>
          {/* <Button onClick={() => showAlert('New Alert')}>Show Alert</Button> */}
        </CardContent>
        <List>
          {unreadAlerts?.map((alert, index) => (
            <ListItemComponent
              key={index}
              alert={alert}
              handleAlertClick={handleAlertClick}
              classes={classes}
            />
          ))}
        </List>
      </Card>

      <Card className={classes.card} variant="outlined">
        <CardContent className={classes.cardContent}>
          <Typography variant="h5">Viewed Alerts</Typography>
        </CardContent>
        <List>
          {readAlerts.map((alert, index) => (
            <ListItemComponent
              key={index}
              alert={alert}
              handleAlertClick={handleAlertClick}
              classes={classes}
            />
          ))}
        </List>
      </Card>
      </div>

      <Dialog open={Boolean(selectedAlert)} onClose={handleClose}>
        <DialogTitle>Alert Details</DialogTitle>
        <DialogContent>
          {selectedAlert && (
            <div>
              <Typography variant="h6">Message:</Typography>
              <Typography>{`Alert ${selectedAlert.msgId}:`} </Typography>
              <Typography>{selectedAlert.message}</Typography>
              <Typography variant="h6">Camera:</Typography>
              <Typography>{selectedAlert.camName}</Typography>
              <Typography variant="h6">Camera Lid:</Typography>
              <Typography>{selectedAlert.camLid}</Typography>
              <Typography variant="h6">Date:</Typography>
              <Typography>{selectedAlert.formattedDate}</Typography>
              <Typography variant="h6">Time:</Typography>
              <Typography>{selectedAlert.formattedTime}</Typography>
              <Typography variant="h6">Location:</Typography>
              <Typography>{selectedAlert.camLat},{selectedAlert.camLon}</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {viewedAlert[selectedCamera].includes(selectedAlert) && (
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          )}
          {!viewedAlert[selectedCamera].includes(selectedAlert) && (
            <>
              <Button onClick={handleClose}>View Later</Button>
              <Button onClick={()=>updateRead(selectedAlert.msgId,selectedAlert.read)}>Mark As Viewed</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AlertPage;
