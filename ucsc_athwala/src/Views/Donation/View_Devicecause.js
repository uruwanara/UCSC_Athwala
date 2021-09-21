import React ,{useState,useEffect} from 'react';
import './Donation.css';
import Device from '../../image/device.jpg';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import {DeviceDoneeDetails,Description} from './View_Casues';
import { useLocation } from 'react-router';
import axios from "axios";
import ContactForm from './contactForm';
import {useSnackbar} from "notistack";
import {useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      }, flex1: {
        flexGrow: 1,
      },
      toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
      title:{
        color:"#546e7a",
        marginTop:10,
        marginBottom:20,
        fontFamily:"Poppins, sans-serif",
        marginTop:'40px',
        marginBottom:'30px'
      },

      card:{
        backgroundColor:"white",
        border:"none",
        boxShadow:"none"
      },

      labelname: {
          marginLeft:40,
          marginBottom:10,
          color:"000000",
          fontFamily:"Poppins, sans-serif",
          width:"150px"
      },

      labelvalue:{
        marginLeft:100,
        marginBottom:10,
        color:"000000",
        fontFamily:"Poppins, sans-serif",
        width:"200px"
      },

      contactbtn:{
          textTransform:"none",
          fontFamily:"Poppins, sans-serif",
      }
  
  }));

export default function View_Clothcause(){
    const classes = useStyles();
    const history = useHistory();
    const [description,setDescription] = useState();
    const [title,setTitle] = useState();
    const [brand, setBrand] = React.useState();
    const [model, setModel] = React.useState();
    const [date, setDate] = React.useState();
    const [requestStudentid,setRequestStudentid] = useState();
    const search = useLocation().search;
    const [open, setOpen] = React.useState(false);
    const [status, setStatus] = useState();

    const donationid = new URLSearchParams(search).get("id");
    const userData=JSON.parse(localStorage.getItem("userData"));
    const {enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        
        fetchDescription(donationid);
        fetchDetails(donationid);
    },[]);

    const fetchDescription = (donationid) => {
        const description={
            "donationID": donationid,
        }
        axios.post("http://localhost:5000/api/donations/select",description,{
            headers:{
                "access-control-allow-origin" : "*",
                "Content-type": "application/json; charset=UTF-8"
              }
            }).then((response) => {
                console.log(response.data);
                setDescription(response.data[0].description);
                setTitle(response.data[0].title);
                setRequestStudentid(response.data[0].student_id);
            })
    };

    const fetchDetails = (donationid) => {
        const details={
            "donationID": donationid,
            "type":'device'
        }
        axios.post("http://localhost:5000/api/donations/view",details,{
            headers:{
                "access-control-allow-origin" : "*",
                "Content-type": "application/json; charset=UTF-8"
              }
            }).then((response) => {
                console.log(response.data);
                setModel(response.data[0].model);
                setBrand(response.data[0].brand);
                setDate(response.data[0].before_date);
                setStatus(response.data[0].status);
            })
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        setOpen(false);
        const deletedonation={
            "donationID": donationid,
        }
        axios.post("http://localhost:5000/api/donations/delete",deletedonation,{
      headers:{
          "access-control-allow-origin" : "*",
          "Content-type": "application/json; charset=UTF-8"
        }
      }).then((response) => {
          if(response.data === 'success'){
            console.log("ddddddd");
            enqueueSnackbar('Successfully Deleted', {
              variant: 'success', anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'center',
              }
            })

            if(userData.userType === "STUDENT"){
              history.push("/std/viewMyrequest") ;
            }
            else if(userData.userType === "UNIONST" ){
              history.push("/ustd/viewMyrequest");
            }

          }
  });
}
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    return(
        <div>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Card className={classes.card}>
                                <CardMedia
                                    component="img"
                                    height="250"
                                    src= {Device}
                                />   
                            </Card>
                        </Grid>
                        <Description description={description} title={title}/>
                    </Grid>
                    

                    <Grid container spacing={2} >
                        <DeviceDoneeDetails model={model} brand={brand} date={date} requestStudentid={requestStudentid} 
                        userId = {userData.id}
                        status={status} 
                        open={open}
                        userType={userData.userType}
                        handleSubmit={handleSubmit}  
                        handleClickOpen={handleClickOpen} 
                        handleClose={handleClose}/>

                        <Grid item xs={6}>
                        <Card className={classes.card}>
                                <CardContent>
                                    <div>
                                        <Typography variant="h5" className={classes.title}>
                                        Donate Now
                                    </Typography>
                                    </div>
                                    <div>
                                    <Typography variant="subtitle2" className={classes.title}>
                                       You can cotact donee to donate
                                    </Typography>

                                    <ContactForm donationID={donationid} type='device'/>
                                    
                                    </div>
                                </CardContent>   
                            </Card>
                            
                        </Grid>
                    </Grid>
        </div>
    );
}