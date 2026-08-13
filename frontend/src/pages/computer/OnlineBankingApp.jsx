import { Route, Routes } from 'react-router-dom';
import ComputerShell from '../../components/ComputerShell';
import ComputerHome from './ComputerHome';
import ComputerAccounts from './ComputerAccounts';
import ComputerCards from './ComputerCards';
import ComputerTransact from './ComputerTransact';
import ComputerTransfer from './ComputerTransfer';
import ComputerAddBeneficiary from './ComputerAddBeneficiary';
import ComputerBeneficiaries from './ComputerBeneficiaries';
import ComputerViewCardDetails from './ComputerViewCardDetails';
import ComputerProductsServices from './ComputerProductsServices';
import ComputerSars from './ComputerSars';
import ComputerSecureMessages from './ComputerSecureMessages';
import ComputerDocuments from './ComputerDocuments';
import ComputerSettings from './ComputerSettings';
import ComputerAuthTransactions from './ComputerAuthTransactions';
import ComputerUserManagement from './ComputerUserManagement';
import ComputerAddUser from './ComputerAddUser';
import ComputerMessages from './ComputerMessages';
import ComputerSavingsAccounts from './ComputerSavingsAccounts';
import ComputerAccountDetails from './ComputerAccountDetails';
import ComputerBulkPayment from './ComputerBulkPayment';
import ComputerGroupPayment from './ComputerGroupPayment';
import ComputerProfileInfo from './ComputerProfileInfo';
import ComputerManageBusiness from './ComputerManageBusiness';
import ComputerKodiCode from './ComputerKodiCode';
import ComputerKodiAccounts from './ComputerKodiAccounts';
import ComputerInProgress from './ComputerInProgress';
import ComputerWindows11 from './ComputerWindows11';

// Route tree for the desktop "Online Banking" platform (Computer/*.html in
// the golden-master source) — a completely separate experience from the
// mobile App, reached via index.html's "Online Banking" toggle. Pages not
// yet ported render Stub so every sidebar link still resolves to a real
// screen instead of a dead link, per the no-hidden-gaps requirement.
//
// Windows11.html (the "Sign Out" destination — a bare mock Windows desktop
// with no bank header/sidebar) is a sibling Route here rather than one of
// the routes nested inside <ComputerShell> below, since it must render
// full-screen on its own, with no shared chrome. Note this component is
// itself mounted at "/online-banking/*" (see App.jsx), so this sibling
// route resolves to "/online-banking/online-banking-signout" — reaching a
// bare top-level "/online-banking-signout" would require a route in
// App.jsx's own <Routes>, which is outside this component's mount point
// and intentionally left untouched here.
export default function OnlineBankingApp() {
    return (
        <Routes>
            <Route path="/online-banking-signout" element={<ComputerWindows11 />} />
            <Route
                path="/*"
                element={
                    <ComputerShell>
                        <Routes>
                            <Route path="/" element={<ComputerHome />} />
                            <Route path="/accounts" element={<ComputerAccounts />} />
                            <Route path="/transact" element={<ComputerTransact />} />
                            <Route path="/transfer" element={<ComputerTransfer />} />
                            <Route path="/add-beneficiaries" element={<ComputerAddBeneficiary />} />
                            <Route path="/cards" element={<ComputerCards />} />
                            <Route path="/auth-transactions" element={<ComputerAuthTransactions />} />
                            <Route path="/beneficiaries" element={<ComputerBeneficiaries />} />
                            <Route path="/user-management" element={<ComputerUserManagement />} />
                            <Route path="/add-user" element={<ComputerAddUser />} />
                            <Route path="/messages" element={<ComputerMessages />} />
                            <Route path="/products-services" element={<ComputerProductsServices />} />
                            <Route path="/sars" element={<ComputerSars />} />
                            <Route path="/secure-messages" element={<ComputerSecureMessages />} />
                            <Route path="/documents" element={<ComputerDocuments />} />
                            <Route path="/settings" element={<ComputerSettings />} />
                            <Route path="/profile-info" element={<ComputerProfileInfo />} />
                            <Route path="/kodi-code" element={<ComputerKodiCode />} />
                            <Route path="/kodi-accounts" element={<ComputerKodiAccounts />} />
                            <Route path="/manage-business" element={<ComputerManageBusiness />} />
                            <Route path="/in-progress" element={<ComputerInProgress />} />
                            <Route path="/savings" element={<ComputerSavingsAccounts />} />
                            <Route path="/account-details" element={<ComputerAccountDetails />} />
                            <Route path="/view-card-details" element={<ComputerViewCardDetails />} />
                            <Route path="/bulk-payment" element={<ComputerBulkPayment />} />
                            <Route path="/group-payment" element={<ComputerGroupPayment />} />
                        </Routes>
                    </ComputerShell>
                }
            />
        </Routes>
    );
}
