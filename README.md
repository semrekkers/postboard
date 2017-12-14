# PostBoard

## Table of Contents

**TODO**

## About

PostBoard is a small message platform. It has basic User Management and Post Management. Users can create their own posts, comments on them or others and add posts to their Favourites.

## Features

- User authentication
- User authorizations
- Post management (CRUD)
- Post comments
- ~~Favourites list~~

## Dependencies

- [Node.js](https://nodejs.org/) 9.2.0
- [MongoDB](https://www.mongodb.com/) 3.4.10
- [Neo4j](https://neo4j.com/) 3.3.1
- [Caddy](https://caddyserver.com/) 0.10.10

## Installation

- Create a `.env` file, see `env.example.txt` for an example.
- Run the backend: `npm run debug`.
- Run the frontend: `ng serve --open`.

## Basic design

## API

The current API version is `v1`. API prefix for all paths is `/api/v1`.

### Sessions

|Method     |Path               |Description                               |
|-----------|-------------------|------------------------------------------|
|`POST`     |`/sessions`        |Creates a new session (login). Requires credentials.|

### Users

|Method     |Path               |Description                               |
|-----------|-------------------|------------------------------------------|
|`POST`     |`/users`           |Creates a new user (signup).              |
|`GET`      |`/users/:id`       |Get a single user.                        |
|`PATCH`    |`/users/:id`       |Update user.                              |
|`DELETE`   |`/users/:id`       |Delete user.                              |

### Posts

|Method     |Path               |Description                               |
|-----------|-------------------|------------------------------------------|
|`POST`     |`/posts`           |Creates a new post.                       |
|`GET`      |`/posts/:id`       |Get a single post.                        |
|`PATCH`    |`/posts/:id`       |Update post.                              |
|`DELETE`   |`/posts/:id`       |Delete post.                              |

### Comments

|Method     |Path                       |Description                       |
|-----------|---------------------------|----------------------------------|
|`POST`     |`/posts/:id/comments`      |Creates a new post.               |
|`GET`      |`/posts/:id/comments`      |Get a single post.                |
|`PATCH`    |`/posts/:id/comments/:id`  |Update post.                      |
|`DELETE`   |`/posts/:id/comments/:id`  |Delete post.                      |

### Favorites

|Method     |Path               |Description                               |
|-----------|-------------------|------------------------------------------|
|`POST`     |`/favorites`       |Add post to favorites.                    |
|`GET`      |`/favorites`       |Get all favorite posts.                   |
|`DELETE`   |`/favorites/:id`   |Delete post from favorites.               |

## Color scheme

|Type           |Name               |RGB            |
|---------------|-------------------|---------------|
|Primary        |Material Blue 500  |#2196f3        |
|Secondary      |Material Pink 400  |#ec407a        |

## Docker images

The base image for the backend is [semrekkers/caddy-node](https://hub.docker.com/r/semrekkers/caddy-node/).

## Why this project

This is a project for the MongoDB, Express, Angular, Node (MEAN) course of my current study. In addition, Neo4j is also a requirement for this course. I use it mainly for data relations in this project.

## Student information

|Name:      |Sem Rekkers        |
|-----------|-------------------|
|Studentnr: |2114085            |