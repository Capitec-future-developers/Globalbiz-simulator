import { formatCurrency } from '../hooks/useAccountStore';

function getInitials(name) {
    const words = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!words.length) return '?';
    return words.slice(0, 2).map((w) => w[0].toUpperCase()).join('');
}

function formatShortDate(dateInput) {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return d.getDate() + ' ' + months[d.getMonth()];
}

// Mirrors renderBeneficiaryRowHtml(b, realIndex) from scripts/Transacct.js
export default function BeneficiaryRow({ beneficiary, onClick }) {
    const b = beneficiary;
    const title = b.nickname || b.name;
    const sub = (b.lastPaidAmount != null && b.lastPaidDate)
        ? 'Paid ' + formatCurrency(b.lastPaidAmount) + ' on ' + formatShortDate(b.lastPaidDate)
        : b.bank + ' ••••' + b.accountNumber.slice(-4);
    const avatarClass = b.type === 'public' ? 'nl-ben-avatar-public' : 'nl-ben-avatar-own';

    return (
        <button type="button" className="nl-pay-row" onClick={onClick}>
            <span className={'nl-ben-avatar ' + avatarClass}>{getInitials(title)}</span>
            <div className="nl-pay-row-body">
                <div className="nl-pay-row-title">
                    {title}
                    {b.isDefault && <span style={{ color: '#8a94a3', fontWeight: 400, fontSize: '0.78rem' }}> (Default)</span>}
                </div>
                <div className="nl-pay-row-sub">{sub}</div>
            </div>
            <span className="material-icons-sharp">chevron_right</span>
        </button>
    );
}
