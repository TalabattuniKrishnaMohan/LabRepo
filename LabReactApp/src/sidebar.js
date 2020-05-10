import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import "./materialicon.css";
import MaterialTable from "material-table";
import Button from '@material-ui/core/Button';

const drawerWidth = 300;
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    display: "flex"
  },
  toolbar: {
    minHeight: 50,
    paddingRight: 5 
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 10
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(4),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(0)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  
  tablesize: {
    height: "100vh",
    width:'300vh',
    paddingTop:'50px'
  }
 
}));

 export const Sidebar = () => {

  // ********************* for styles **************************
  const classes = useStyles();

  // ********************* default sidebar open ****************
  const [open, setOpen] = React.useState(true);

  // ********************* to manage states ********************
  const [states, setstates] = React.useState('');
  const [statesLst, setstatesLst] = React.useState([]);
  const [Districts, setDistricts] = React.useState('');
  const [DistrictsLst, setDistrictsLst] = React.useState([]);
  const [thistableData, setThistableData] = React.useState([]);

 // ********************* for on load fetch ********************
  React.useEffect(() => {
    fetch('http://localhost:8080/lab/getAllCitiesData', {
      method: 'GET', 
      headers: { 'Content-Type': 'application/json','district':'','states':''}
     }).then(results => results.json())
      .then(data => {
        setThistableData(data.citiesDao);
        setstatesLst(data.states);
       
      });
  },[]);
 
  // ********************* for onchange state change **********************
  const handlestateChange = (event) => {
    setstates(event.target.value);
    fetch('http://localhost:8080/lab/getAllCitiesData', {
      method: 'GET', 
      headers: { 'Content-Type': 'application/json','district':'','states':event.target.value}
    }).then(results => results.json())
      .then(data => {
       setDistrictsLst(data.states);
      });
  };

  // ********************* for Reset click *****************************
  const handleReset = () => {
   setstates('');
   setDistricts('');
   setDistrictsLst([]);
   fetch('http://localhost:8080/lab/getAllCitiesData', {
      method: 'GET', 
      headers: { 'Content-Type': 'application/json','district':'','states':''}
    }).then(results => results.json())
      .then(data => {setThistableData(data.citiesDao);});
  };

  // ********************* for onClick search change **********************
  const handleSearch = () => {

    fetch('http://localhost:8080/lab/getAllCitiesData', {
      method: 'GET', 
      headers: { 'Content-Type': 'application/json','district':Districts,"states":''}
    }).then(results => results.json())
      .then(data => {
        setThistableData(data.citiesDao);
      });
  };
  
  // ********************* for onChange district change **********************
  const handleDistrictChange = (event) => {
    setDistricts(event.target.value);
  };

  // ********************* for handle drawer change **************************
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // ********************* for table columns management ***********************
  const columns = [
    {title: "City Name",field: "cityNames" },
    { title: "RTO CODE", field: "rtoCode" },
    { title: "Popullation", field: "population" },
    { title: "No of Villages", field: "villageCount" },
   ];

return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)} >
          <Toolbar className={classes.toolbar}>
            <IconButton edge="start" color="inherit" aria-label="open drawer"
              onClick={handleDrawerOpen} className={clsx(classes.menuButton,open && classes.menuButtonHidden)}>
            <ChevronLeftIcon /></IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title} >
              Lab Application
            </Typography>
          </Toolbar>
         </AppBar>
         < Drawer variant="permanent" classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
          }} open={open} >
         <div className={classes.toolbarIcon}> <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <div className={classes.sidebar}>
          <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">States</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={states} onChange={handlestateChange}>
            { statesLst.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>) }
        </Select>
      </FormControl>
      <br/>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Districts</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={Districts} onChange={handleDistrictChange}>
          { DistrictsLst.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>) }
        </Select>
      </FormControl>
      <br/><br/>
      <Button variant="contained" onClick= {handleReset}> Reset </Button>
       &nbsp;&nbsp;
       <Button variant="contained" color="primary" onClick= {handleSearch}> Search </Button>
      </div>
      </Drawer>
        <div className={classes.tablesize}>
            <MaterialTable className={classes.tablesize}
                title=""
                columns={columns}
                data={thistableData}
                maxWidth='100'
                options={{
                    pageSize:8,
                    pageSizeOptions: [2, 4, 8]
                }}/>
            </div>    
    </div>
    );
  }

