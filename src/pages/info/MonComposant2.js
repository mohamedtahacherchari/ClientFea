import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import axios from 'axios';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Icon1 from '@material-ui/icons/AccessAlarm'; // Remplacez Icon1 par le nom de votre première icône
import Icon2 from '@material-ui/icons/AccessTime'; // Remplacez Icon2 par le nom de votre deuxième icône
import Icon3 from '@material-ui/icons/AccountCircle'; // Remplacez Icon3 par le nom de votre troisième icône
import OrganigrammeEFAIcon from './OrganigrammeEFAIcon'; // Chemin vers votre icône Organigramme EFA
import EFAResIcon from './EFAResIcon'; // Chemin vers votre icône Organigramme EFA
import SeminaireIcon from './SeminaireIcon';
import EFAliv from './EFAliv';
import { ShowInfosApi,deleteInfoApi} from "../../redux/actions/info";
import PodcastIcon from './PodcastIcon';
import { useSelector } from 'react-redux';
import ChallengeIcon from './ChallengeIcon';
import NewsIcon from './NewsIcon';
import EquipeIcon from './EquipeIcon';
import Moderation from './Moderation';
import ContactIcon from './ContactIcon';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useNavigate } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%', // Prend toute la largeur disponible
    backgroundColor: theme.palette.background.paper,
    margin: 'auto',
    marginTop: theme.spacing(2),
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%', // Prend toute la largeur disponible
  },
  image: {
    width: 100, // Modifier la largeur de l'image
    height: 100, // Modifier la hauteur de l'image
  },
}));

const MyComponent = ({ open, handleClose,ShowInfosApi ,deleteInfoApi ,info,renderStatus, rerender}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [callback, setCallback] = useState(false)
  const token = useSelector(state => state.token);
  const infos = useSelector(state => state.infos);
  const auth = useSelector(state => state.auth)
  const navigate =  useNavigate();

  const {user} = auth
  useEffect(() => {
    ShowInfosApi(token);
    console.log("I rendered because of refresh or start");
  }, [token]);

  const handleDelete =async () => {
    await deleteInfoApi(info.id,token);
    rerender(!renderStatus)
  }
  const handleDelete2 = async (id) => {
    try {
        if(infos._id !== id){
            if(window.confirm("Are you sure you want to delete this facture?")){
               setLoading(true)
                await axios.delete(`http://localhost:5000/api/infos/${id}/delete`, {
                    headers: {Authorization: token}
                })
                setLoading(false)
                setCallback(!callback)
                navigate('/info2');
            }
        }
        
    } catch (err) {
      
  
    }
}
  console.log(infos,"hhhhhh")
  return (
    <div className={classes.root}>
       <div className="navbar-brand mb-0 h2" style={{ display: 'flex' }}>
  <span>
    <Link className="nav-link pe-0" to={"/AddInfo"}>Ajouter une information</Link>
  </span>
</div>
          <List component="nav" aria-label="main mailbox folders">
        {infos.map((info, index) => (
          
          <ListItem
            key={info._id}
            className={classes.listItem}
            button
            disableRipple
            component={Link}
            to={`/info/${info.id}`}
          >         
           <img src={info.iconeUrl} alt="Event Icon" className={classes.image} />
          {/* Ajoutez le console.log ici */}
          {console.log("URL de l'image transformée :", info.imageUrl)}
          {/* Ajoutez les icônes d'édition et de suppression ici */}
            <ListItemText
              primary={info.title}/>
           

  {user.role == 1 && <IconButton component={Link} to={`/EditInfo/${info.id}`}>
            <EditIcon />
          </IconButton>}
  {user.role == 1 && <IconButton onClick={() => handleDelete2(info.id)}>
    <DeleteIcon />
  </IconButton>}
  <ArrowForwardIcon/>
          </ListItem>
        )) }
      </List>
    </div>
  );
};
function mapStateToProps({info}){
  return {
    info,
   //  modalStatus
  }
}
export default connect(mapStateToProps, {ShowInfosApi ,deleteInfoApi})(MyComponent);
