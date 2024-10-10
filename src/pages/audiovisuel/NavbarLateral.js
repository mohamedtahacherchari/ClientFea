
import React, { useState , useEffect} from 'react';
import './NavbarLateral.css';
import { FaUser, FaCalendarAlt, FaFilm, FaHandshake, FaCloudUploadAlt, FaEnvelope, FaPen } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ShowAudiovisuelsApi } from "../../redux/actions/audiovisuel/audiovisuelsAction";
import { connect } from 'react-redux';
const NavbarLateral = ({onMenuItemClick}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamImageUrl, setTeamImageUrl] = useState(null); // État pour stocker l'URL de l'image pour l'équipe
  const token = useSelector(state => state.token);
  const audiovisuels = useSelector(state => state.audiovisuels);
  const activeAudiovisuels = audiovisuels.filter(audiovisuel => audiovisuel.isActive);
  const firstActiveAudiovisuel = activeAudiovisuels[0] || {};
  // Define the menu items with names, icons, and links


  useEffect(() => {
    ShowAudiovisuelsApi(token);
  }, [token, ShowAudiovisuelsApi]);

  // Charger l'image pour l'élément "Équipe"
  useEffect(() => {
    if (firstActiveAudiovisuel && firstActiveAudiovisuel.imageUrl) {
      const fetchTeamImage = async () => {
        try {
          const response = await fetch(firstActiveAudiovisuel.imageUrl);
          const blob = await response.blob();
          setTeamImageUrl(URL.createObjectURL(blob)); // Stocker l'image en tant qu'objet URL
        } catch (error) {
          console.error('Error loading team image:', error);
        }
      };
      fetchTeamImage();
    }
  }, [firstActiveAudiovisuel]);
  const menuItems = [
    {
      name: 'Équipe',
      icon: teamImageUrl ? (
        <div style={{ display: 'flex', alignItems: 'center',marginRight:"10px" }}>  {/* Conteneur Flex */}
          <img src={teamImageUrl} alt="Icone Équipe" className="icon-small-circle" />
        </div>
      ) : (
        <span>Loading...</span>
      ),
      link: '#team'
    },
    { name: 'Notre Plan ', icon: <FaCalendarAlt className="icon" style={{marginLeft :"15px"}} />, link: '#plan' },
    { name: 'Initiation au montage vidéo', icon: <FaFilm className="icon" style={{marginLeft :"15px"}} />, link: '#montage' },
    { name: 'Nos partenaires', icon: <FaHandshake className="icon" style={{marginLeft :"15px"}} />, link: '#partenaires' },
    { name: 'Soumettre votre propre vidéo', icon: <FaCloudUploadAlt className="icon" style={{marginLeft :"15px"}} />, link: '#submit' },
    { name: 'Contact', icon: <FaEnvelope className="icon" style={{marginLeft :"15px"}} />, link: '#contact' },
   
  ];
  
  // Filter the menu items based on the search term
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
 // console.log('onMenuItemClick:', onMenuItemClick);
 console.log('Prop onMenuItemClick reçue :', onMenuItemClick); // Ajoutez cette ligne

  return (
    <div className="navbar-lateral">
      {/* Search input box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* List of filtered menu items */}
      <ul className="navbar-menu">
        {filteredItems.map((item, index) => (
          <li key={index}
           className="navbar-item" 
          onClick={() => onMenuItemClick(item.name)}
        >
            {item.icon}
            <span className="menu-text">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

//export default NavbarLateral;
export default connect(null, { ShowAudiovisuelsApi })(NavbarLateral);
