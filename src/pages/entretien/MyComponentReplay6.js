import React, { useEffect ,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { ShowEntretiensApi ,updateEntretienStatus} from "../../redux/actions/entretien/entretienActions";
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
import { education } from '../../redux/Axios/education';
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

const MyComponentReplay = ({ ShowEntretiensApi }) => {

  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)
  const classes = useStyles();
  const token = useSelector(state => state.token);
   const entretiens = useSelector(state => state.entretiens);
   //education = useSelector(state => state.education);

 /* const educations = useSelector((state) => {
    console.log(state); // Inspectez la structure de votre état global ici
    return state.educations; // Ajustez cette ligne si nécessaire
  }); */
  const entretienStatus = useSelector(state => state.entretienStatus);
console.log(entretiens)
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
    ShowEntretiensApi(token);
    console.log("I rendered because of refresh or start");
  }, [token,callback]);



  console.log(entretiens,"hello evenyt")

  const handleStatusChange = async (id, isActive) => {
    try {
      if (isActive) {
        // Vérifier s'il y a déjà un audiovisuel actif
        const activeEntretiens = entretiens.filter(entretien => entretien.isActive);
        if (activeEntretiens.length > 0) {
          alert("Un autre entretien est déjà actif. Veuillez désactiver l'autre avant d'activer celui-ci.");
          return;
        }
  
        // Désactiver tous les autres educations avant d'activer le nouveau
        await Promise.all(
          entretiens.filter(entretien => entretien._id !== id && entretien.isActive)
            .map(entretien => dispatch(updateEntretienStatus(entretien._id, false)))
        );
      }
  
      // Activer ou désactiver l'education actuel
      await dispatch(updateEntretienStatus(id, isActive));
  
      // Forcer le rafraîchissement de la liste des educations
      setCallback(prev => !prev);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de l'entreteien :", error);
    }
  };
  
  const handleDelete2 = async (entretien, id) => {
    entretien.stopPropagation();
  
    try {
      if (entretiens._id !== id) {
        if (window.confirm("Are you sure you want to delete this Entretien?")) {
          setLoading(true);
          await axios.delete(`http://localhost:5000/api/entretiens/${id}/delete`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
          
          // Navigate after deletion
          navigate('/inv/MyComponentReplay6');
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
        to="/inv/addEntretien"
        color="primary"
        className={classes.addButton}
      >
        Ajouter Entretien
        <AddIcon />
      </IconButton>
      <List>
  {entretiens.map((entretien) => (
    <ListItem
      key={entretien._id}
      className={classes.listItem}
      button
      disableRipple
      component={Link}
      to={'/inv/AppNavbarEntretien'}
    >
      <ListItemText
        primary={entretien.title}
        secondary={
          <>
            <span>{entretien.type}</span><br />
            <span>{entretien.describe}</span><br/>
          </>
        }
      />
      <img src={entretien.imageUrl} alt="Entretien Icon" className={classes.image} />
      
      <div onClick={(e) => e.stopPropagation()}>
        {user.role === 1 && (
      <FormControlLabel
      control={
        <Switch
          checked={entretien.isActive}
          onChange={() => handleStatusChange(entretien.id, !entretien.isActive)}
          color="primary"
        />
      }
      label={
        <span style={{ color: entretien.isActive ? 'green' : 'red' }}>
          {entretien.isActive ? 'Active' : 'Inactive'}
        </span>
      }
      labelPlacement="start"
    />
        )}
      </div>
      
      {user.role === 1 && (
        <IconButton component={Link} to={`/inv/UpdateEntretien/${entretien.id}`}>
          <EditIcon />
        </IconButton>
      )}
      {user.role === 1 && (
        <IconButton onClick={(e) => handleDelete2(e, entretien.id)}>
          <DeleteIcon />
        </IconButton>
      )}
    </ListItem>
  ))}
</List>
    </div>
  );
};

export default connect(null, { ShowEntretiensApi })(MyComponentReplay);
