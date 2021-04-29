# Pop Shop - Sleek and Functional e-Commerce Product Page

## Table of Contents

1. [In-Action](#In-Action)
2. [User-Stories](#User-Stories)
3. [Stack](#Stack)
4. [Lessons-Learned](#Lessons-Learned)
5. [Installation](#Installation)

## In-Action

![](https://thumbs.gfycat.com/NarrowHelplessArgentineruddyduck-size_restricted.gif)

# User-Stories
We worked with a lot of feedback at every stage of this project, here are the user stories we decided to explore:

## Implemented:
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


## Coming Soon:
- As a user, I want to be able to click the back button and return to the last item I was looking at.
- As a user, I want to be prompted to sign in once I get a certain distance into the purchasing process.
- As a user, I want to be able to view all items that are currently on sale.

# Stack

<table>
  <tr>
    <td>Languages</td>
    <td><img alt="JavaScript" src="https://img.shields.io/badge/javascript%20-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="NodeJS" src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="HTML5" src="https://img.shields.io/badge/html5%20-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3%20-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/></td>
  </tr>
  <tr>
    <td>Frameworks & Libraries</td>
    <td><img alt="React" src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js%20-%23404d59.svg?&style=for-the-badge"/> <img alt="Bootstrap" src="https://img.shields.io/badge/-Bootstrap-%237952B3?&style=for-the-badge&logo=Bootstrap&logoColor=white"/> <img alt="Material Ui" src="https://img.shields.io/badge/-Material--UI-%230081CB?&style=for-the-badge&logo=material-ui&logoColor=white"/></td>
  </tr>
  <tr>
  <tr>
    <td>Testing</td>
    <td><img alt="Jest" src="https://img.shields.io/badge/-jest-%23C21325?&style=for-the-badge&logo=jest&logoColor=white"/></td>
  </tr>
</table>

# Front-End

We designed our website to have a fun, primary color scheme which catches the eye and stands out from the crowd. We developed smooth transitions between different views and products resulting in an enjoyable, and consistent user experience. Similar to modern social media sites, we designed our side to be composed of many small, modular components. Whether it be buttons, reveiw ratings, or thumbnail components, re-usability was a primary focus and contributes to the scalability of Pop Shop

# Deployment

This site is currently being dockerized for deployment to an AWS TC2 instance.

# Work Flow

## Git Workflow
![](https://thumbs.gfycat.com/GrippingLazyGannet-size_restricted.gif)

We have one main branch that branches out to staging. Our staging branch is where we merge our features until we have a batch of tested, functioning features in staging at which point we will merge staging to main.

# Lessons-Learned
This project is the result of four, ambitous software engineers all eager to create a viable product and learn from the experience. As hungry developers, we learned a lot throughout this process. Here is some of what we learned:

## Challenges

## Learnings

## Potential Improvements

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