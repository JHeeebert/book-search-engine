# Book Search Engine 📚
## Description
Welcome to the Book Search Engine, a platform designed to cater to avid readers who seek new books to explore. This application allows users to search for books and maintain a curated list of books for potential purchase.
## Acceptance Criteria
```md
GIVEN a book search engine
WHEN I load the search engine
THEN I am presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button
WHEN I click on the Search for Books menu option
THEN I am presented with an input field to search for books and a submit button
WHEN I am not logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site
WHEN I click on the Login/Signup menu option
THEN a modal appears on the screen with a toggle between the option to log in or sign up
WHEN the toggle is set to Signup
THEN I am presented with three inputs for a username, an email address, and a password, and a signup button
WHEN the toggle is set to Login
THEN I am presented with two inputs for an email address and a password and login button
WHEN I enter a valid email address and create a password and click on the signup button
THEN my user account is created and I am logged in to the site
WHEN I enter my account’s email address and password and click on the login button
THEN I the modal closes and I am logged in to the site
WHEN I am logged in to the site
THEN the menu options change to Search for Books, an option to see my saved books, and Logout
WHEN I am logged in and enter a search term in the input field and click the submit button
THEN I am presented with several search results, each featuring a book’s title, author, description, image, and a link to that book on the Google Books site and a button to save a book to my account
WHEN I click on the Save button on a book
THEN that book’s information is saved to my account
WHEN I click on the option to see my saved books
THEN I am presented with all of the books I have saved to my account, each featuring the book’s title, author, description, image, and a link to that book on the Google Books site and a button to remove a book from my account
WHEN I click on the Remove button on a book
THEN that book is deleted from my saved books list
WHEN I click on the Logout button
THEN I am logged out of the site and presented with a menu with the options Search for Books and Login/Signup and an input field to search for books and a submit button  
```
## Table of Contents
- [Book Search Engine 📚](#book-search-engine-)
  - [Description](#description)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Screenshots](#screenshots)
  - [License](#license)
  - [Contributing](#contributing)
  - [Questions](#questions)

## Installation
1. Clone the repository: `git clone https://github.com/jheeebert/book-search-engine.git`
2. Navigate to the project directory: `cd book-search-engine`
3. Install dependencies: `npm install`
## Usage
- Run the app: `npm start`
- Open your browser and visit: `http://localhost:3000`
## Screenshots
- **Main Page** <br>
  ![Main Page](./screenshots/mainPage.png)
- **Search** <br>
  ![Search Books](./screenshots/searchImage.png)
- **Saved Books** <br>
  ![Saved Books](./screenshots/savedBooksImage.png)
- **Delete Books** <br>
  ![Delete Books](./screenshots/deleteBooksImage.png)
- **Users** <br>
  ![Users](./screenshots/usersImage.png)
## License
[![GitHub license](https://badgen.net/github/license/jheeebert/book-search-engine)](LICENSE)
## Contributing
We welcome contributions! Please follow the steps outlined in [Contributors Covenant](https://www.contributor-covenant.org/).
## Questions
- Ask anything: [![Ask Me Anything !](https://img.shields.io/badge/Ask%20me-anything-1abc9c.svg)](https://GitHub.com/jheeebert/book-search-engine)
- Contact: jheeebertwd@gmail.com
- More of our work: [GitHub Profile](https://github.com/jheeebert/)