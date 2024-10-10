import React, { useState, useEffect } from 'react';
import './NavbarLateral.css';
import { FaCalendarAlt, FaBolt, FaEnvelope, FaHandsHelping, FaTrophy ,FaChartLine,FaNetworkWired} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ShowEntraidesApi } from "../../redux/actions/entraide/entraideActions";
import { connect } from 'react-redux';

const NavbarLateral = ({ onMenuItemClick, ShowEntraidesApi }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamImageUrl, setTeamImageUrl] = useState(null); // État pour stocker l'URL de l'image pour l'équipe
  const token = useSelector(state => state.token);
  const entraides = useSelector(state => state.entraides);
  const activeEntraides = entraides.filter(entraide => entraide.isActive);
  const firstActiveEntraide = activeEntraides[0] || {};

  useEffect(() => {
    ShowEntraidesApi(token);
  }, [token, ShowEntraidesApi]);

  // Charger l'image pour l'élément "Équipe"
  useEffect(() => {
    if (firstActiveEntraide && firstActiveEntraide.imageUrl) {
      const fetchTeamImage = async () => {
        try {
          const response = await fetch(firstActiveEntraide.imageUrl);
          const blob = await response.blob();
          setTeamImageUrl(URL.createObjectURL(blob)); // Stocker l'image en tant qu'objet URL
        } catch (error) {
          console.error('Error loading team image:', error);
        }
      };
      fetchTeamImage();
    }
  }, [firstActiveEntraide]);

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
    {
      name: 'Rejoignez-nous',
      icon: <FaHandsHelping className="icon" style={{marginLeft :"15px"}}/>, // Icône par défaut pour "Rejoignez-nous"
      link: '#join'
    },
    { name: 'Notre Plan ', icon: <FaCalendarAlt className="icon" style={{marginLeft :"15px"}}/>, link: '#plan' },
    { name: 'Nos success stories', icon: <FaTrophy className="icon" style={{marginLeft :"15px"}} />, link: '#success-stories' },
    {
      name: 'FEA Feed Back',
      icon: <FaChartLine style={{ marginLeft: '15px' }}  className="icon"/>,
      link: '#contact'
  },
  {
    name: 'FEA Recommandations',
    icon: <FaNetworkWired style={{marginLeft :"15px"}} className="icon" />,
    link: '#contact'
},
    { name: 'Contact', icon: <FaEnvelope className="icon" style={{marginLeft :"15px"}} />, link: '#contact' },
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
export default connect(null, { ShowEntraidesApi })(NavbarLateral);
