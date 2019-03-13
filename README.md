# InDaHood

## Introduction

### InDaHood SPA web app is a project undertaken as a mandatory requirement for the course “ReactJS Fundamentals Feb 2019” in SoftUni.

## Overall Description

InDaHood is free web app hood-info-area facebook-like oriented. Users can read posts, edit and delete them, posts can be searched and filtered by category, also users can give stars to a specific post if they are logged in. 

  The public part is visible without authentication. This public part includes:
*	Application start page with all posts (from ACTIVE users) paginated on pages by 5, 
  “Current Weather” (Sofia, Bulgaria) block, 
  “Latest post” block,
  Search form, 
  Side Navigation with filters by category, 
  “Top rated” sorting (posts sorted by count of stars received) and ALL – revert to initial state of showing posts (newest first)
*	Post details page for each post without ability to give star to post or viewing creator’s info page;
*	User login form;
*	User registration form;

  Registered users have personal area in the web application accessible after successful login. Their access provides:
*	User’s profile page with all personal post listed, 
  personal info block, 
  link button to “Destroy profile” page (permanently remove user from database), 
  status info – BLOCKED/ACTIVE. 
  Every ACTIVE user can see other active users profile page;
*	Create post page (only if user is not BLOCKED);
*	Post details page for each post with ability to give star to post (only if user is not BLOCKED) 
  and link to post creator’s profile page. If post is personal – ability to edit or delete post;
*	Edit post page (only personal posts);

  Administrator have administrative access to the system after successful login. He has all regular user abilities and the following:
*	Access to All users list page with personal data and link to user profile page.
*	to BLOCK/UNBLOCK user (can not BLOCK Admin profile);
*	to DELETE every single post;

  To test administrator’s functionality use username: Admin and password: 123456.
  To test registered user’s functionality register new user with Register form page (directly logged in after successful sign up).
  Blocked users are like unregistered users and their posts can't be viewed on home page.Blocked user can't create new posts and can't give     stars to other's posts.

## Installation . 

### Server: “server” folder (Express server Api)
  #### Install the dependencies *npm i* and start the client *npm start* or *nodemon* (port: 5000).
  This project was created with [Express] version 4.16.4.

### Client: “my-app” folder (React web app)
  #### Install the dependencies *npm i* and start the client *npm start* (port: 3000).
  This project was generated with [React] version 16.8.3.
  The app will automatically reload if you change any of the source files.

### *Author* 
  Danny Berova https://github.com/DannyBerova/InTheHood





