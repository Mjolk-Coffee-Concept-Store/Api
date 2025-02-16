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

### Consumables

| Method | Route            | Description          | Security                |
| ------ | ---------------- | -------------------- | ----------------------- |
| GET    | /consumables     | Gets consumables     | N/A                     |
| POST   | /consumables     | Creates a consumable | Requires authentication |
| GET    | /consumables/:id | Gets a consumable    | N/A                     |
| DELETE | /consumables/:id | Deletes a consumable | Requires authentication |
| PUT    | /consumables/:id | Updates a consumable | Requires authentication |

### Brunchs

#### Brunchs

| Method | Route       | Description      | Security                |
| ------ | ----------- | ---------------- | ----------------------- |
| GET    | /brunchs    | Gets brunchs     | N/A                     |
| POST   | /brunchs    | Creates a brunch | Requires authentication |
| GET    | /brunchs:id | Gets a brunch    | N/A                     |
| DELETE | /brunchs:id | Deletes a brunch | Requires authentication |
| PUT    | /brunchs:id | Updates a brunch | Requires authentication |

#### Brunch Items

| Method | Route                         | Description                          | Security                |
| ------ | ----------------------------- | ------------------------------------ | ----------------------- |
| GET    | /brunchs/:id/items            | Gets brunch items                    | N/A                     |
| GET    | /brunchs/:id/items/:itemId    | Gets a brunch item                   | N/A                     |
| POST   | /brunchs/:id/items            | Creates a brunch item                | Requires authentication |
| POST   | /brunchs/:id/items/collection | Creates a collection of brunch items | Requires authentication |
| DELETE | /brunchs/:id/items/:itemId    | Deletes a brunch item                | Requires authentication |
| DELETE | /brunchs/:id/items            | Deletes all brunch items             | Requires authentication |
| PUT    | /brunchs/:id/items/:itemId    | Updates a brunch item                | Requires authentication |

#### Brunch Reservations

| Method | Route                         | Description                  | Security                |
| ------ | ----------------------------- | ---------------------------- | ----------------------- |
| GET    | /brunchs/:id/reservations     | Gets brunch reservations     | Requires authentication |
| GET    | /brunchs/:id/reservations/:id | Gets a brunch reservation    | Requires authentication |
| POST   | /brunchs/:id/reservations     | Creates a brunch reservation | Requires authentication |
| DELETE | /brunchs/:id/reservations/:id | Deletes a brunch reservation | Requires authentication |
| PUT    | /brunchs/:id/reservations/:id | Updates a brunch reservation | Requires authentication |

#### Brunch Orders

| Method | Route                                           | Description            | Security                |
| ------ | ----------------------------------------------- | ---------------------- | ----------------------- |
| GET    | /brunchs/:id/reservations/:reservationId/orders | Gets brunch orders     | Requires authentication |
| POST   | /brunchs/:id/reservations/:reservationId/orders | Creates a brunch order | Requires authentication |
