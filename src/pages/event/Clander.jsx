// Import des composants
import React from "react";
import { Route, Routes, Link} from "react-router-dom"
import MyCalendar from "./Calendar";
import AddEvents from "./AddEvents";
import UpdateEvent from "./UpdateEvent";
import "./style/global.scss"
import { useSelector } from "react-redux";

// Définition du composant Home
function Home() {
  const auth = useSelector(state => state.auth)
  const { user } = auth
  return (
    <>
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid align-items-center">
        <Link className="navbar-brand ms-2" to="/">
          <h3>Mon Agenda</h3>
        </Link>
          <span className="navbar-brand mb-0 h2 ">
         {user.role == 1 && <Link className="nav-link pe-0 " to={"/events/add"}>Ajouter un évènement</Link>}
          </span>
      </div>
    </nav>
    <Routes>
      <Route  path="/inv" exact element={<MyCalendar/>} />
      <Route path="/inv/events/add" element={<AddEvents/>}/>
{  /*    <Route path="/event/:id/update" element={<UpdateEvent/>}/>
*/}    </Routes>
    </>
  );
}

// Export du composant Home
export default Home;

// En dessous, vous pouvez importer le composant Home et le rendre avant le composant suivant
