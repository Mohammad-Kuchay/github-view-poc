#!/usr/bin/env sh

# abort on errors
set -e

# build
rm -rf dist
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
#echo 'myapp.com' > CNAME

# creating a git repo in the build folder
git init
git branch -M main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://github.com/Mohammad-Kuchay/github-view-poc.git main:gh-pages

cd -