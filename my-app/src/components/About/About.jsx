import React from 'react';

function About(props) { 
    return (
        <div className="container">
            <br></br>
            <br></br>
            <div className="row">
                <h5 className="teal-text darken-3"><strong><b>InDaHood</b></strong> SPA web app is a project undertaken as a mandatory requirement for the course </h5>
                <h5 className="teal-text darken-3">"ReactJS Fundamentals Feb 2019" in <a href="https://softuni.bg" target="blank" >SoftUni</a>.</h5>
                <hr></hr>
                <h5>Overall Description</h5>
                <h6>InDaHood is a free web app, hood-info-area facebook-like oriented. In the project are implemented different user roles: admins, regular and guest users, each with different permissions. Depending on its role, every user can access different sections of the application and has specific permissions of what can or cannot do and see. Users can create, read posts, edit and delete them. Posts can be searched and filtered by category. Users can give stars to a specific post if they are logged in, can comment to a post, see others comments and delete their comments.</h6>

                <h6>P.S In the future many more things will be added.</h6>
                <hr></hr>
                <h5>The public part is visible without authentication. It consists of:</h5>
                <ul>
                    <li><h6>Application start page with all posts (from ACTIVE users) paginated on pages by 5, “Current Weather” (Sofia, Bulgaria) block, “Latest post” block, Search form, Side Navigation with filters by category, “Top rated” sorting (posts sorted by count of stars received) and ALL – revert to initial state of showing posts (newest first)</h6></li>
                    <li><h6>Post details page for each post without ability to give star to post or viewing creator’s info page and post comments;</h6></li>
                    <li><h6>User login form;</h6></li>
                    <li><h6>User registration form;</h6></li>
                </ul>
                <hr></hr>
                <h5>After successful login, registered users can access:</h5>
                <ul>
                    <li><h6>
                        User’s profile page with all personal posts listed, personal info block, link button to “Destroy profile” page (permanently remove user from database), current status info – BLOCKED/ACTIVE; 
                    </h6></li>
                    <li><h6>
                        Every ACTIVE user can see other active users profile page;
                    </h6></li>
                    <li><h6>
                        Create post page (only if user is not BLOCKED);
                    </h6></li>
                    <li><h6>
                        Post details page with ability to give star to a post (only if user is not BLOCKED), comment or delete own comments and link to post creator’s profile page. On own posts – ability to edit or delete post;
                    </h6></li>
                    <li><h6>
                        Edit post page (only applicable to own posts);
                    </h6></li><li><h6>
                        Delete post page (only applicable to own posts);
                    </h6></li>
                </ul>
                <hr></hr>
                <h5>Administrator has administrative access to the system after successful login. In addition to all regular user abilities he has the following:</h5>
                <ul>
                    <li><h6>
                        Access to All users list page (table) with personal data row and link to user profile page;
                    </h6></li>
                    <li><h6>
                        Rights to BLOCK/UNBLOCK user (cannot BLOCK Admin profile);
                    </h6></li>
                    <li><h6>
                        Rights to DELETE every single post;
                    </h6></li>
                    <li><h6>
                        Rights DELETE every single comment;
                    </h6></li>
                </ul>
                <hr></hr>
                <h6>
                    To test administrator’s functionality use credentials in Login page: Username: Admin and Password: 123456. To test registered user’s functionality register new user with Register form page (directly logged in after successful sign up). Blocked users are like unregistered users and their posts can't be viewed on home page. Blocked user can't create new posts, can’t add comments to posts and can't give stars to other's posts.
                </h6>
                <br></br>
            </div>
        </div>
    )
}
export default About;
