# Mjölk API

## Introduction

This repository contains the core API for the coffee shop Mkölk. The API is built using Express Typescript, and is documented using Swagger.

## Routes

### Users

| Method | Route           | Description           | Security                |
| ------ | --------------- | --------------------- | ----------------------- |
| GET    | /users/login    | Logs in a user        | N/A                     |
| POST   | /users/register | Creates a user        | N/A                     |
| GET    | /users/whoami   | Gets the current user | Requires authentication |

### Recommenations

| Method | Route                | Description              | Security                |
| ------ | -------------------- | ------------------------ | ----------------------- |
| GET    | /recommendations     | Gets recommendations     | Requires authentication |
| POST   | /recommendations     | Creates a recommendation | N/A                     |
| GET    | /recommendations/:id | Gets a recommendation    | Requires authentication |
| DELETE | /recommendations/:id | Deletes a recommendation | Requires authentication |
