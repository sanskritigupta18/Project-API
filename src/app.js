import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

import userRoute from "../src/routes/user.routes.js";
import projectRoute from "../src/routes/project.routes.js";

app.use("/api/v1/user",userRoute);
app.use("/api/v1/project",projectRoute);

app.get("/api/v1/health-check", (req,res) => {
    return res.status(200).json({message: "Good"});
});

app.get('/api/v1/api-docs', (req, res) => {
    const htmlResponse = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project API Documentation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f4f7fc;
        }
        h1 {
            text-align: center;
            color: #333;
        }
        h2 {
            color: #555;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        pre {
            background-color: #f1f1f1;
            padding: 10px;
            border-radius: 5px;
            font-size: 14px;
            word-wrap: break-word;
            white-space: pre-wrap;
        }
        .section {
            margin-bottom: 40px;
        }
    </style>
</head>
<body>

    <h1>Project API Documentation</h1>

    <div class="section">
        <h2>API Endpoints</h2>
        <table>
            <thead>
                <tr>
                    <th>Method</th>
                    <th>Endpoint</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>POST</td>
                    <td>/api/v1/project/create</td>
                    <td>Create new project</td>
                </tr>
                <tr>
                    <td>GET</td>
                    <td>/api/v1/project/get</td>
                    <td>Get all the projects</td>
                </tr>
                <tr>
                    <td>PATCH</td>
                    <td>/api/v1/project/update</td>
                    <td>Update project details</td>
                </tr>
                <tr>
                    <td>DELETE</td>
                    <td>/api/v1/project/delete</td>
                    <td>Delete project entry</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>User Endpoints</h2>
        <table>
            <thead>
                <tr>
                    <th>Method</th>
                    <th>Endpoint</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>POST</td>
                    <td>/api/v1/user/register</td>
                    <td>Register new user</td>
                </tr>
                <tr>
                    <td>POST</td>
                    <td>/api/v1/user/login</td>
                    <td>Login user</td>
                </tr>
                <tr>
                    <td>POST</td>
                    <td>/api/v1/user/logout</td>
                    <td>Logout user</td>
                </tr>
                <tr>
                    <td>POST</td>
                    <td>/api/v1/user/refresh-token</td>
                    <td>Refresh access token</td>
                </tr>
                <tr>
                    <td>POST</td>
                    <td>/api/v1/user/change-password</td>
                    <td>Change user password</td>
                </tr>
                <tr>
                    <td>GET</td>
                    <td>/api/v1/user/current-user</td>
                    <td>Get current user details</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="section">
        <h2>API Response Examples</h2>
        <h3>Create Project</h3>
        <p><strong>Request:</strong></p>
        <pre>POST /api/v1/project/create
{
    "title": "New Project",
    "description": "Project description",
    "image": "image_url",
    "github_url": "github_url",
    "project_url": "project_url",
    "techstack": ["tech1", "tech2"]
}
        </pre>
        <p><strong>Response:</strong></p>
        <pre>{
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
}</pre>

        <h3>Get Projects</h3>
        <p><strong>Request:</strong></p>
        <pre>GET /api/v1/project/get
{
    "apikey": "user_api_key"
}</pre>
        <p><strong>Response:</strong></p>
        <pre>{
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
}</pre>

        <h3>Update Project</h3>
        <p><strong>Request:</strong></p>
        <pre>PATCH /api/v1/project/update
{
    "projectId": "project_id",
    "title": "Updated Project",
    "description": "Updated description",
    "image": "updated_image_url",
    "github_url": "updated_github_url",
    "project_url": "updated_project_url",
    "techstack": ["updated_tech1", "updated_tech2"]
}</pre>
        <p><strong>Response:</strong></p>
        <pre>{
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
}</pre>

        <h3>Delete Project</h3>
        <p><strong>Request:</strong></p>
        <pre>DELETE /api/v1/project/delete
{
    "projectId": "project_id"
}</pre>
        <p><strong>Response:</strong></p>
        <pre>{
    "status": 200,
    "data": {},
    "message": "Project deleted successfully"
}</pre>

        <h3>Register User</h3>
        <p><strong>Request:</strong></p>
        <pre>POST /api/v1/user/register
{
    "email": "user@example.com",
    "password": "user_password"
}</pre>
        <p><strong>Response:</strong></p>
        <pre>{
    "status": 201,
    "data": {
        "email": "user@example.com",
        "apikey": "generated_api_key"
    },
    "message": "User created successfully"
}</pre>

        <h3>Login User</h3>
        <p><strong>Request:</strong></p>
        <pre>POST /api/v1/user/login
{
    "email": "user@example.com",
    "password": "user_password"
}</pre>
        <p><strong>Response:</strong></p>
        <pre>{
    "status": 200,
    "data": {
        "user": {
            "email": "user@example.com"
        },
        "accessToken": "generated_access_token",
        "refreshToken": "generated_refresh_token"
    },
    "message": "User logged in successfully"
}</pre>

        <h3>Logout User</h3>
        <p><strong>Request:</strong></p>
        <pre>POST /api/v1/user/logout
{
    "apikey": "user_api_key"
}</pre>
        <p><strong>Response:</strong></p>
        <pre>{
    "status": 200,
    "data": {},
    "message": "User logged out"
}</pre>

        <h3>Refresh Access Token</h3>
        <p><strong>Request:</strong></p>
        <pre>POST /api/v1/user/refresh-token
{
    "refreshToken": "existing_refresh_token"
}</pre>
        <p><strong>Response:</strong></p>
        <pre>{
    "status": 200,
    "data": {
        "accessToken": "new_access_token",
        "refreshToken": "new_refresh_token"
    },
    "message": "Token is updated"
}</pre>

        <h3>Change Password</h3>
        <p><strong>Request:</strong></p>
        <pre>POST /api/v1/user/change-password
{
    "oldPassword": "old_password",
    "newPassword": "new_password"
}</pre>
        <p><strong>Response:</strong></p>
        <pre>{
    "status": 200,
    "data": {},
    "message": "Password changed successfully"
}</pre>

        <h3>Get Current User</h3>
        <p><strong>Request:</strong></p>
        <pre>GET /api/v1/user/current-user
{
    "apikey": "user_api_key"
}</pre>
        <p><strong>Response:</strong></p>
        <pre>{
    "status": 200,
    "data": {
        "email": "user@example.com",
        "apikey": "user_api_key"
    },
    "message": "User details fetched successfully"
}</pre>
    </div>

</body>
</html>`;
    res.send(htmlResponse);
  });  

export { app };
