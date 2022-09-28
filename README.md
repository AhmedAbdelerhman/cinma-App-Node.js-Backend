# Movies-DashBord
create a new dashboard that enables the user to manage the movies and other admins.
 ## testing
  - use postman
  - use FrontEnd

  ## How to setup
   - git clone https://github.com/AhmedAbdelerhman/cinma-App-Node.js-Backend
   - npm install
   - npm start || npm run dev

   ## Features
    - auth using jwt
    - CRUD operation for only creator
    - login and register
    - filters (name /rate /category) 
  ## dependencies 
    - express
    - jsonwebtoken
    - bcrypt
    - mongoose
    - multer

  
  ## API Endpoints
 #### user 
- POST api/user/signup
- POST api/user/login
- get    api/user
- get  api/user/profile 
     ##### Profile is to get movies and categories created by login user

 #### Movie 
- POST api/movie/new-movie
- get  api/movie?
    filters is (rate&category&search)
- update  api/movie/:id 
- delete  api/movie/:id 
 #### categoey 
- POST api/category/new-category
- get  api/category/
- update  api/category/:id 
- delete  api/category/:id 


