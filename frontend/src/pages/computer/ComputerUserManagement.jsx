import useScopedStylesheets from '../../hooks/useScopedStylesheets';
import { Link } from 'react-router-dom';

const STYLESHEETS = [
    '/legacy-styles/Computer.css',
    '/legacy-styles/user.css',
    '/legacy-styles/Chatbotcomputer.css',
];

// Faithful React port of Computer/user-management.html's content
// (everything below the shared header/sidebar, which ComputerShell owns).
// Loads exactly the stylesheets user-management.html itself links.
//
// Note: unlike most Computer/*.html pages, the source markup puts its
// search-container INSIDE the content area (as a child of .user-details)
// rather than as a page-level sibling of the sidebar — reproduced verbatim
// here even though it results in a second search bar alongside
// ComputerShell's own (which mirrors the source's own duplication).
export default function ComputerUserManagement() {
    useScopedStylesheets(STYLESHEETS);

    return (
        <div className="content" id="mainContent">
            <div className="haeder">
                <h1>User Management</h1>
                <div className="this">
                    <div className="role">User role</div>
                    <div className="Add">
                        <Link to="/online-banking/add-user" style={{ textDecoration: 'none', color: '#FFFFFF' }}>Add User</Link>
                    </div>
                </div>
            </div>
            <div className="user-details">
                <div className="search-container">
                    <input type="text" id="automation-search" placeholder="What would you like to do? (e.g., 'Pay saved beneficiary')" />
                    <button id="execute-automation" className="search-button" aria-label="Execute search" type="button">
                        <span className="material-icons-sharp">search</span> Go
                    </button>
                    <div id="suggestions-dropdown" className="suggestions-dropdown"></div>
                </div>
                <div className="user-roles">
                    <select className="user-role">
                        <option>User Role</option>
                        <option>Authoriser</option>
                        <option>Capturer</option>
                        <option>Viewer</option>
                    </select>
                </div>
                <div className="-status">
                    <select className="Sars">
                        <option>SARS Status </option>
                        <option>Non SARS eFiling Users</option>
                        <option>SARS eFilling Active Users</option>
                        <option>SARS eFilling Inactive Users</option>
                    </select>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name and Surname</th>
                        <th>Username</th>
                        <th>User role</th>
                        <th>SARS Status</th>
                        <th>Email Address</th>
                        <th>Cellphone Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Zenzi Dube</td>
                        <td>zenzi.dube@zenzidigital.co.za</td>
                        <td>Authoriser</td>
                        <td><div className="statu">Active</div></td>
                        <td>zenzi.dube@zenzidigital.co.za</td>
                        <td>+27 60 291 0591</td>
                        <td style={{ cursor: 'pointer', color: '#1e88e5' }}>View</td>
                    </tr>
                    <tr>
                        <td>Siphesihle Mohlala</td>
                        <td>Sihle@gmail.com</td>
                        <td>Authoriser</td>
                        <td><div className="statu">Active</div></td>
                        <td>Sihle@gmail.com</td>
                        <td>+27 60 291 0591</td>
                        <td style={{ cursor: 'pointer', color: '#1e88e5' }}>View</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
