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
            </div>

            <div className="home-indicator"></div>
        </div>
    );
}