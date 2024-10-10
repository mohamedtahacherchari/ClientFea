import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Icon1 from "./icons/Icon1";
import Icon2 from "./icons/Icon2";
import Icon3 from "./icons/Icon3"


//import Icon1 from '@material-ui/icons/AccessAlarm'; // Remplacez Icon1 par le nom de votre première icône
//import Icon2 from '@material-ui/icons/AccessTime'; // Remplacez Icon2 par le nom de votre deuxième icône
//import Icon3 from '@material-ui/icons/AccountCircle'; // Remplacez Icon3 par le nom de votre troisième icône
//import OrganigrammeEFAIcon from './OrganigrammeEFAIcon'; // Chemin vers votre icône Organigramme EFA
//import EFAResIcon from './EFAResIcon'; // Chemin vers votre icône Organigramme EFA
//import SeminaireIcon from './SeminaireIcon';
//import EFAliv from './EFAliv';
//import PodcastIcon from './PodcastIcon';
//import ChallengeIcon from './ChallengeIcon';
//import NewsIcon from './NewsIcon';
//import EquipeIcon from './EquipeIcon';
//import Moderation from './Moderation';
//import ContactIcon from './ContactIcon';
import { Link } from 'react-router-dom';
import Icon4 from './icons/Icon4';
import Icon5 from './icons/Icon5';
import Icon6 from './icons/Icon6';
import Icon7 from './icons/Icon7';
import Icon8 from './icons/Icon8';
import Icon9 from './icons/Icon9';
import Icon10 from './icons/Icon10';
import Icon11 from './icons/Icon11';
import Icon12 from './icons/Icon12';
import Icon13 from './icons/Icon13';
import Icon14 from './icons/Icon14';
import Icon15 from './icons/Icon15';
import Icon16 from './icons/Icon16';
import Icon17 from './icons/Icon17';
import Icon18 from './icons/Icon18';
import Icon19 from './icons/Icon19';
import Icon20 from './icons/Icon20';
import Icon21 from './icons/Icon21';
import Icon22 from './icons/Icon22';
import Icon23 from './icons/Icon23';
import Icon24 from './icons/Icon24';
import Icon25 from './icons/Icon25';
import Icon26 from './icons/Icon26';
import Icon27 from './icons/Icon27';

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

