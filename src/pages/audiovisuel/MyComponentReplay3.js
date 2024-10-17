import React, { useEffect ,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { ShowAudiovisuelsApi ,updateAudiovisuelStatus} from "../../redux/actions/audiovisuel/audiovisuelsAction";
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import axios from 'axios'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useNavigate } from "react-router-dom"
import AddIcon from '@material-ui/icons/Add'; // Import Add icon
import { useDispatch } from 'react-redux';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

const MyComponentReplay = ({ ShowAudiovisuelsApi }) => {

  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)
  const classes = useStyles();
  const token = useSelector(state => state.token);
  const audiovisuels = useSelector(state => state.audiovisuels);
  const audiovisuelStatus = useSelector(state => state.audiovisuelStatus);
console.log(audiovisuelStatus)
  const auth = useSelector(state => state.auth)
  const {user} = auth
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const navigate =  useNavigate();
   // Ajoutez cet useEffect pour gérer le rafraîchissement au montage du composant
   useEffect(() => {
    const hasRefreshed = localStorage.getItem('hasRefreshed');
    if (!hasRefreshed) {
      localStorage.setItem('hasRefreshed', 'true');
      window.location.reload();
    }
  }, []); // Ce useEffect ne se déclenche qu'une seule fois, lors du premier rendu

  // Ajoutez un effet pour nettoyer l'indicateur de rafraîchissement
  useEffect(() => {
    return () => {
      localStorage.removeItem('hasRefreshed');
    };
  }, []);
  useEffect(() => {
    ShowAudiovisuelsApi(token);
    console.log("I rendered because of refresh or start");
  }, [token,callback]);



  console.log(audiovisuels,"hello evenyt")

  const handleStatusChange = async (id, isActive) => {
    try {
      if (isActive) {
        // Vérifier s'il y a déjà un audiovisuel actif
        const activeAudiovisuels = audiovisuels.filter(audiovisuel => audiovisuel.isActive);
        if (activeAudiovisuels.length > 0) {
          alert("Un autre audiovisuel est déjà actif. Veuillez désactiver l'autre avant d'activer celui-ci.");
          return;
        }
  
        // Désactiver tous les autres audiovisuels avant d'activer le nouveau
        await Promise.all(
          audiovisuels.filter(audiovisuel => audiovisuel._id !== id && audiovisuel.isActive)
            .map(audiovisuel => dispatch(updateAudiovisuelStatus(audiovisuel._id, false)))
        );
      }
  
      // Activer ou désactiver l'audiovisuel actuel
      await dispatch(updateAudiovisuelStatus(id, isActive));
  
      // Forcer le rafraîchissement de la liste des audiovisuels
      setCallback(prev => !prev);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de l'audiovisuel :", error);
    }
  };
  
  const handleDelete2 = async (audiovisuel, id) => {
    //audiovisuel.stopPropagation();
  
    try {
      if (audiovisuels._id !== id) {
        if (window.confirm("Are you sure you want to delete this Audiovisuel?")) {
          setLoading(true);
          await axios.delete(`http://localhost:5000/api/audiovisuels/${id}/delete`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
          
          // Navigate after deletion
          navigate('/inv/MyComponentReplay3');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className={classes.root}>
    <IconButton
        component={Link}
        to="/inv/AddAudiovisuel"
        color="primary"
        className={classes.addButton}
      >
        Ajouter Audiovisuel
        <AddIcon />
      </IconButton>
      <List>
  {audiovisuels.map((audiovisuel) => (
    <ListItem
      key={audiovisuel._id}
      className={classes.listItem}
      button
      disableRipple
      component={Link}
      to={'/inv/AppNavbar'}
    >
      <ListItemText
        primary={audiovisuel.title}
        secondary={
          <>
            <span>{audiovisuel.type}</span><br />
            <span>{audiovisuel.describe}</span><br/>
          </>
        }
      />
      <img src={audiovisuel.imageUrl} alt="Audiovisuel Icon" className={classes.image} />
      
      <div onClick={(e) => e.stopPropagation()}>
        {user.role === 1 && (
      <FormControlLabel
      control={
        <Switch
          checked={audiovisuel.isActive}
          onChange={() => handleStatusChange(audiovisuel.id, !audiovisuel.isActive)}
          color="primary"
        />
      }
      label={
        <span style={{ color: audiovisuel.isActive ? 'green' : 'red' }}>
          {audiovisuel.isActive ? 'Active' : 'Inactive'}
        </span>
      }
      labelPlacement="start"
    />
        )}
      </div>
      
      {user.role === 1 && (
        <IconButton component={Link} to={`/inv/UpdateAudiovisuel/${audiovisuel.id}`}>
          <EditIcon />
        </IconButton>
      )}
      {user.role === 1 && (
        <IconButton onClick={(e) => handleDelete2(e, audiovisuel.id)}>
          <DeleteIcon />
        </IconButton>
      )}
    </ListItem>
  ))}
</List>
    </div>
  );
};

export default connect(null, { ShowAudiovisuelsApi })(MyComponentReplay);
