import { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalOneBottomNav from '../../components/GlobalOneBottomNav';

const PROFILE_ITEMS = [
    { title: 'Contact details', desc: 'Update your verified cellphone number or email' },
    { title: 'Residential address', desc: 'Where you stay' },
    { title: 'Employment details', desc: 'Where you work' },
    { title: 'Income details', desc: 'How much money you earn' },
    { title: 'Personal details', desc: 'Bring your ID or passport to a branch to update these details' },
];

const OTHER_ITEMS = [
    { icon: 'receipt_long', label: 'My tax details' },
    { icon: 'description', label: 'My agreements & disclaimers' },
    { icon: 'verified_user', label: 'Privacy centre' },
    { icon: 'mark_email_read', label: 'Secure statement sharing' },
];

export default function GlobalOneMyInformation() {
    const [tab, setTab] = useState('profile');

    return (
        <div className="go-screen">
            <div className="go-myinfo-header">
                <div className="go-myinfo-header-row">
                    <Link to="/global-one/profile"><span className="material-icons-sharp">arrow_back</span></Link>
                    <h2>My Information</h2>
                </div>
                <div className="go-myinfo-tabs">
                    <button className={'go-myinfo-tab' + (tab === 'profile' ? ' active' : '')} type="button" onClick={() => setTab('profile')}>Profile</button>
                    <button className={'go-myinfo-tab' + (tab === 'other' ? ' active' : '')} type="button" onClick={() => setTab('other')}>Other</button>
                </div>
            </div>

            <div className="go-body">
                <div className="go-myinfo-body">
                    {tab === 'profile' ? (
                        <>
                            {PROFILE_ITEMS.map((item, i) => (
                                <div key={i} className="go-myinfo-card">
                                    <div><h4>{item.title}</h4><p>{item.desc}</p></div>
                                    <span className="material-icons-sharp">expand_more</span>
                                </div>
                            ))}
                            <button className="go-myinfo-edit-btn" type="button" onClick={() => {}}>Edit details</button>
                        </>
                    ) : (
                        OTHER_ITEMS.map((item, i) => (
                            <a key={i} href="#" className="go-myinfo-simple-row" onClick={e => e.preventDefault()}>
                                <span className="material-icons-sharp">{item.icon}</span>
                                <span>{item.label}</span>
                                <span className="material-icons-sharp">chevron_right</span>
                            </a>
                        ))
                    )}
                </div>
            </div>

            <GlobalOneBottomNav active="" />
        </div>
    );
}
