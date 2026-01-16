import { AuthContext } from '../../Context/authContext'
import './home.css'
import { useContext } from 'react'
import LogoutIcon from '../../assets/img/logout.png'
import LogoIcon from '../../assets/img/logo_transparente.png'
import { Link } from 'react-router'

export default function Home(){

    const { logout } = useContext(AuthContext)

    return(
        <div id="homeContainer">

            <button 
                id="btnLogout"
                onClick={ async () => { await logout() } }
            >
                <img id="logoutIcon" src={LogoutIcon} alt="icone logout"/>
            </button>

            <img id="logoImg"src={LogoIcon} alt="" />

            <div id="containerBtnsHome">
                <Link to="/relatorio/true" className="btnHome">Carregar</Link>
                <Link to="/relatorio/false" className="btnHome">Novo Relatorio</Link>
            </div>

        </div>
    )
}