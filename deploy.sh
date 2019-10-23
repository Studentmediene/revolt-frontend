#!/bin/bash
GIT_BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')


# Use sudo to prompt for sudo password before deploying
echo "Please enter the password for the current user:"
sudo echo "Deploying kapina-frontend on branch $GIT_BRANCH..."
git pull

source env.sh

npm run build
sudo systemctl restart kapina-frontend.service
echo "Successfully deployed kapina-backend on branch $GIT_BRANCH."
