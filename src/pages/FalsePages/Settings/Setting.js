import React from 'react'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';

import ListAltIcon from '@mui/icons-material/ListAlt';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import AddTechnology from './AddTechnology';
import ListTechnology from './ListTechnology';
import ManageMail from './ManageMail'

const Setting = () => {
    const [value, setValue] = React.useState('AddTechnology');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box component="main"
        sx={{
            backgroundColor: (theme) =>
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: 'auto',
			pb: 7
        }} /*ref={ref}*/>
			<CssBaseline />
			<Container maxWidth="lg" sx={{ mt: 7, mb: 4 }}>
				
				{
					value === "AddTechnology" ?  (<AddTechnology/>) : (<div></div>)
				}
				{
					value === "ListTechnology" ?  (<ListTechnology/>) : (<div></div>)
				}
				{
					value === "recents" ?  (<div>recents</div>) : (<div></div>)
				}
				{
					value === "ManageMail" ? (<ManageMail/>) : (<div></div>)
				}
				<Paper sx={{ position: 'fixed', bottom: 3, left: 0, right: 0 }} elevation={3}>
					<BottomNavigation value={value} 
						onChange={(event, newValue) => { setValue(newValue);}} 
							>
					
						<BottomNavigationAction
							label="Ajouter une Technologie"
							value="AddTechnology"
							icon={<AddTaskIcon />}
						/>
						
						<BottomNavigationAction
							label="Afficher Technology"
							value="ListTechnology"
							icon={<ListAltIcon />}
						/>

						<BottomNavigationAction
							label="recement ajouter"
							value="recents"
							icon={<RestoreIcon />}
						/>

						<BottomNavigationAction
							label="Configurer email"
							value="ManageMail"
							icon={<MarkEmailReadIcon />}
						/>
					
					</BottomNavigation>
				</Paper>
			</Container>
        </Box>
            
        
    )
}

export default Setting
