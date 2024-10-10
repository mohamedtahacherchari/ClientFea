import { useState, useEffect ,React} from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ViewListIcon from '@mui/icons-material/ViewList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HikingIcon from '@mui/icons-material/Hiking';
import Drawer from "@mui/material/Drawer";
import {Link} from 'react-router-dom'

import EditIcon from '@mui/icons-material/Edit';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AutoModeIcon from '@mui/icons-material/AutoMode';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import AppBar from "@mui/material/AppBar";
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem'; 

import { Routes, Route } from 'react-router-dom'
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { dispatchLogin, fetchUser, dispatchGetUser } from '../../redux/actions/authAction';
import axios from 'axios';
import ListItem from '@mui/material/ListItem';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { Brightness4, Brightness7 } from '@mui/icons-material';

import Dashboard from './Dashboard/Dashboard'
import BusinessUnit from './BusinessUnit/BusinessUnit'
import Candidat from './Candidat/Candidat'
import Client from './Client/Client'
import Process from '../Process/Process'
import Setting from './Settings/Setting'
import Task from './Tasks/Task'
import User from '../User/User'
import MyProfile from '../User/MyProfile'
import EditProfile from '../User/EditProfile'
import Report from './Report/Report'
import Jobs from './Jobs/Jobs'
import  Mail1 from './Candidat/Mail1'


import useResponsive from '../../components/hooks/useResponsive.js'
import AddCandidat from './Candidat/AddCandidat';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkIcon from '@mui/icons-material/Work';
import AppbarComponent from './AppbarComponent';
import Mail2 from './Candidat/Mail2';
import Mail3 from './Candidat/Mail3';
import FormDialog from './Candidat/FormDialog';
import NestedList from './Candidat/NestedList';
import EditUser from '../User/EditUser';
import ResponsiveAppBar from './Home2';
//import  ResponsiveAppBar  from '../pages/ResponsiveAppBar';



const drawerWidth = 270;

const StyledList = styled(List)({
	// selected and (selected + hover) states
	'&& .Mui-selected, && .Mui-selected:hover': {
		backgroundColor: '#00acc1',
		'&, & .MuiListItemIcon-root': {
		color: 'white',
		},
	},
	// hover states
	'& .MuiListItemButton-root:hover': {
		backgroundColor: '#eeeeee',
		'&, & .MuiListItemIcon-root': {
		color: 'black',
		},
	},

});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
        transform: 'scale(.8)',
        opacity: 1,
        },
        '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
        },
    },
}));



