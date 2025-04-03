# Leave manager
A simple app for an easy leave management among employers and employees.

---

# Setup

## Step 0: Prerequisites:

- Node.js v18.x.x (install [here](https://nodejs.org/en/download))

## Step 1: Installation

1. Download the installation script (`install.sh`) from this repository.
2. Open it in a text editor.
3. Edit the variables inside the 'Settings' section (documentation below).
4. Save the file.
5. Run the script.

### `GIT_REPO`

The URL of the repository to clone.

### `DEST_DIR`

The path to the directory to clone the files.

## Step 2: API server configuration

1. Edit the `api/v1/.env` file (documentation below).
2. Run the `start-api` command to start the API server.

### `URI`

The database's URI.

### `PORT`

The API server's port.

### `SECRET_ACCESS_TOKEN`

The API server's secret access token.

### `REFRESH_TOKEN`

The API server's refresh token.

## Step 3: Mobile client server configuration

1. Edit the `client-mobile/.env` file (documentation below).
2. Run the `start-client-mobile` command to start the mobile client.

> [!NOTE]
> This will start a development build. If you want to build the mobile client for production and distribute it on Google Play or App Store, [here's the guide](https://docs.expo.dev/build/setup/).

### `EXPO_PUBLIC_LOCALE`

The server locale's name (e.g. `en-US`, `pt-PT` etc.).

### `EXPO_PUBLIC_API_URL`

The API server's URL (e.g. `https://api.myserver.net:8080`).

> [!NOTE]
> If the API server is located on the same network as the client server, use the local IP address of the API server (e.g. `http://10.0.1.11:8080`).

---

# API documentation

## Table of Contents

- [Resources](#resources)
  - [Role](#role)
  - [LeaveType](#leavetype)
  - [LeaveStatus](#leavestatus)
  - [Address](#address)
  - [Company](#company)
  - [User](#user)
  - [LeaveRequest](#leaverequest)
- [Endpoints](#endpoints)
  - [User](#user)
    - [`GET /v1/users/view`](#get-v1usersview)
    - [`PUT /v1/users/create`](#put-v1userscreate)
    - [`PATCH /v1/users/update`](#patch-v1usersupdate)
    - [`DELETE /v1/users/delete`](#delete-v1usersdelete)
  - [Leave Request](#leave-request)
    - [`GET /v1/leaveRequests/view`](#get-v1leaverequestsview)
    - [`PUT /v1/leaveRequests/create`](#put-v1leaverequestscreate)
    - [`PATCH /v1/leaveRequests/update`](#patch-v1leaverequestsupdate)
    - [`DELETE /v1/leaveRequests/delete`](#delete-v1leaverequestsdelete)
  - [Company](#company)
    - [`GET /v1/companies/view`](#get-v1companiesview)
    - [`PUT /v1/companies/create`](#put-v1companiescreate)
    - [`PATCH /v1/companies/update`](#patch-v1companiesupdate)
    - [`DELETE /v1/companies/delete`](#delete-v1companiesdelete)
  - [Address](#address)
    - [`GET /v1/addresses/view`](#get-v1addressesview)
    - [`PUT /v1/addresses/create`](#put-v1addressescreate)
    - [`PATCH /v1/addresses/update`](#patch-v1addressesupdate)
    - [`DELETE /v1/addresses/delete`](#delete-v1addressesdelete)

---

## Resources

### Role
- `admin`
- `manager`
- `employee`

### LeaveType
- `vacation`
- `casual`

### LeaveStatus
- `pending`
- `approved`
- `rejected`

### Address
```ts
id: number
country: string
postalCode: string
state: string
street: string
city: string
buildingNumber: string
apartmentNumber: string
```

### Company
```ts
id: number
name: string
address: Address
employees: User[]
```

### User
```ts
id: number
email: string
authToken: string
password: string
firstName: string
lastName: string
role: Role
isActive: boolean
avatarUrl: string | null
middleName: string | null
phoneNumber: string | null
address: Address | null
company: Company | null
companyRole: string | null
```

### LeaveRequest
```ts
id: string
user: User
leaveType: LeaveType
startDate: Date
endDate: Date
status: LeaveStatus
userComment: string | null
managerComment: string | null
createdAt: Date
updatedAt: Date | null
```

---

## Endpoints

> [!IMPORTANT]
> Every `GET` endpoint has to have its parameters in the URL query. The rest of the endpoints have to have their parameters in the body of the request.
> 
> Example `GET` request URL: `/v1/users/view?fields[email]=true&fields[address][country]=true&where[id]=1`

### User

#### `GET /v1/users/view`
##### Request
- **`fields`:**
  ```ts
  id: boolean
  email: boolean
  authToken: boolean
  password: boolean
  firstName: boolean
  lastName: boolean
  role: boolean
  isActive: boolean
  avatarUrl: boolean
  middleName: boolean
  phoneNumber: boolean
  address:
    id: boolean
    country: boolean
    postalCode: boolean
    state: boolean
    street: boolean
    city: boolean
    buildingNumber: boolean
    apartmentNumber: boolean
  company:
    id: boolean
    name: boolean
    address: boolean
    employees: boolean
  companyRole: boolean
  ```
- **`where`:** `User`

##### Response
- **`data`:** `User`

#### `PUT /v1/users/create`
##### Request
- **`data`:** `User`

##### Response
- **`data`:** `User`

#### `PATCH /v1/users/update`
##### Request
- **`data`:** `User`
- **`where`:** `User`

##### Response
- **`data`:** `User`

#### `DELETE /v1/users/delete`
##### Request
- **`where`:** `User`

##### Response
(nothing)

---

### Leave Request

#### `GET /v1/leaveRequests/view`
##### Request
- **`fields`:**
  ```ts
  id: boolean
  user:
    id: boolean
    email: boolean
    authToken: boolean
    password: boolean
    firstName: boolean
    lastName: boolean
    role: boolean
    isActive: boolean
    avatarUrl: boolean
    middleName: boolean
    phoneNumber: boolean
    address:
      id: boolean
      country: boolean
      postalCode: boolean
      state: boolean
      street: boolean
      city: boolean
      buildingNumber: boolean
      apartmentNumber: boolean
    company:
      id: boolean
      name: boolean
      address: boolean
      employees: boolean
    companyRole: boolean
  leaveType: boolean
  startDate: boolean
  endDate: boolean
  status: boolean
  userComment: boolean
  managerComment: boolean
  createdAt: boolean
  updatedAt: boolean
  ```
- **`where`:** `LeaveRequest`

##### Response
- **`data`:** `LeaveRequest`

#### `PUT /v1/leaveRequests/create`
##### Request
- **`data`:** `LeaveRequest`

##### Response
- **`data`:** `LeaveRequest`

#### `PATCH /v1/leaveRequests/update`
##### Request
- **`data`:** `LeaveRequest`
- **`where`:** `LeaveRequest`

##### Response
- **`data`:** `LeaveRequest`

#### `DELETE /v1/leaveRequests/delete`
##### Request
- **`where`:** `LeaveRequest`

##### Response
(nothing)

---

### Company

#### `GET /v1/companies/view`
##### Request
- **`fields`:**
  ```ts
  id: boolean
  name: boolean
  address:
    id: boolean
    country: boolean
    postalCode: boolean
    state: boolean
    street: boolean
    city: boolean
    buildingNumber: boolean
    apartmentNumber: boolean
  employees:
      id: boolean
      email: boolean
      authToken: boolean
      password: boolean
      firstName: boolean
      lastName: boolean
      role: boolean
      isActive: boolean
      avatarUrl: boolean
      middleName: boolean
      phoneNumber: boolean
      address:
        id: boolean
        country: boolean
        postalCode: boolean
        state: boolean
        street: boolean
        city: boolean
        buildingNumber: boolean
        apartmentNumber: boolean
      companyRole: boolean
  ```
- **`where`:** `Company`

##### Response
- **`data`:** `Company`

#### `PUT /v1/companies/create`
##### Request
- **`data`:** `Company`

##### Response
- **`data`:** `Company`

#### `PATCH /v1/companies/update`
##### Request
- **`data`:** `Company`
- **`where`:** `Company`

##### Response
- **`data`:** `Company`

#### `DELETE /v1/companies/delete`
##### Request
- **`where`:** `Company`

##### Response
(nothing)

---

### Address

#### `GET /v1/addresses/view`
##### Request
- **`fields`:**
  ```ts
  id: boolean
  country: boolean
  postalCode: boolean
  state: boolean
  street: boolean
  city: boolean
  buildingNumber: boolean
  apartmentNumber: boolean
  ```
- **`where`:** `Address`

##### Response
- **`data`:** `Address`

#### `PUT /v1/addresses/create`
##### Request
- **`data`:** `Address`

##### Response
- **`data`:** `Address`

#### `PATCH /v1/addresses/update`
##### Request
- **`data`:** `Address`
- **`where`:** `Address`

##### Response
- **`data`:** `Address`

#### `DELETE /v1/addresses/delete`
##### Request
- **`where`:** `Address`

##### Response
(nothing)
