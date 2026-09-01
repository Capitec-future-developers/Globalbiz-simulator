import { NavLink } from 'react-router-dom';

export default function GlobalOneBottomNav({ active }) {
    return (
        <div className="go-bottom-nav">
            <NavLink to="/global-one/home" className={() => 'go-nav-item' + (active === 'home' ? ' active' : '')}>
                <img src="/images/home.svg" className="go-nav-icon" alt="" />
                <span>Home</span>
            </NavLink>
            <NavLink to="/global-one/cards" className={() => 'go-nav-item' + (active === 'cards' ? ' active' : '')}>
                <img src="/images/cards-action.svg" className="go-nav-icon" alt="" />
                <span>Cards</span>
            </NavLink>
            <NavLink to="/global-one/transact" className={() => 'go-nav-item' + (active === 'transact' ? ' active' : '')}>
                <img src="/images/transact.svg" className="go-nav-icon" alt="" />
                <span>Transact</span>
            </NavLink>
            <button type="button" className="go-nav-item" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span className="go-nav-badge">New</span>
                <img src="/images/messages (1).svg" className="go-nav-icon" alt="" />
                <span>Messages</span>
            </button>
            <button type="button" className="go-nav-item" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span className="go-nav-badge">New</span>
                <img src="/images/search.svg" className="go-nav-icon" alt="" />
                <span>Explore</span>
            </button>
        </div>
    );
}
