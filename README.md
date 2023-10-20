# GitHub Commits

## 1- Clone the project

```sh
git clone git@github.com:jorgeabrahan/github-commits.git
```

## 2- Navigate to the project

```sh
cd github-commits
```

## 3- Install dependencies

Since this repository holds two projects in one (backend, frontend) we will need to install dependencies in both of them:

```sh
# navigate to frontend
cd frontend
# install frontend dependencies
npm i
# go back to root folder
cd ..
# navigate to backend
cd backend
# install backend dependencies
npm i
# go back to root folder
cd ..
```

## 4- Initialize projects

To initialize both projects we will have to do something similar to what we did before:

```sh
# navigate to frontend
cd frontend
# initialize watch mode
npm run dev
# go back to root folder
cd ..
# navigate to backend
cd backend
# initialize watch mode
npm run start:dev
# go back to root folder
cd ..
```
