import React from 'react';

function Profile() {
    return (
        <div className="container">
            <div className="section center">
                <div className="card profile-detail z-depth-0">
                    <h4 className="purple-text">Profile</h4>
                    <div className="avatar">
                        <h2 className="avatar-name">A</h2>
                    </div>
                    <h5 className="username">Abhijeet Kushwaha</h5>
                    <p className="purple-text">Get in touch <br/>
                    <span>
                        <a href="#" className="purple-text"><i className="fas fa-external-link-alt"></i></a>
                    </span></p>
                </div>
            </div>
            <div className="section project-done">
                <h4 >Projects</h4>
                <div className="card">
                    <div className="card-content project-done-no">
                        <div className="card-title">Project 1</div>
                        <button className="btn purple">View</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile