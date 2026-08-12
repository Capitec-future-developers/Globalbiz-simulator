export default function AccountPickerSheet({ title, accounts, disabledId, onClose, onSelect }) {
    return (
        <>
            <div className="nl-account-picker-overlay" onClick={onClose}></div>
            <div className="nl-account-picker-sheet">
                <div className="nl-sheet-handle"></div>
                <div className="nl-sheet-header">
                    <h3>{title}</h3>
                    <button type="button" onClick={onClose}><span className="material-icons-sharp">close</span></button>
                </div>
                <div className="nl-account-picker-list">
                    {accounts.map((acc) => {
                        const disabled = acc.id === disabledId;
                        return (
                            <div
                                key={acc.id}
                                className={'nl-account-picker-item' + (disabled ? ' disabled' : '')}
                                onClick={() => !disabled && onSelect(acc)}
                            >
                                <span className="nl-account-picker-name">{acc.name}</span>
                                <span className="nl-account-picker-number">{acc.number}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
