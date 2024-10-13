import './styles.css';


import "../../work-with-emojis/add_emojis.js";

function MainPage() {
    
    return (
        <>
            <div className="WelcomeButton-container">
                <a href="/login">
                    <button className="WelcomeTransparent-btn">Log in</button>
                </a>
                <a href="/my-surveys">
                    <button className="WelcomeTransparent-btn">Sign up</button>
                </a>
                <a href="/editor">
                    <button className="WelcomeWhite-btn">Create form</button>
                </a>
            </div>
            <h1 className="WelcomeText">Welcome!</h1>
            <h2 className="WelcomeText">This is a main page</h2>

            <div className="info-box">
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
            </div>
            <div className="info-box">
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
            </div>
            <div className="info-box">
                <p>Information</p>
                <p>Information</p>
                <p>Information</p>
                
            </div>
            
        </>
    );
    
}


export default MainPage;


