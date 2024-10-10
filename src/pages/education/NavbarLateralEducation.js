
import React, { useState, useEffect } from 'react';
import './NavbarLateral.css';
import { FaUser, FaCalendarAlt, FaBolt, FaEnvelope } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { ShowEducationsApi } from "../../redux/actions/education/educationsAction";
import { connect } from 'react-redux';

const NavbarLateral = ({onMenuItemClick,ShowEducationsApi}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamImageUrl, setTeamImageUrl] = useState(null); // État pour stocker l'URL de l'image pour l'équipe
  const token = useSelector(state => state.token);
  const educations = useSelector(state => state.educations);
  const activeEducations = educations.filter(education => education.isActive);
  const firstActiveEducation = activeEducations[0] || {};
  // Define the menu items with names, icons, and links


  useEffect(() => {
    ShowEducationsApi(token);
  }, [token, ShowEducationsApi]);

  // Charger l'image pour l'élément "Équipe"
  useEffect(() => {
    if (firstActiveEducation && firstActiveEducation.imageUrl) {
      const fetchTeamImage = async () => {
        try {
          const response = await fetch(firstActiveEducation.imageUrl);
          const blob = await response.blob();
          setTeamImageUrl(URL.createObjectURL(blob)); // Stocker l'image en tant qu'objet URL
        } catch (error) {
          console.error('Error loading team image:', error);
        }
      };
      fetchTeamImage();
    }
  }, [firstActiveEducation]);

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
    { name: 'Actions', icon: <FaBolt className="icon" style={{marginLeft :"15px"}} />, link: '#actions' }, // Ligne modifiée
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
export default connect(null, { ShowEducationsApi })(NavbarLateral);
