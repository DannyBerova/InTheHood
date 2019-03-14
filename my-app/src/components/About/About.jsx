import React, { Component } from 'react';

class About extends Component {

    render() {
        return (
            <div className="container">
                <br></br>
                <br></br>
                <div className="row">
                    <h5 className="teal-text darken-3"><strong><b>InDaHood</b></strong> SPA web app is a project undertaken as a mandatory requirement for the course </h5>
                    <h5 className="teal-text darken-3">"ReactJS Fundamentals Feb 2019" in <a href="https://softuni.bg" target="blank" >SoftUni</a>.</h5>
                    <hr></hr>
                    <h5>Overall Description</h5>
                    <h6>InDaHood is free web app hood-info-area facebook-like oriented. In the project are also implemented different user roles separated in private sections for admins and regular users. Depending on its role every user can access different sections of the application and has specific permissions of what can or cannot do. Users can read posts, edit and delete them, posts can be searched and filtered by category, also users can give stars to a specific post if they are logged in.</h6>

                    <h6>P.S In the future many more things will be added.</h6>
                    <h5>The public part is visible without authentication. This public part includes:</h5>
                    <ol className="content left">
                        <li>Application start page with all posts (from ACTIVE users) paginated on pages by 5, “Current Weather” (Sofia, Bulgaria) block, “Latest post” block, Search form, Side Navigation with filters by category, “Top rated” sorting (posts sorted by count of stars received) and ALL – revert to initial state of showing posts (newest first)</li>
                        <li>Post details page for each post without ability to give star to post or viewing creator’s info page;</li>
                        <li>User login form;</li>
                        <li>User registration form;</li>
                    </ol>
                    <h5>Registered users have personal area in the web application accessible after successful login. Their access provides:</h5>
                    <ol>
                        <li>User’s profile page with all personal post listed, personal info block, link button to “Destroy profile” page (permanently remove user from database), status info – BLOCKED/ACTIVE. Every ACTIVE user can see other active users profile page;
                        Create post page (only if user is not BLOCKED);</li>
                        <li>Post details page for each post with ability to give star to post (only if user is not BLOCKED) and link to post creator’s profile page. If post is personal – ability to edit or delete post;</li>
                        <li>Edit post page (only personal posts);</li>
                    </ol>
                    <h5>Administrator have administrative access to the system after successful login. He has all regular user abilities and the following:</h5>
                    <ol>
                        <li>Access to All users list page with personal data and link to user profile page</li>
                        <li>to BLOCK/UNBLOCK user (can not BLOCK Admin profile);</li>
                        <li>to DELETE every single post;</li>
                    </ol>
                    <p>
                        To test administrator’s functionality login with credentials username: Admin and password: 123456. To test registered user’s functionality register new user with Register form page (directly logged in after successful sign up). Blocked users are like unregistered users and their posts can't be viewed on home page.Blocked user can't create new posts and can't give stars to other's posts.
                    </p>
                </div>
            </div>
        );
    }

}
export default About;
