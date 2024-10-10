import React from 'react'
import Dialog from '@mui/material/Dialog';
import {Button,Typography,TextField} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UnstyledSelectIntroduction2 from './ListButton2'
import UnstyledSelectIntroduction3 from './ListButton3';
const DialogueClient = () => {
    const handleClose = () => {
        setOpen(false);
      };
      const [open, setOpen] = React.useState(false);

  return (
    <div>


<Dialog open={open} onClose={handleClose}>
        <DialogTitle>NOUVEAU CLIENT</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
        
<table>
  <tbody>
    <td ><Typography variant="subtitle1" gutterBottom style={{marginRight:"60px"}}>
Type de client      </Typography></td>
    <td >< UnstyledSelectIntroduction3/>
</td>
  

  </tbody>
</table>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Référence client*"
            type="email"
            fullWidth
            variant="standard"
          />
          <h1 style={{color:"green" , marginLeft:"220px"}}>COORDONNEES</h1>
              <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom de l'entreprise*"
            type="email"
            fullWidth
            variant="standard"
          />
              
                    <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Numéro de SIRET"
            type="email"
            fullWidth
            variant="standard"
          />
                     <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Numéro de TVA"
            type="email"
            fullWidth
            variant="standard"
          />
                           <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Titre"
            type="email"
            fullWidth
            variant="standard"
          />
                                 <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Prénom"
            type="email"
            fullWidth
            variant="standard"
          />
                                 <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom de famille"
            type="email"
            fullWidth
            variant="standard"
          />
                                 <TextField
            autoFocus
            margin="dense"
            id="name"
            label="E-mail"
            type="email"
            fullWidth
            variant="standard"
          />
                                 <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Téléphone"
            type="email"
            fullWidth
            variant="standard"
          />
                                 <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Portable"
            type="email"
            fullWidth
            variant="standard"
          />
          <h1  style={{color:"green" , marginLeft:"180px"}}>ADRESSE DE FACTURATION</h1>

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Adresse"
            type="email"
            fullWidth
            variant="standard"
          />
                                 <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Code postal"
            type="email"
            fullWidth
            variant="standard"
          />
                                 <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ville"
            type="email"
            fullWidth
            variant="standard"
          />
                        
           <h1  style={{color:"green" , marginLeft:"180px"}}>INFORMATION DE FACTURATION</h1>


<table>
  <tbody>
    <td ><Typography variant="subtitle1" gutterBottom style={{marginRight:"60px"}}>
Conditions de paiement
      </Typography></td>
    <td >< UnstyledSelectIntroduction2/>
</td>
  

  </tbody>
</table>


                       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleClose}>Enregister</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogueClient