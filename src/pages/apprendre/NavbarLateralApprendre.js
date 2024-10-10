import React, { useState, useEffect } from 'react';
import './NavbarLateral.css';
import { FaCalendarAlt, FaBolt, FaEnvelope, FaHandsHelping,FaUsers, FaPlay,FaTrophy ,FaChartLine,FaNetworkWired} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ShowApprendresApi } from "../../redux/actions/apprendre/apprendreActions";
import { connect } from 'react-redux';

const NavbarLateral = ({ onMenuItemClick, ShowApprendresApi }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamImageUrl, setTeamImageUrl] = useState(null); // État pour stocker l'URL de l'image pour l'équipe
  const token = useSelector(state => state.token);
  const apprendres = useSelector(state => state.apprendres);
  const activeApprendres = apprendres.filter(apprendre => apprendre.isActive);
  const firstActiveApprendre = activeApprendres[0] || {};
console.log(firstActiveApprendre)
  useEffect(() => {
    ShowApprendresApi(token);
  }, [token, ShowApprendresApi]);

  // Charger l'image pour l'élément "Équipe"
  useEffect(() => {
    if (firstActiveApprendre && firstActiveApprendre.imageUrl) {
      const fetchTeamImage = async () => {
        try {
          const response = await fetch(firstActiveApprendre.imageUrl);
          const blob = await response.blob();
          setTeamImageUrl(URL.createObjectURL(blob)); // Stocker l'image en tant qu'objet URL
        } catch (error) {
          console.error('Error loading team image:', error);
        }
      };
      fetchTeamImage();
    }
  }, [firstActiveApprendre]);

  // Définition des items du menu avec l'image personnalisée pour "Équipe"
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
    { name: 'Notre Plan ', icon: <FaCalendarAlt className="icon" style={{marginLeft :"15px"}}/>, link: '#plan' },
  
    {
      name: 'Nos Actions',
      icon: <FaBolt className="icon" style={{marginLeft :"15px"}} />, link: '#actions' ,
      link: '#contact'
  }, { name: 'Contact', icon: <FaEnvelope className="icon" style={{marginLeft :"15px"}} />, link: '#contact' },
  ];

  // Filtrer les éléments du menu en fonction du terme de recherche
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="navbar-lateral">
      {/* Boîte de recherche */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Liste des éléments filtrés du menu */}
      <ul className="navbar-menu">
        {filteredItems.map((item, index) => (
          <li
            key={index}
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

// Connecter le composant à Redux pour utiliser ShowEntraidesApi
export default connect(null, { ShowApprendresApi })(NavbarLateral);