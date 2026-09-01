import { Outlet, Route, Routes } from 'react-router-dom';

import AppHeader from './components/AppHeader';
import PhoneShell from './components/PhoneShell';
import PhoneShells from './components/PhoneShells';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import AccountDetails from './pages/AccountDetails';
import TransactHub from './pages/TransactHub';
import TransferFlow from './pages/TransferFlow';
import PaymentsHub from './pages/PaymentsHub';
import OnceOffPayment from './pages/OnceOffPayment';
import SavedBeneficiaryList from './pages/SavedBeneficiaryList';
import BeneficiariesHub from './pages/BeneficiariesHub';
import Documents from './pages/Documents';
import Cards from './pages/Cards';
import Explore from './pages/Explore';
import Credit from './pages/Credit';
import CardMachines from './pages/CardMachines';
import SavingsAccount from './pages/SavingsAccount';
import Profile from './pages/Profile';
import Support from './pages/Support';
import PhoneSettings from './pages/PhoneSettings';
import ViewCardDetail from './pages/ViewCardDetail';
import Database from './pages/Database';
import OnlineBankingApp from './pages/computer/OnlineBankingApp';
import BusinessWelcomeScreen from './pages/Sign-in/Sign-In.jsx';
import SignInPersonal from './pages/Sign-in/SignInPersonal.jsx';
import IOSHome from './pages/iOSHome';
import GlobalOnePin from './pages/globalone/GlobalOnePin';
import GlobalOneHome from './pages/globalone/GlobalOneHome';
import GlobalOneTransact from './pages/globalone/GlobalOneTransact';
import GlobalOneCards from './pages/globalone/GlobalOneCards';
import GlobalOneProfile from './pages/globalone/GlobalOneProfile';
import GlobalOneRewards from './pages/globalone/GlobalOneRewards';
import GlobalOneInsure from './pages/globalone/GlobalOneInsure';
import GlobalOneMyInformation from './pages/globalone/GlobalOneMyInformation';
import GlobalOneVirtualCardNew from './pages/globalone/GlobalOneVirtualCardNew';
import GlobalOneVirtualCardLimits from './pages/globalone/GlobalOneVirtualCardLimits';
import GlobalOneVirtualCardSuccess from './pages/globalone/GlobalOneVirtualCardSuccess';


function AppLayout() {
    return (
        <>
            <AppHeader />

            <PhoneShell>
                <Outlet />
            </PhoneShell>
        </>
    );
}


function SigninLayout() {
    return (
        <>
            <AppHeader />

            <PhoneShells>
                <Outlet />
            </PhoneShells>
        </>
    );
}


export default function App() {
    return (
        <Routes>

            {/* Main application */}
            <Route element={<AppLayout />}>

                <Route path="/" element={<Home />} />

                <Route path="/accounts" element={<Accounts />} />
                <Route
                    path="/accounts/:accId"
                    element={<AccountDetails />}
                />

                <Route path="/transact" element={<TransactHub />} />
                <Route
                    path="/transact/transfer"
                    element={<TransferFlow />}
                />

                <Route
                    path="/transact/payments"
                    element={<PaymentsHub />}
                />

                <Route
                    path="/transact/payments/once-off"
                    element={<OnceOffPayment />}
                />

                <Route
                    path="/transact/payments/saved"
                    element={<SavedBeneficiaryList />}
                />

                <Route
                    path="/transact/beneficiaries"
                    element={<BeneficiariesHub />}
                />

                <Route path="/cards" element={<Cards />} />

                <Route path="/explore" element={<Explore />} />

                <Route
                    path="/explore/credit"
                    element={<Credit />}
                />

                <Route
                    path="/explore/card-machines"
                    element={<CardMachines />}
                />

                <Route
                    path="/explore/savings"
                    element={<SavingsAccount />}
                />

                <Route path="/documents" element={<Documents />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/support" element={<Support />} />

                <Route path="/settings" element={<PhoneSettings />} />
                <Route path="/cards/detail" element={<ViewCardDetail />} />

            </Route>


            {/* Database admin tool — full-page, no phone shell */}
            <Route path="/database" element={<Database />} />


            {/* Online banking */}
            <Route
                path="/online-banking/*"
                element={<OnlineBankingApp />}
            />


            {/* Sign-in and iOS home */}
            <Route element={<SigninLayout />}>

                <Route
                    path="/Sign-In"
                    element={<BusinessWelcomeScreen />}
                />

                <Route
                    path="/Sign-In-personal"
                    element={<SignInPersonal />}
                />

                <Route
                    path="/iOSHome"
                    element={<IOSHome />}
                />

            </Route>


            {/* GlobalOne personal banking */}
            <Route element={<SigninLayout />}>
                <Route path="/global-one" element={<GlobalOnePin />} />
                <Route path="/global-one/home" element={<GlobalOneHome />} />
                <Route path="/global-one/transact" element={<GlobalOneTransact />} />
                <Route path="/global-one/cards" element={<GlobalOneCards />} />
                <Route path="/global-one/profile" element={<GlobalOneProfile />} />
                <Route path="/global-one/rewards" element={<GlobalOneRewards />} />
                <Route path="/global-one/insure" element={<GlobalOneInsure />} />
                <Route path="/global-one/my-information" element={<GlobalOneMyInformation />} />
                <Route path="/global-one/virtual-card-new" element={<GlobalOneVirtualCardNew />} />
                <Route path="/global-one/virtual-card-limits" element={<GlobalOneVirtualCardLimits />} />
                <Route path="/global-one/virtual-card-success" element={<GlobalOneVirtualCardSuccess />} />
            </Route>

        </Routes>
    );
}