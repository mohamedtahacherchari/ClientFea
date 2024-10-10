import React, { useState, useEffect } from 'react';
import './NavbarLateral.css';
import { FaCalendarAlt, FaBolt, FaEnvelope, FaHandsHelping,FaUsers, FaPlay,FaTrophy ,FaChartLine,FaNetworkWired} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ShowInvestirsApi } from "../../redux/actions/investir/investirActions";
import { connect } from 'react-redux';

const NavbarLateral = ({ onMenuItemClick, ShowInvestirsApi }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamImageUrl, setTeamImageUrl] = useState(null); // État pour stocker l'URL de l'image pour l'équipe
  const token = useSelector(state => state.token);
  const investirs = useSelector(state => state.investirs);
  const activeInvestirs = investirs.filter(investir => investir.isActive);
  const firstActiveInvestir = activeInvestirs[0] || {};
console.log(firstActiveInvestir)
  useEffect(() => {
    ShowInvestirsApi(token);
  }, [token, ShowInvestirsApi]);

  // Charger l'image pour l'élément "Équipe"
  useEffect(() => {
    if (firstActiveInvestir && firstActiveInvestir.imageUrl) {
      const fetchTeamImage = async () => {
        try {
          const response = await fetch(firstActiveInvestir.imageUrl);
          const blob = await response.blob();
          setTeamImageUrl(URL.createObjectURL(blob)); // Stocker l'image en tant qu'objet URL
        } catch (error) {
          console.error('Error loading team image:', error);
        }
      };
      fetchTeamImage();
    }
  }, [firstActiveInvestir]);

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
    { name: 'Notre Plan', icon: <FaCalendarAlt className="icon" style={{marginLeft :"15px"}}/>, link: '#plan' },
  
    {
      name: 'Nos Investissements disponible',
      icon: <FaPlay style={{marginLeft: "15px"}} className="icon" />,
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
export default connect(null, { ShowInvestirsApi })(NavbarLateral);