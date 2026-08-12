import { NavLink } from 'react-router-dom';

const NAV_ITEMS = [
    { to: '/', label: 'Home', icon: 'home' },
    { to: '/accounts', label: 'Accounts', icon: 'accounts' },
    { to: '/transact', label: 'Transact', icon: 'transact' },
    { to: '/cards', label: 'Cards', icon: 'cards-action' }
];

export default function PhoneShell({ children }) {
    return (
        <div className="iphone">
            <div className="volume-buttons">
                <div className="volume-up"></div>
                <div className="volume-down"></div>
            </div>
            <div className="power-button"></div>
            <div className="screen">
                <div className="notch"></div>
                <div className="screen-content">
                    {children}
                </div>
                <div className="bottom-nav" id="bottomNav">
                    {NAV_ITEMS.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.to === '/'}
                            className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
                        >
                            <img src={`/images/${item.icon}.svg`} alt={item.label} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                    <NavLink to="/explore" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>
                        <span className="nav-icon material-icons-outlined">search</span>
                        <span>Explore</span>
                    </NavLink>
                </div>
            </div>
            <div className="home-indicator"></div>
        </div>
    );
}
