#!/bin/bash

# Settings
GIT_REPO="https://github.com/Baranin67/leave-manager.git"
DEST_DIR="/var/www/app"
DB_CONFIG_FILE="$DEST_DIR/api/v1/config/database-info.js"
CONFIG_FILE="$DEST_DIR/api/v1/.env"
API_SHORTCUT_FILE="/usr/local/bin/start-api"
CLIENT_SHORTCUT_FILE="/usr/local/bin/start-client-mobile"
echo "Enter DB name:"
read DB_NAME
echo "Enter DB Username:"
read DB_USER
echo "Enter DB Password:"
read -s DB_PASS
echo "Enter APP port (default 3030):"
read PORT
PORT=${PORT:-3030}

# Update operating system
echo "Updating operating system..."
sudo apt update -y && sudo apt upgrade -y

# Install Node.JS
echo "Installing Node.js..."
sudo apt install -y nodejs npm
cd $DEST_DIR
npm install bcrypt cookie-parser cors dotenv express express-validator jsonwebtoken knex mysql qs
npm install --save-dev nodemon

# Install packages required by client
echo "Installing packages required by client..."
cd $DEST_DIR/client-mobile
npm i

# Install MariaDB
echo "Installing MariaDB..."
sudo apt install -y mariadb-server

# Run and configure MariaDB
echo "Configuring MariaDB..."
sudo systemctl enable mariadb
sudo systemctl start mariadb

# Creating DB and USER
echo "Creating DB and USER..."
sudo mysql -e "CREATE DATABASE $DB_NAME;"
sudo mysql -e "CREATE USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"
sudo mysql -e "GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"
echo "Importing DB structure..."
sudo mysql -u $DB_USER -p $DB_PASS $DB_NAME <<EOF

CREATE TABLE `address` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `country` varchar(255) NOT NULL,
  `postalCode` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `buildingNumber` varchar(10) NOT NULL,
  `apartmentNumber` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
)

CREATE TABLE `company` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` int(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `companyAddress` (`address`),
  CONSTRAINT `companyAddress` FOREIGN KEY (`address`) REFERENCES `address` (`id`)
)

CREATE TABLE `leaverequest` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user` int(11) UNSIGNED NOT NULL,
  `leaveType` enum('vacation','casual') NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `status` enum('approved','pending','rejected') NOT NULL DEFAULT 'pending',
  `userComment` text DEFAULT NULL,
  `managerComment` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `requestUserID` (`user`),
  CONSTRAINT `requestUserID` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
)

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `refreshToken` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `role` enum('admin','manager','employee') NOT NULL DEFAULT 'employee',
  `isActive` tinyint(1) NOT NULL DEFAULT 0,
  `avatarUrl` varchar(255) DEFAULT NULL,
  `middleName` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(14) DEFAULT NULL,
  `address` int(11) UNSIGNED DEFAULT NULL,
  `company` int(11) UNSIGNED DEFAULT NULL,
  `companyRole` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userCompany` (`company`),
  KEY `userAddress` (`address`),
  CONSTRAINT `userAddress` FOREIGN KEY (`address`) REFERENCES `address` (`id`),
  CONSTRAINT `userCompany` FOREIGN KEY (`company`) REFERENCES `company` (`id`)
)
EOF


# Installing Git
echo "Installing Git..."
sudo apt install -y git

# Downloading Repository Git
mkdir $DEST_DIR
echo "Downloading Repository..."
sudo git clone $GIT_REPO $DEST_DIR

# Set up privliges
echo "Setting up privliges..."
sudo chown -R www-data:www-data $DEST_DIR
sudo chmod -R 755 $DEST_DIR

# Set up firewall
echo "Opening port $PORT TCP for app..."
sudo ufw allow $PORT/tcp

# Create DB config file
cat <<EOL > $DB_CONFIG_FILE
module.exports = {
    client: "mysql",
    connection: {
      host: "localhost",
      user: "$DB_USER",
      password: "$DB_PASS",
      database: "$DB_NAME",
    },
};
EOL

echo "DB config file saved in $DB_CONFIG_FILE"

# Generate access token
echo "Generating access tokens..."
SECRET_ACCESS_TOKEN=$(node -e "console.log(require('crypto').randomBytes(20).toString('hex'))")
REFRESH_TOKEN=$(node -e "console.log(require('crypto').randomBytes(20).toString('hex'))")

cat <<EOL > $CONFIG_FILE
#DATABASE_STRING
URI=
#SERVER_PORT
PORT=$PORT
#TOKEN
SECRET_ACCESS_TOKEN=$SECRET_ACCESS_TOKEN
#REFRESH_TOKEN
REFRESH_TOKEN=$REFRESH_TOKEN
EOL

echo "Config file saved in $CONFIG_FILE"

# Creating api server startup file
echo "Creating startup file..."
cat <<EOL | sudo tee $SHORTCUT_FILE
#!/bin/bash
cd $DEST_DIR/api/v1
npm start
EOL

sudo chmod +x $SHORTCUT_FILE
echo "You can now start server by writing start-api"

# Creating client server startup file
echo "Creating startup file..."
cat <<EOL | sudo tee $CLIENT_SHORTCUT_FILE
#!/bin/bash
cd $DEST_DIR/client-mobile
npx expo start --tunnel
EOL

sudo chmod +x $CLIENT_SHORTCUT_FILE
echo "You can now start client server by writing start-client-mobile"

# End
echo "Install completed"
