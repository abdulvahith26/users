#                                                 Authentication & Authorization

### 1. Register a User
- URL: /api/v1/auth/register // for postman {{user}} / register
- Method: POST
- Description: Registers a new user.
- Body:
```json
  
{
  "username": "vishnu",
  "email": "vishnu@example.com",
  "password": "123456"
}
```
Response:

```json
{
  "message": "User registered successfully"
}
```
### 2. Login
-URL: /api/v1/auth/login 
- Method: POST
 - Description: Logs in a user and returns a JWT token.
- Body:
```json
{
  "email": "vishnu.com",
  "password": "123456"
}
```
Response:
```json
{
  "token": "your.jwt.token"
}
```
### 3.logout
- Method : Post
- Description: logout the user bu delete the cookies 
- Boby:
  
Response:
```json
{
 "message" : "logout successfully"
}
```
### 3. Get User Profile
- URL: /api/auth/profile
- Method: GET
- Description: Fetches the details of the logged-in user.
  
Response:
```json
{
  "user": {
    "username": "vishnu",
    "email": "vishnu@example.com",
    "role" : "user"
  }
}
```
## POSTMAN DOCUMENTATION LINK
- [PostMan](https://documenter.getpostman.com/view/39602240/2sAYBUCBbq)



