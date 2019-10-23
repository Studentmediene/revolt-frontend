#!/bin/bash
GIT_BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')


# Use sudo to prompt for sudo password before deploying
echo "Please enter the password for the current user:"
sudo echo "Deploying kapina-frontend on branch $GIT_BRANCH..."
git pull

# Read env variables from .env file
export $(grep -v '^#' .env | xargs)

npm run build
sudo systemctl restart kapina-frontend.service
printf "\nSuccessfully deployed kapina-frontend on branch $GIT_BRANCH.\n"
