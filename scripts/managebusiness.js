document.addEventListener('DOMContentLoaded', function () {
    const manageContentData = {
        manageBusiness: `
        <div class="back">
            <a href="Computer.html" class="back-btn">
                <span class="material-icons-sharp" style="position: absolute; left: -30px;">arrow_back</span>
                <h1 style="color: #111111;">Manage Business Profile</h1>
            </a>
        </div>
        <div class="signin-content">
            <div class="signin-header">
                <h3>Sign In details</h3>
            </div>
            <p style="position: absolute; top: 90px; left: 25px;">You can sign in to all linked profiles with this username and password.</p>

            <div class="username">
                <span>Username</span>
                <span style="font-weight: bold;">omphilestudent@gmail.com</span>
            </div>
            <div class="contacts">
                <span>Cellphone</span>
                <span style="font-weight: bold;">+27 60 291 0591</span>
            </div>
            <div class="Password">
                <span>Password</span>
                <span aria-hidden="true" style="font-weight: bold;">***************</span>
            </div>
            <span style="position: absolute; top: 150px; left: 1050px; color: #00aeff; cursor: pointer;">Update</span>
        </div>

        <div class="Singin-details">
            <div class="circle">KC</div>
            <div class="top">
                <span style="font-weight: bold;">Kodi Code</span>
                <span><p>Always sign me in with this profile</p></span>
            </div>
            <div class="Zenzi">Default profile</div>
            <span class="material-icons-sharp" style="position: absolute; color: #00aeff; left: 1080px; top: 35px; cursor: pointer; font-size: 20px;">more_vert</span>
            <div class="bottom" style="border-bottom: 1px solid #dddddd; width: 100%;"></div>

            <div class="user-details">
                <h1>User details</h1>
                <div class="names">
                    <span>Name</span>
                    <span style="font-weight: bold;">Omphile</span>
                </div>
                <div class="usernames">
                    <span>Surname</span>
                    <span style="font-weight: bold;">Mohlala</span>
                </div>
                <div class="contact">
                    <span>Cellphone</span>
                    <span style="font-weight: bold;">+27 60 291 0591</span>
                </div>
                <div class="email">
                    <span>Email</span>
                    <span style="font-weight: bold;">omphilemohlala@capitecbank.co.za</span>
                </div>
            </div>
        </div>

        <div class="link">
            <h2 style="position: absolute; top: 15px; left: 15px;">Linked business profiles</h2>
            <div class="profile">
                <div class="circles">om</div>
                <span class="material-icons-sharp" style="position: absolute; color: #00aeff; left: 200px; top: 35px; cursor: pointer; font-size: 30px;">more_vert</span>
                <div class="made">
                    <span>Omphile</span>
                    <span>Profile nickname</span>
                    <div class="Zenzis">Default</div>
                </div>
            </div>
            <div class="profile2">
                <img src="../images/Link-profile.png" style=" position: absolute; height: 100px; width: 100px; border-radius: 50%; top: 100px; left: 70px;">
                <span style="position:relative; top: 210px; left: 35px;">Link Business Profile</span>
            </div>
        </div>
        `
    };

    
    const mainContent = document.getElementById('mainContent');
    if (mainContent) {
        mainContent.innerHTML = manageContentData.manageBusiness;
    } else {
        console.error('No element with ID "mainContent" found.');
    }
});
