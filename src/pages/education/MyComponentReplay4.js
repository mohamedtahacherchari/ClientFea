import React, { useEffect ,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { ShowEducationsApi ,updateEducationStatus} from "../../redux/actions/education/educationsAction";
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

const MyComponentReplay = ({ ShowEducationsApi }) => {

  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)
  const classes = useStyles();
  const token = useSelector(state => state.token);
   const educations = useSelector(state => state.educations);
   //education = useSelector(state => state.education);

 /* const educations = useSelector((state) => {
    console.log(state); // Inspectez la structure de votre état global ici
    return state.educations; // Ajustez cette ligne si nécessaire
  }); */
  const educationStatus = useSelector(state => state.educationStatus);
console.log(educations)
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
    ShowEducationsApi(token);
    console.log("I rendered because of refresh or start");
  }, [token,callback]);



  console.log(educations,"hello evenyt")

  const handleStatusChange = async (id, isActive) => {
    try {
      if (isActive) {
        // Vérifier s'il y a déjà un audiovisuel actif
        const activeEducations = educations.filter(education => education.isActive);
        if (activeEducations.length > 0) {
          alert("Un autre education est déjà actif. Veuillez désactiver l'autre avant d'activer celui-ci.");
          return;
        }
  
        // Désactiver tous les autres educations avant d'activer le nouveau
        await Promise.all(
          educations.filter(education => education._id !== id && education.isActive)
            .map(education => dispatch(updateEducationStatus(education._id, false)))
        );
      }
  
      // Activer ou désactiver l'education actuel
      await dispatch(updateEducationStatus(id, isActive));
  
      // Forcer le rafraîchissement de la liste des educations
      setCallback(prev => !prev);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de l'education :", error);
    }
  };
  
  const handleDelete2 = async (audiovisuel, id) => {
    //audiovisuel.stopPropagation();
  
    try {
      if (educations._id !== id) {
        if (window.confirm("Are you sure you want to delete this Audiovisuel?")) {
          setLoading(true);
          await axios.delete(`http://localhost:5000/api/educations/${id}/delete`, {
            headers: { Authorization: token },
          });
          setLoading(false);
          setCallback(!callback);
          
          // Navigate after deletion
          navigate('/inv/MyComponentReplay4');
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
        to="/addEducation"
        color="primary"
        className={classes.addButton}
      >
        Ajouter Education
        <AddIcon />
      </IconButton>
      <List>
  {educations.map((education) => (
    <ListItem
      key={education._id}
      className={classes.listItem}
      button
      disableRipple
      component={Link}
      to={'/AppNavbarEducation'}
    >
      <ListItemText
        primary={education.title}
        secondary={
          <>
            <span>{education.type}</span><br />
            <span>{education.describe}</span><br/>
          </>
        }
      />
      <img src={education.imageUrl} alt="Education Icon" className={classes.image} />
      
      <div onClick={(e) => e.stopPropagation()}>
        {user.role === 1 && (
      <FormControlLabel
      control={
        <Switch
          checked={education.isActive}
          onChange={() => handleStatusChange(education.id, !education.isActive)}
          color="primary"
        />
      }
      label={
        <span style={{ color: education.isActive ? 'green' : 'red' }}>
          {education.isActive ? 'Active' : 'Inactive'}
        </span>
      }
      labelPlacement="start"
    />
        )}
      </div>
      
      {user.role === 1 && (
        <IconButton component={Link} to={`/UpdateEducation/${education.id}`}>
          <EditIcon />
        </IconButton>
      )}
      {user.role === 1 && (
        <IconButton onClick={(e) => handleDelete2(e, education.id)}>
          <DeleteIcon />
        </IconButton>
      )}
    </ListItem>
  ))}
</List>
    </div>
  );
};

export default connect(null, { ShowEducationsApi })(MyComponentReplay);