const Home = (props) => {
    const location = useLocation()

    const [selectedIndex, setSelectedIndex] = useState('');

	const dispatch = useDispatch()

	const token = useSelector(state => state.token)

	const auth = useSelector(state => state.auth)

	const {user, isLogged} = auth

	const { window } = props;
    
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate()
    const pathName = location.pathname.split("/");

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index)
	};
	
	const [open, setOpen] = useState(true);

	const handleDrawerOpen = () => {
		setOpen(!open);
		setSubMenuOpen(false);
	};

	const [openSubMenu, setSubMenuOpen] = useState(false);

	const handleClick = () => {
		setSubMenuOpen(!openSubMenu);
	};

	const [dark, setDark] = useState(false);

    const darkTheme = createTheme({
        palette:{
			mode:'dark',
		}
    })

	const lightTheme = createTheme({
		palette:{
			background : {
				mode: 'light',
				default: "#f8f8f8"
			},
		}
	})

    const container = window !== undefined ? () => window().document.body : undefined;

    

	useEffect(() => {
		const firstLogin = localStorage.getItem('firstLogin')
		if(firstLogin){
		const getToken = async () => {
			const res = await axios.post('/user/refresh_token', null)
			dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
		}
		getToken()
		}
	},[auth.isLogged, dispatch])

	useEffect(() => {
		if(token){
		const getUser = () => {
			dispatch(dispatchLogin())

			return fetchUser(token).then(res => {
			dispatch(dispatchGetUser(res))
			})
		}
		getUser()
		}
	},[token, dispatch])
    
    return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
        
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <StyledList>
                            <DrawerHeader>
                                {open ? (
                                    <img
                                        src="https://res.cloudinary.com/dcdei4osp/image/upload/v1661343478/logo/logo_xc49qh.png"
                                        height="50px"
                                        alt="logo"
                                        sx={{
                                            display: 'flex',
                                            ml: -5
                                        }}
                                    />
                                ) : (
                                    <img
                                        src="https://res.cloudinary.com/dcdei4osp/image/upload/v1663342587/avatar/tabicon_qpqzhj.webp"
                                        height="40px"
                                        alt="logo"
                                        sx={{
                                            display: 'flex',
                                        }}
                                    />
                                )}
                            </DrawerHeader>
                            <Divider />

                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                {open ? (`Menu Principale `) : ("")}

                                    {/* TABLEAU DE BOARD */}
                                        <ListItemButton 
                                            selected={ pathName[1] === 'dashboard'}
                                            onClick={(event) => {
                                                    navigate("/dashboard")
                                            }}
                                            >
                                            <ListItemIcon >
                                                <DashboardIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Tableau de Board" />
                                        </ListItemButton>
                                        
                                        {/* TASKS */}
                                    <ListItemButton selected={pathName[1] === 'tasks'}
                                        onClick={(event) => {
                                            navigate("/tasks")
                                            handleListItemClick(event, 'tasks')
                                        }}>
                                        <ListItemIcon>
                                            <ListAltIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Taches" />
                                    </ListItemButton>
                                    <Divider />
                                {/* GESTION */}
                                {open ? ("Gestion") : ("")}
                                <ListItemButton selected={pathName[1] === 'candidats'}
                                    onClick={(event) => {
                                        navigate("/candidats")
                                        handleListItemClick(event, 'candidats')
                                    }}>
                                    <ListItemIcon>
                                        <HikingIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Candidats" />
                                </ListItemButton>
                                    {/* PROCESS */}
                                <ListItemButton selected={pathName[1] === 'process'}
                                    onClick={(event) => {
                                        navigate("/process")
                                        handleListItemClick(event, 'process')
                                    }}>
                                    <ListItemIcon>
                                        <AutoModeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Process" />
                                </ListItemButton>
                                {/* CLIENTS */}
                                <ListItemButton selected={pathName[1] === 'clients'}
                                    onClick={(event) => {
                                        navigate("/clients")
                                        handleListItemClick(event, 'clients')
                                    }}>
                                    <ListItemIcon>
                                        <PeopleOutlineIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Clients" />
                                </ListItemButton>
                                {/* Report */}
                                <ListItemButton selected={pathName[1] === 'report'}
                                    onClick={(event) => {
                                        navigate("/report")
                                    }}>
                                    <ListItemIcon>
                                        <QueryStatsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Report" />
                                </ListItemButton>
                                <Divider />
                                <br/>
                                    {/* SETTINGS */}
                                {open ? ("Authorisation") : ("")}
                                <ListItemButton selected={pathName[1] === 'settings'}
                                    onClick={(event) => {
                                            navigate("/settings")
                                            handleListItemClick(event, 'settings')
                                        }}>
                                    <ListItemIcon>
                                    <span className="material-symbols-outlined">settings</span>
                                    </ListItemIcon>
                                    <ListItemText primary="Réglages" />
                                </ListItemButton>
                                {/* USER */}
                                <ListItemButton selected={pathName[1] === 'users'}
                                    onClick={(event) => {
                                        navigate("/users")
                                    }}>
                                    <ListItemIcon>
                                    <span className="material-symbols-outlined">manage_accounts</span>
                                    </ListItemIcon>
                                    <ListItemText primary="Utilisateur" />
                                </ListItemButton>
                                

                            </List>
                    </StyledList>
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <StyledList>
                            <DrawerHeader>
                                {open ? (
                                    <img
                                        src="https://res.cloudinary.com/dcdei4osp/image/upload/v1661343478/logo/logo_xc49qh.png"
                                        height="50px"
                                        alt="logo"
                                        sx={{
                                            display: 'flex',
                                            ml: -5
                                        }}
                                    />
                                ) : (
                                    <img
                                        src="https://res.cloudinary.com/dcdei4osp/image/upload/v1663342587/avatar/tabicon_qpqzhj.webp"
                                        height="40px"
                                        alt="logo"
                                        sx={{
                                            display: 'flex',
                                        }}
                                    />
                                )}
                            </DrawerHeader>
                            <Divider />

                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                {open ? (`Menu Principale `) : ("")}

                                    {/* TABLEAU DE BOARD */}
                                        <ListItemButton 
                                            selected={ pathName[1] === 'dashboard'}
                                            onClick={(event) => {
                                                    navigate("/dashboard")
                                            }}
                                            >
                                            <ListItemIcon >
                                                <DashboardIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Tableau de Board" />
                                        </ListItemButton>
                                        
                                        {/* TASKS */}
                                    <ListItemButton selected={pathName[1] === 'tasks'}
                                        onClick={(event) => {
                                            navigate("/tasks")
                                            handleListItemClick(event, 'tasks')
                                        }}>
                                        <ListItemIcon>
                                            <ListAltIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Taches" />
                                    </ListItemButton>
                                    <Divider />
                                {/* GESTION */}
                                {open ? ("Gestion") : ("")}
                                <ListItemButton selected={pathName[1] === 'candidats'}
                                    onClick={(event) => {
                                        navigate("/candidats")
                                        handleListItemClick(event, 'candidats')
                                    }}>
                                    <ListItemIcon>
                                        <HikingIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Candidats" />
                                </ListItemButton>
                                    {/* PROCESS */}
                                <ListItemButton selected={pathName[1] === 'process'}
                                    onClick={(event) => {
                                        navigate("/process")
                                        handleListItemClick(event, 'process')
                                    }}>
                                    <ListItemIcon>
                                        <AutoModeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Process" />
                                </ListItemButton>
                                {/* CLIENTS */}
                                <ListItemButton selected={pathName[1] === 'clients'}
                                    onClick={(event) => {
                                        navigate("/clients")
                                        handleListItemClick(event, 'clients')
                                    }}>
                                    <ListItemIcon>
                                        <PeopleOutlineIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Clients" />
                                </ListItemButton>
                                {/* Report */}
                                <ListItemButton selected={pathName[1] === 'report'}
                                    onClick={(event) => {
                                        navigate("/report")
                                    }}>
                                    <ListItemIcon>
                                        <QueryStatsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Report" />
                                </ListItemButton>
                                {/* Jobs */}
                                <ListItemButton selected={pathName[1] === 'jobs'}
                                    onClick={(event) => {
                                        navigate("/jobs")
                                    }}>
                                        
                                        
                                    <ListItemIcon>
                                        
                                        <WorkIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Jobs" />
                                </ListItemButton>

                                <ListItemButton selected={pathName[1] === 'chats'}
                                    onClick={(event) => {
                                        navigate("/chats")
                                    }}>
                                        
                                        
                                    <ListItemIcon>
                                        
                                       <ChatIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="chats" />
                                </ListItemButton>
                                <Divider />
                                <br/>
                                    {/* SETTINGS */}
                                {open ? ("Authorisation") : ("")}
                                <ListItemButton selected={pathName[1] === 'settings'}
                                    onClick={(event) => {
                                            navigate("/settings")
                                            handleListItemClick(event, 'settings')
                                        }}>
                                    <ListItemIcon>
                                    <span className="material-symbols-outlined">settings</span>
                                    </ListItemIcon>
                                    <ListItemText primary="Réglages" />
                                </ListItemButton>
                                {/* USER */}
                                <ListItemButton selected={pathName[1] === 'users'}
                                    onClick={(event) => {
                                        navigate("/users")
                                    }}>
                                    <ListItemIcon>
                                    <span className="material-symbols-outlined">manage_accounts</span>
                                    </ListItemIcon>
                                    <ListItemText primary="Utilisateur" />
                                </ListItemButton>
                            </List>
                    </StyledList>
                    <Divider />
                    <Stack spacing={2}>
					<StyledList>
							<ListItemButton onClick={handleClick} >
								<ListItemIcon>
									<StyledBadge
										overlap="circular"
										anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
										variant="dot"
									>
										<Avatar alt="AvatarIcon" src={user.avatar} /> 
									</StyledBadge>
								</ListItemIcon>
								<ListItemText>
									{user.firstName}
								</ListItemText>
								{openSubMenu ? <ExpandLess /> : <ExpandMore />}
							</ListItemButton>
							<Collapse in={openSubMenu} timeout="auto" >

								<List 
									sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
									component="nav"
									aria-labelledby="nested-list-subheader"
								>
									<ListItemButton sx={{ pl: 4}}
										selected={pathName[1] === 'myprofile' }
										onClick={
											(event) => {
												navigate("/myprofile")
											}
										}
										>
										<ListItemIcon>
											<AccountBoxIcon />
										</ListItemIcon>
										
											<ListItemText primary="Mon Profile" />
										
									</ListItemButton>

									<ListItemButton sx={{ pl: 4 }} selected={pathName[1] === 'editprofile'}
										//onClick={(event) => handleListItemClick(event, 10)}
										onClick={
											(event) => {
												navigate("/editprofile")
											}
										}
										>
										<ListItemIcon>
											<EditIcon />
										</ListItemIcon>
											<ListItemText primary="Modifier Profile" />
									</ListItemButton>

								</List>
							</Collapse>
							</StyledList>
						</Stack>
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Routes>
					<Route path='/dashboard' element={<Dashboard/>} />
					<Route path='/candidats' element={<Candidat/>} />
                    <Route path='/candidats/add' element={<AddCandidat/>} />
					<Route path='/clients' element={<Client/>} />
					<Route path='/process' element={<Process data={user}/>} />
					<Route path='/settings' element={<Setting/>} />
					<Route path='/tasks' element={<Task/>} />
					<Route path='/users' element={<User/>} />
					<Route path='/editprofile' element={<EditProfile/>} />
					<Route path='/myprofile' element={<MyProfile/>} />
					<Route path='/report' element={<Report/>}/>
                    <Route path='/jobs' element={<Jobs/>} />
                    <Route path='/jobs' element={<Jobs/>} />
                    <Route path='/Mail1' element={<Mail1/>} />
                    <Route path='/Mail2' element={<Mail2/>} />
                    <Route path='/Mail3' element={<Mail3/>} />
                    <Route path='/FormDialog' element={<FormDialog/>} />
                    <Route path='/Nest' element={<NestedList/>} />
                    <Route path="/edit_user/:id" element={<EditUser/>} exact/>






				</Routes>
            </Box>
        </Box>
    </ThemeProvider>
    )
}

export default Home
