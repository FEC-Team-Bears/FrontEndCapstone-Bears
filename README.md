# Pop Shop - Sleek and Functional e-Commerce Product Page

## Table of Contents

1. [In-Action](#In-Action)
2. [User-Stories](#User-Stories)
3. [Stack](#Stack)
4. [Front-End](#Front-End)
5. [Deployment](#Deployment)
6. [Work-Flow](#Work-Flow)
7. [Lessons-Learned](#Lessons-Learned)
8. [Contributors](#Contributors)
9. [Installation](#Installation)

## In-Action

![Demo of Product Overview](https://thumbs.gfycat.com/NarrowHelplessArgentineruddyduck-size_restricted.gif)

## User-Stories
We worked with a lot of feedback at every stage of this project, here are the user stories we decided to explore:

## Implemented
- As a user, I want a fun, colourful ui.
- As a user, I want to be able to see a rating for the currently selected item at the top of the page.
- As a user, I want to be able to see the name, style, price, features, and description of the product without scrolling down.
- As a user, I want to be able to make a post about the product to a variety of social media platforms.
- As a user, I want to be able to see previews of other styles of the selected product.
- As a user, I want to be able to see a variety of images for the selected product with a variety of views/zooms.
- As a user, I want to be able to add items to my cart after selecting the style, size, and quantity and I want these items to stay in my cart in between sessions.

- As a user, I want to be able to view related items to my currently selected item.
- As a user, I want to be able to add multiple items to a list that represents an outfit.

- As a user, I want to be able to view questions and answers posted by other users related to my currently selected item.
- As a user, I want to be able to ask questions and post answers which are viewable by other users related to my currently selected item.

- As a user, I want to be able to read reviews posted by other users for my currently selected product.
- As a user, I want to be able to write reviews that can be seen by other users for my currently selected product.


## Coming Soon
- As a user, I want to be able to click the back button and return to the last item I was looking at.
- As a user, I want to be prompted to sign in once I get a certain distance into the purchasing process.
- As a user, I want to be able to view all items that are currently on sale.

## Stack

<table>
  <tr>
    <td>Languages</td>
    <td><img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
    <img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/>
    <img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>
    <img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/></td>
  </tr>
  <tr>
    <td>Frameworks & Libraries</td>
    <td><img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/>
    <img alt="Bootstrap" src="https://img.shields.io/badge/-Bootstrap-%237952B3?&style=for-the-badge&logo=Bootstrap&logoColor=white"/>
    <img alt="Material Ui" src="https://img.shields.io/badge/-Material--UI-%230081CB?&style=for-the-badge&logo=material-ui&logoColor=white"/></td>
  </tr>
  <tr>
  <tr>
    <td>Testing</td>
    <td><img alt="Jest" src="https://img.shields.io/badge/-jest-%23C21325?&style=for-the-badge&logo=jest&logoColor=white"/></td>
  </tr>
</table>

## Front-End

- We designed our website to have a fun, primary color scheme which catches the eye and stands out from the crowd.
- We developed smooth transitions between different views and products resulting in an enjoyable, and consistent user experience. Similar to modern social media sites, we designed our site to be composed of many small, modular components.
- Whether it be buttons, reveiw ratings, or thumbnail components, re-usability was a primary focus and contributes to the scalability of Pop Shop

## Deployment

This site is currently being dockerized for deployment to an AWS EC2 instance.

## Work-Flow

## Git Workflow
![Gif showing Git History](https://thumbs.gfycat.com/GrippingLazyGannet-size_restricted.gif)

We have one main branch that branches out to staging. Our staging branch is where we merge our features until we have a batch of tested, functioning features in staging at which point we will merge staging to main.

## Lessons-Learned
This project is the result of four, ambitous software engineers all eager to create a viable product and learn from the experience. As hungry developers, we learned a lot throughout this process. Here is some of what we learned:

## Challenges
- Each of us selected new technologies to use during this project. Among them, React Hooks, Material UI, Bootstrap, and JCarousel. We gained insight on assessing new technologies prior to using them in addition to practical experience with these libraries.
- Creating the various carousels on the site led us towards the JCarousel library which is a JQuery plug-in. Unfortunately, the use of JQuery caused some longer load times than we wanted on our site. Currently we are writing our own carousel library in order to avoid having to use JQuery as a library.
- Whilst working on this project, we used CSS for styling beyond standard Bootstrap and Material UI styles. Although we adhered to our agreed upon naming conventions for components and styles related to those components, we did end up running into some styling collisions. To fix this, we plan on using individual stylesheets for each component. Alternatively, we could use Tailwind.

## Learnings
- The importance of start-of-project planning was very apparent by day 3 of this project when our file structure began to gain complexity. Naming, file structure, and library use conventions had not been a part of our initial planning portion of this project.  It will definitely be a big part of the day 1 planning process for each of us from now on.
- Time-Boxing became more and more important as we began to travel into uncharted territory. Being unable to decisively predict the time to implement some feature created speedbumps in our development process.
- After reflecting on this, our team decided to make hard cutoffs for certain functionality/features that were not a part of the core functionality of the site in order to keep us on track for our deadline.

## Potential Improvements
- Make this page a multi-page site using React Router. Enabling the user to navigate between products via the back and forward buttons on their browser.
- Create a log in functionality.
- Store user's cart information in a visually available location
- Improve accessibility of the page by following accessibility guidelines in lighthouse
- Continue to build out unit tests, end-to-end testing, and CCID testing.

## Contributors

[Steve Gackstetter](https://github.com/stevehackreactor)| [Cindy Ryoo](https://github.com/cindyryoo7)| [John Cooke](https://github.com/john-cooke832)| [Matt Collins](https://github.com/matt-collins087)

## Installation

1. Clone the repository:
```sh
git clone <your_repo_link>
```
2. Navigate to the root directory of the repository:
```sh
cd FrontEndCapstone-Bears
```
3. If you haven't already created an individual branch, create a branch:
```sh
git checkout -b <your_branch_name>
```
4. If you have already created an individual branch, navigate to that branch:
```sh
git branch <your_branch_name>
```
5. Install dependencies:
```sh
npm install
```
6. Bundle and compile the frontend code:
```sh
npm run start-client
```
7. Open a new terminal and start the server:
```sh
npm run start-server
```
8. View the client on the browser at the following address:
```sh
localhost:3000
```