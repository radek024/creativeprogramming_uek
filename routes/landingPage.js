import { Link } from "react-router-dom";
import HomeIcon from '../inc/img/home.png';
import NewElIcon from '../inc/img/new-document.png';
import List from '../inc/img/list.png';
import SettingsIcon from '../inc/img/settings.png';
import StatsIcon from '../inc/img/bar-chart.png';
import Breadcrumb from "../components/breadcrumb";


export default function LandingPage(){
    return (
        <div>
            <Breadcrumb text="Cześć Radek!" />
            <ul className="landing--list">
                <li><Link to={'/'}>
                    <img src={HomeIcon} className="item--image"/>
                    <strong className="item--title">Strona startowa</strong>
                    </Link></li>
                <li><Link to={'add-bill'}>
                    <img src={NewElIcon} className="item--image"/>
                    <strong className="item--title">Nowy wydatek</strong>
                    </Link></li>
                <li><Link to={'list'}>
                    <img src={List} className="item--image"/>
                    <strong className="item--title">Lista wydatków</strong>
                    </Link></li>
                <li><Link to={'stats'}>
                    <img src={StatsIcon} className="item--image"/>
                    <strong className="item--title">Statystyki</strong>
                    </Link></li>
                <li><Link to={'settings'}>
                    <img src={SettingsIcon} className="item--image"/>
                    <strong className="item--title">Ustawienia</strong>
                    </Link></li>
            </ul>
            
            
            
            
        </div>
    )
}