const MyComponentReplay = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem 
        className={classes.listItem} 
        button
        disableRipple  // Disable ripple effect on hover
        component={Link}  // Utilisation du composant Link
        to="/Sante"  // Spécifiez le chemin de votre page ici
        >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText 
    primary="Présentation du CI Santé" 
    secondary={
      <React.Fragment>
        <span>Vidéo</span><br/>
        <span>Présentation FEA</span>
      </React.Fragment>
    }
  />
   
          <IconButton aria-label="">
            <Icon1/>
          </IconButton>
        </ListItem>
        <ListItem 
        className={classes.listItem} 
        button
        component={Link}  // Utilisation du composant Link
        to="/Sadaqa"  // Spécifiez le chemin de votre page ici
        >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Présentation du CI Sadaqa -Deen "
          
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Présentation FEA</span>
            </React.Fragment>
          }
          />
          <IconButton aria-label="next-page">
          <Icon2/>
          </IconButton>
        </ListItem>
        <ListItem 
        className={classes.listItem} 
        button
        component={Link}  // Utilisation du composant Link
        to="/Voyage"  // Spécifiez le chemin de votre page ici
        >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Présentation du CI Voyages" 
           secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Présentation FEA</span>
            </React.Fragment>
          }
          
          
          />
          <IconButton aria-label="next-page">
           <Icon3/>
          </IconButton>
        </ListItem>
        <ListItem
         className={classes.listItem} 
         button
         component={Link}  // Utilisation du composant Link
          to="/Audiovisuel"  // Spécifiez le chemin de votre page ici
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Présentation du CI Audiovisuel" 
            secondary={
              <React.Fragment>
                <span>Vidéo</span><br/>
                <span>Présentation FEA</span>
              </React.Fragment>
            }
            
          />
          <IconButton aria-label="next-page">
          <Icon4/>
          </IconButton>
        </ListItem>
        <ListItem 
        className={classes.listItem} 
        button
        component={Link}  // Utilisation du composant Link
        to="/Spirituel"  // Spécifiez le chemin de votre page ici
        >
          <ListItemIcon>
         </ListItemIcon>
          <ListItemText 
          primary="Clôture du séminaire et rappel spirituel" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Séminaire FEA (2h50 à 3h17min) </span>
            </React.Fragment>
          }
          
          />
          <IconButton aria-label="next-page">
            <Icon5/>
          </IconButton>
        </ListItem>
        <ListItem 
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/PoleIT"  // Spécifiez le chemin de votre page ici
         >
          <ListItemIcon>
         </ListItemIcon>
          <ListItemText
           primary="Présentation Pôle FEA I.T" 
           secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Séminaire FEA (1h25 à 1h40min) </span>
            </React.Fragment>
          }
           />
          <IconButton aria-label="next-page">
            <Icon6/>
          </IconButton>
        </ListItem>
        <ListItem 
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/PoleAdmin"  // Spécifiez le chemin de votre page ici
         >
          <ListItemIcon>
         </ListItemIcon>
          <ListItemText
           primary="Présentation Pôle FEA Admin" 
           secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Séminaire FEA (1h40 à 2h50min) </span>
            </React.Fragment>
          }
           />
          <IconButton aria-label="next-page">
          <Icon7/>
          </IconButton>
        </ListItem>
        <ListItem 
        className={classes.listItem} 
        button
        component={Link}  // Utilisation du composant Link
        to="/Elearning"  // Spécifiez le chemin de votre page ici
        >
          <ListItemIcon>
        </ListItemIcon>
          <ListItemText 
          primary="Présentation Pôle FEA E-Learning" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Séminaire FEA (50 à 1h25min) </span>
            </React.Fragment>
          }
          />
          <IconButton aria-label="next-page">
         <Icon8/>
          </IconButton>
        </ListItem>
        <ListItem 
         className={classes.listItem} 
         button
         component={Link}  // Utilisation du composant Link
        to="/ExperienceShared"  // Spécifiez le chemin de votre page ici
         >
          <ListItemIcon>
      </ListItemIcon>
          <ListItemText primary="Présentation Pôle FEA Projet - Partage d'expérience"
            secondary={
              <React.Fragment>
                <span>Vidéo</span><br/>
                <span>Séminaire FEA (21 à 50min) </span>
              </React.Fragment>
            }
          />
          <IconButton aria-label="next-page">
           <Icon8/>
          </IconButton>
        </ListItem>
        <ListItem 
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/Invest"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Présentation Pôle FEA Invest "
              secondary={
                <React.Fragment>
                  <span>Vidéo</span><br/>
                  <span>Séminaire FEA (0 à 21min) </span>
                </React.Fragment>}/>
          <IconButton aria-label="next-page">
           <Icon8/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/Atelier"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Atelier Covid19, et après ? que proposent les membres FEA ?" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Séminaire FEA </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon9/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/Presentation"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Presentation de l'Equipe d'organisation FEA" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Séminaire FEA </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon10/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/Ouverture"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Ouverture du séminaire du 13 juin 2020" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Séminaire FEA </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon11/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Série Sira 05 - L'Abyssinie et ses en seignements" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Grand Entretien</span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon12/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="L'héritage dans le droit français" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Grand Entretien</span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon13/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="La force du networking dans FEA" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Entraide Pro</span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon14/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Comment lutter efficacement contre l'Islamophobie ?" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Grand Entretien </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon15/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Éduquer nos enfants en Europe : des défis à relever" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Grand Entretien </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon16/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="L'Intelligence Artificielle, l'électricité du 21è siècle" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Grand Entretien </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon17/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Après le Corona , effondrement ou réveil ?" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Grand Entretien </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon18/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Série Sira 04 - Début de la Révélation" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Grand Entretien </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon19/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Série Sira 03 - Le mariage avec Khadija(ra)" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Grand Entretien </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon20/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Série Sira 02 - L'enfance de notre Prophète bien aimé (sas)" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Grand Entretien </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon21/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Série Sira 01 - L'Arabie pré-islamique" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Grand Entretien </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon22/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="La Cosmologie Islamique" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Grand Entretien </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon23/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="Association Nouvelle Optique" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Grand Entretien </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon24/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="La personnalité  du musulman" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>Grand Entretien </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon25/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText primary="1ère destination : À la découverte de l'Indonésie" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>FEA Voyages </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon26/>
          </IconButton>
        </ListItem>
        <ListItem
        className={classes.listItem}
         button
         component={Link}  // Utilisation du composant Link
         to="/LinkToContact"
         >
          <ListItemIcon>
          </ListItemIcon>
          <ListItemText 
          primary="Témoignage « Nos Papas »" 
          secondary={
            <React.Fragment>
              <span>Vidéo</span><br/>
              <span>FEA Voyages </span>
            </React.Fragment>}
          />
          <IconButton aria-label="next-page">
            <Icon27/>
          </IconButton>
        </ListItem>
        {/* Ajoutez autant d'éléments ListItem que nécessaire */}
      </List>
    </div>
  );
};

export default MyComponentReplay;
