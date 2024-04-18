# MongoDB Local Development Guide

## Introduction
This document serves as a guide for starting, stopping, and managing MongoDB processes on a macOS system. It covers essential commands and procedures based on the MongoDB installation via Homebrew.

## Installation Details
- **MongoDB Version**: 7.0.8
- **Installation Path**: `/opt/homebrew/Cellar/mongodb-community/7.0.8`
- **Executable Binaries**:
  - Located in `/opt/homebrew/Cellar/mongodb-community/7.0.8/bin`
    - `mongod` (MongoDB server)
    - `mongos` (Sharding router)
    - `mongosh` (MongoDB shell)

## Starting MongoDB
MongoDB is managed as a Homebrew service to simplify starting and stopping the server. To start MongoDB as a background service:

```shell
brew services start mongodb-community
```

This command initializes the MongoDB server and runs it in the background. The server will automatically restart at login unless stopped manually.

## Stopping MongoDB
To stop the running MongoDB service:

```shell
brew services stop mongodb-community
```

This command stops the MongoDB server. If you only need to restart the service (e.g., after changing configuration settings), you can use:

```shell
brew services restart mongodb-community
```


## Accessing MongoDB
To connect to your MongoDB server using the MongoDB Shell (`mongosh`), execute the following command:

```shell
mongosh
```

This command connects you to the default `test` database. Remember that if you have enabled authentication, you will need to log in with your user credentials:

```shell
mongosh --authenticationDatabase "admin" -u "admin" -p "yourSecurePassword"
```


## Configuration and Security
To secure your MongoDB installation, it is recommended to enable authentication:

1. **Edit MongoDB Configuration**:
   - Configuration File: `/opt/homebrew/etc/mongod.conf`
   - Add the following lines to enable authorization:
     ```
     security:
       authorization: "enabled"
     ```

2. **Restart MongoDB**:


```shell
brew services restart mongodb-community
```


3. **Create an Administrative User**:
- Connect to the `admin` database and create a user:
  ```
  use admin
  db.createUser({
    user: "admin",
    pwd: "yourSecurePassword",
    roles: [{ role: "userAdminAnyDatabase", db: "admin" }]
  })
  ```

## Additional Resources
- **MongoDB Documentation**: [Official MongoDB Documentation](https://docs.mongodb.com/manual/)
- **MongoDB Community Forums**: [MongoDB Community Forums](https://community.mongodb.com)
- **Learning MongoDB**: [MongoDB University](https://university.mongodb.com/)

## Conclusion
This guide provides basic procedures for managing your local MongoDB server on macOS using Homebrew. For more advanced configurations and usage scenarios, refer to the MongoDB documentation and online resources.
