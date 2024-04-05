# Sprint 21 - Message app

## TODO

Now that we have the user authenticating, we want to make sure we can store that user's information in our Database

Auth 0 fields:
- email
- family_name
- given_name
- locale
- name -> displayName
- nickname -> username
- picture
- sub
- updated_at



1. Save User info on our backend
   1. Create user model
   2. Setup user routes & controllers
      1. List
      2. Get user by id
      3. Update user
   3. Test routes via postman 
   4. Hook up BE routes w/ our FE (Register / sign in & create user)
2. Get user on the Client
   1. Option 1: use Auth0 "user.sub" to fetch the user from the BE everytime we land on the profile
   2. Option 2: store the user returned from the create or update user BE endpoint, pass the user state in from the top level app, prop drill everywhere we might need it
   3. Option 3: Create a context to keep track of the user across our app
   

3. Add ability for the user to post messages
   1. Create the message model
      1. Will need to figure out how to associate the user with the message
   2. Setup routes & controllers
      1. Create a message
      2. Get all messages
4. List all messages on feed
   1. Hook up client to BE routes
5. Ability to view a user's profile
   1. Start with current authenticated user
   2. Generalize user profile and routes to allow fetching of any user's profile
6. Show a specific user's messages on their profile - two options
   1. Store messages from feed request in context, filter based on user id in the profile
   2. On the user profile, use the user ID to hit the BE & get a list of messages
7. Add Update and Delete message functionality on the BE
   1. Update routes and controllers
   2. Test in postman
8. Client side update and delete messages funcitonality w/ the backend endpoints
9.  Implement Auth0 on the BE - Only authenticated users can:
      1. Perform actions on messages (Create, Update, Delete)
      2. Get a user's profile information
    
10. Websockets for realtime updates
    

V1:
1. Add Ability to "Like" a message