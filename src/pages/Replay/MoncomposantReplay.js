import React, { useEffect ,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { ShowEventsApi } from "../../redux/actions/event";
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import VideoIcon from '@material-ui/icons/VideoLibrary'; // Import video icon from material-ui
import axios from 'axios'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams, useNavigate } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 100, // Modifier la largeur de l'image
    height: 100, // Modifier la hauteur de l'image
  },
}));

const MyComponentReplay = ({ ShowEventsApi }) => {

  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)
  const classes = useStyles();
  const token = useSelector(state => state.token);
  const events = useSelector(state => state.events);
  const auth = useSelector(state => state.auth)
  const {user} = auth
  const [data, setData] = useState(null);
  const navigate =  useNavigate();
  useEffect(() => {
    ShowEventsApi(token);
    console.log("I rendered because of refresh or start");
  }, [token]);


  const getDirectImageUrl = (driveLink) => {
    const fileId = driveLink.match(/\/d\/(.+?)\//)[1];
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }
  console.log(events,"hello evenyt")

  const handleDelete2 = async (event, id) => {
   // event.stopPropagation();
  
    try {
      if (events._id !== id) {
        if (window.confirm("Are you sure you want to delete this event?")) {
          setLoading(true);
          await axios.delete(`http://localhost:5000/api/events/${id}/delete`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
          
          // Navigate after deletion
          navigate('/inv/MyComponentReplay');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={classes.root}>
    <span className="navbar-brand mb-0 h2">
        <Link className="nav-link pe-0" to={"/events/add"}>Ajouter un évènement</Link>
  </span>
      <List>
        {events.map((event, index) => (
          
          <ListItem
            key={event._id}
            className={classes.listItem}
            button
            disableRipple
            component={Link}
            to={`/inv/event/${event.id}`}
          >
            <ListItemText
              primary={event.title}
              secondary={
                <React.Fragment>
                  <span>{event.type}</span><br />
                  <span>{event.describe}</span><br/>
                </React.Fragment>
              }
            />
          <img src={event.imageUrl} alt="Event Icon" className={classes.image} />
          {/* Ajoutez le console.log ici */}
          {console.log("URL de l'image transformée :", event.imageUrl)}
          {user.role == 1 && <IconButton component={Link} to={`/inv/event/${event.id}/update`}>
            <EditIcon />
          </IconButton>}
  {user.role == 1 && <IconButton onClick={(e) => handleDelete2(e,event.id)}>
    <DeleteIcon />
  </IconButton>}
          </ListItem>
        )) }
      </List>
    </div>
  );
};

export default connect(null, { ShowEventsApi })(MyComponentReplay);
