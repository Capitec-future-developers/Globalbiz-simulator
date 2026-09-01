import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';

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

import OnlineBankingApp from './pages/computer/OnlineBankingApp';
import BusinessWelcomeScreen from './pages/Sign-In.jsx';
import IOSHome from './pages/iOSHome';

import Landing from './pages/Landing.jsx';

import { AutomationProvider } from './Automation/AutomationContext';
import AutomationOverlay from './Automation/AutomationOverlay';
import { appRouteCommands } from './Automation/appRouteCommands';
import ROBapp from './pages/ROB/ROBapp';

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
    // useNavigate() only works inside the Router — since App() itself is
    // rendered inside <BrowserRouter> (in main.jsx/index.jsx), this is fine
    // even though the widget is a sibling of <Routes> rather than a child
    // route.
    const navigate = useNavigate();

    return (
        <AutomationProvider commands={appRouteCommands} onNavigate={navigate}>
            <Routes>

                <Route path="/" element={<Landing />} />
                <Route path="/Landing" element={<Landing />} />

                <Route element={<AppLayout />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/accounts" element={<Accounts />} />
                    <Route path="/accounts/:accId" element={<AccountDetails />} />
                    <Route path="/transact" element={<TransactHub />} />
                    <Route path="/transact/transfer" element={<TransferFlow />} />
                    <Route path="/transact/payments" element={<PaymentsHub />} />
                    <Route path="/transact/payments/once-off" element={<OnceOffPayment />} />
                    <Route path="/transact/payments/saved" element={<SavedBeneficiaryList />} />
                    <Route path="/transact/beneficiaries" element={<BeneficiariesHub />} />
                    <Route path="/cards" element={<Cards />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/explore/credit" element={<Credit />} />
                    <Route path="/explore/card-machines" element={<CardMachines />} />
                    <Route path="/explore/savings" element={<SavingsAccount />} />
                    <Route path="/documents" element={<Documents />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/support" element={<Support />} />
                    <Route path="/ROBapp" element={<ROBapp />} />
                </Route>

                <Route path="/online-banking/*" element={<OnlineBankingApp />} />

                <Route element={<SigninLayout />}>
                    <Route path="/Sign-In" element={<BusinessWelcomeScreen />} />
                    <Route path="/iOSHome" element={<IOSHome />} />
                </Route>



            </Routes>

            <AutomationOverlay />
        </AutomationProvider>
    );
}