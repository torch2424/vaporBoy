#!/bin/bash

# Script to do frontend staging deployments

# redirect stdout/stderr to a file
exec &> vaporBoyBuild.log

cd ../../

git stash

git checkout master

git pull origin master

rm package-lock.json

npm install

npm run preact:build

# Copy the build output to public/ if successful build
if [ $? -eq 0 ]; then
   rm -rf public
   mkdir -p public
   cp -r www/* public/
   cp -r legacy/* public/
else
    echo "Failed Building vaporBoy"
fi

echo "Done!"
