#express-store
This repository contains the source code of an Express application implementing token based authentication, with store APIs, and dedicated frontend service as well

**How to get the Backend service up and running?**
Follow the steps : 

1. Open Store-Backend
2. Go to server->configs->server.config.js
3. Establish a secure db connection, preferrably would be using an .env instead of directly using the credentials
4. Save the above changes and now open terminal in Store backend directory and type "npm start"
5. The file will automatically run the DDL commands to create the db and related tables for the same.

**Postman Collection
**
1. The postman collection only refers to how the APIs look like, running them directly would lead to 401 Unauthorized user as the token expiry has been set to 10minutes only.
2. To use the same, don't forget to update the token in the authorization header.
