import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
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
import PodcastIcon from './PodcastIcon';
import ChallengeIcon from './ChallengeIcon';
import NewsIcon from './NewsIcon';
import EquipeIcon from './EquipeIcon';
import Moderation from './Moderation';
import ContactIcon from './ContactIcon';
import { Link } from 'react-router-dom';

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
}));

const MyComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
             <span className="navbar-brand mb-0 h2 ">
          <Link className="nav-link pe-0 " to={"/AddInfo"}>Ajouter une information </Link>
          </span>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem 
        className={classes.listItem} 
        button
        disableRipple  // Disable ripple effect on hover
        component={Link}  // Utilisation du composant Link
        to="/LinkToOrganigramme"  // Spécifiez le chemin de votre page ici
        >
          <ListItemIcon>
            <OrganigrammeEFAIcon/>
          </ListItemIcon>
          <ListItemText primary="Organigramme EFA" />
          <IconButton aria-label="next-page">
            <ArrowForwardIcon />
          </IconButton>
        </ListItem>
        <ListItem 
        className={classes.listItem} 
        button
        component={Link}  // Utilisation du composant Link
        to="/LinkToReseaux"  // Spécifiez le chemin de votre page ici
        >
          <ListItemIcon>
            <EFAResIcon/>
          </ListItemIcon>
          <ListItemText primary="EFA Réseau" />
          <IconButton aria-label="next-page">
            <ArrowForwardIcon />
          </IconButton>
        </ListItem>
        <ListItem 
        className={classes.listItem} 
        button
        component={Link}  // Utilisation du composant Link
        to="/SeminairesIcon2"  // Spécifiez le chemin de votre page ici
        >
          <ListItemIcon>
            <SeminaireIcon />
          </ListItemIcon>
          <ListItemText primary="Séminaires" />
          <IconButton aria-label="next-page">
            <ArrowForwardIcon />
          </IconButton>
        </ListItem>
        <ListItem
         className={classes.listItem} 
         button
         component={Link}  // Utilisation du composant Link
          to="/LivretBlanc"  // Spécifiez le chemin de votre page ici
         >
          <ListItemIcon>
            <EFAliv/>
          </ListItemIcon>
          <ListItemText primary="FEA Livret blanc" />
          <IconButton aria-label="next-page">
            <ArrowForwardIcon />
          </IconButton>
        </ListItem>
        <ListItem 
        className={classes.listItem} 
        button
        component={Link}  // Utilisation du composant Link
        to="/Podcast"  // Spécifiez le chemin de votre page ici
        >
          <ListItemIcon>
            <PodcastIcon/>
          </ListItemIcon>
          <ListItemText primary="FEA Podcasts" />
          <IconButton aria-label="next-page">
            <ArrowForwardIcon />
          </IconButton>
        </ListItem>
        <ListItem 
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/Challenge"  // Spécifiez le chemin de votre page ici
         >
          <ListItemIcon>
            <ChallengeIcon/>
          </ListItemIcon>
          <ListItemText primary="Les FEA Challenge" />
          <IconButton aria-label="next-page">
            <ArrowForwardIcon />
          </IconButton>
        </ListItem>
        <ListItem 
        className={classes.listItem} 
        button
        component={Link}  // Utilisation du composant Link
        to="/Video"  // Spécifiez le chemin de votre page ici
        >
          <ListItemIcon>
          <NewsIcon/>
          </ListItemIcon>
          <ListItemText primary="Les Videos News FEA" />
          <IconButton aria-label="next-page">
            <ArrowForwardIcon />
          </IconButton>
        </ListItem>
        <ListItem 
         className={classes.listItem} 
         button
         component={Link}  // Utilisation du composant Link
        to="/Equipe2"  // Spécifiez le chemin de votre page ici
         >
          <ListItemIcon>
          <EquipeIcon/>
          </ListItemIcon>
          <ListItemText primary="Rejoignez l'equipe orga FEA!" />
          <IconButton aria-label="next-page">
            <ArrowForwardIcon />
          </IconButton>
        </ListItem>
        <ListItem 
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToModeration"
         >
          <ListItemIcon>
          <Moderation/>
          </ListItemIcon>
          <ListItemText primary="Règles de moderation" />
          <IconButton aria-label="next-page">
            <ArrowForwardIcon />
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          <ContactIcon/>
          </ListItemIcon>
          <ListItemText primary="Contact" />
          <IconButton aria-label="next-page">
            <ArrowForwardIcon />
          </IconButton>
        </ListItem>
        {/* Ajoutez autant d'éléments ListItem que nécessaire */}
      </List>
    </div>
  );
};

export default MyComponent;
