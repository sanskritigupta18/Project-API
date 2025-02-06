# Project Api
## API Endpoints

| Method | Endpoint       | Description          |
|--------|----------------|----------------------|
| POST    | /api/v1/project/create     |  Create new project  |
| GET   | /api/v1/project/get     | Get all the project    |
| PATCH    | /api/v1/project/update| Update project details |
| DELETE    | /api/v1/project/delete | Delete project entry |

## User Endpoints

| Method | Endpoint                | Description               |
|--------|-------------------------|---------------------------|
| POST   | /api/v1/user/register   | Register new user         |
| POST   | /api/v1/user/login      | Login user                |
| POST   | /api/v1/user/logout     | Logout user               |
| POST   | /api/v1/user/refresh-token | Refresh access token  |
| POST   | /api/v1/user/change-password | Change user password |
| GET    | /api/v1/user/current-user | Get current user details |

## API Response Examples

### Create Project
**Request:**
```json
POST /api/v1/project/create
{
    "title": "New Project",
    "description": "Project description",
    "image": "image_url",
    "github_url": "github_url",
    "project_url": "project_url",
    "techstack": ["tech1", "tech2"]
}
```

**Response:**
```json
{
    "status": 201,
    "data": {
        "title": "New Project",
        "description": "Project description",
        "image": "image_url",
        "github_url": "github_url",
        "project_url": "project_url",
        "techstack": ["tech1", "tech2"],
        "userId": "user_id"
    },
    "message": "Project created successfully"
}
```

### Get Projects
**Request:**
```json
GET /api/v1/project/get
{
    "apikey": "user_api_key"
}
```

**Response:**
```json
{
    "status": 200,
    "data": [
        {
            "title": "Project 1",
            "description": "Description 1",
            "image": "image_url_1",
            "github_url": "github_url_1",
            "project_url": "project_url_1",
            "techstack": ["tech1", "tech2"],
            "userId": "user_id"
        },
        {
            "title": "Project 2",
            "description": "Description 2",
            "image": "image_url_2",
            "github_url": "github_url_2",
            "project_url": "project_url_2",
            "techstack": ["tech3", "tech4"],
            "userId": "user_id"
        }
    ],
    "message": "Projects fetched successfully"
}
```

### Update Project
**Request:**
```json
PATCH /api/v1/project/update
{
    "projectId": "project_id",
    "title": "Updated Project",
    "description": "Updated description",
    "image": "updated_image_url",
    "github_url": "updated_github_url",
    "project_url": "updated_project_url",
    "techstack": ["updated_tech1", "updated_tech2"]
}
```

**Response:**
```json
{
    "status": 200,
    "data": {
        "title": "Updated Project",
        "description": "Updated description",
        "image": "updated_image_url",
        "github_url": "updated_github_url",
        "project_url": "updated_project_url",
        "techstack": ["updated_tech1", "updated_tech2"],
        "userId": "user_id"
    },
    "message": "Project updated successfully"
}
```

### Delete Project
**Request:**
```json
DELETE /api/v1/project/delete
{
    "projectId": "project_id"
}
```

**Response:**
```json
{
    "status": 200,
    "data": {},
    "message": "Project deleted successfully"
}
```

### Register User
**Request:**
```json
POST /api/v1/user/register
{
    "email": "user@example.com",
    "password": "user_password"
}
```

**Response:**
```json
{
    "status": 201,
    "data": {
        "email": "user@example.com",
        "apikey": "generated_api_key"
    },
    "message": "User created successfully"
}
```

### Login User
**Request:**
```json
POST /api/v1/user/login
{
    "email": "user@example.com",
    "password": "user_password"
}
```

**Response:**
```json
{
    "status": 200,
    "data": {
        "user": {
            "email": "user@example.com"
        },
        "accessToken": "generated_access_token",
        "refreshToken": "generated_refresh_token"
    },
    "message": "User logged in successfully"
}
```

### Logout User
**Request:**
```json
POST /api/v1/user/logout
{
    "apikey": "user_api_key"
}
```

**Response:**
```json
{
    "status": 200,
    "data": {},
    "message": "User logged out"
}
```

### Refresh Access Token
**Request:**
```json
POST /api/v1/user/refresh-token
{
    "refreshToken": "existing_refresh_token"
}
```

**Response:**
```json
{
    "status": 200,
    "data": {
        "accessToken": "new_access_token",
        "refreshToken": "new_refresh_token"
    },
    "message": "Token is updated"
}
```

### Change Password
**Request:**
```json
POST /api/v1/user/change-password
{
    "oldPassword": "old_password",
    "newPassword": "new_password"
}
```

**Response:**
```json
{
    "status": 200,
    "data": {},
    "message": "Password changed successfully"
}
```

### Get Current User
**Request:**
```json
GET /api/v1/user/current-user
{
    "apikey": "user_api_key"
}
```

**Response:**
```json
{
    "status": 200,
    "data": {
        "email": "user@example.com",
        "apikey": "user_api_key"
    },
    "message": "User details fetched successfully"
}
```
