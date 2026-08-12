import { Route, Routes } from 'react-router-dom';
import PhoneShell from './components/PhoneShell';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import AccountDetails from './pages/AccountDetails';
import TransactHub from './pages/TransactHub';
import TransferFlow from './pages/TransferFlow';
import PaymentsHub from './pages/PaymentsHub';
import OnceOffPayment from './pages/OnceOffPayment';
import SavedBeneficiaries from './pages/SavedBeneficiaries';
import Documents from './pages/Documents';
import Cards from './pages/Cards';
import Explore from './pages/Explore';
import Stub from './pages/Stub';

export default function App() {
    return (
        <PhoneShell>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/accounts/:accId" element={<AccountDetails />} />
                <Route path="/transact" element={<TransactHub />} />
                <Route path="/transact/transfer" element={<TransferFlow />} />
                <Route path="/transact/payments" element={<PaymentsHub />} />
                <Route path="/transact/payments/once-off" element={<OnceOffPayment />} />
                <Route path="/transact/payments/saved" element={<SavedBeneficiaries />} />
                <Route path="/transact/beneficiaries" element={<SavedBeneficiaries />} />
                <Route path="/cards" element={<Cards />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/explore/credit" element={<Stub title="Credit" />} />
                <Route path="/explore/card-machines" element={<Stub title="Card Machines" />} />
                <Route path="/explore/savings" element={<Stub title="Save" />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/profile" element={<Stub title="Profile" />} />
                <Route path="/support" element={<Stub title="Support" />} />
            </Routes>
        </PhoneShell>
    );
}
