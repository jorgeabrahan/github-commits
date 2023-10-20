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
# navigate to backend
cd backend
# while you are in the backend project
# even though it's not necessary you can run tests
npm run test
# initialize watch mode
npm run start:dev
# go back to root folder
cd ..
# navigate to frontend
cd frontend
# initialize watch mode
npm run dev
# go back to root folder
cd ..
```

## Launch website

### backend

NestJS listen the port **3000** by default, therefore you'll need to open:

```
http://localhost:3000
```

In your browser, this will show you a welcome message that indicates that the backend project is up and running.

Here's a list of all the endpoints you can check here:

```
# GET all commits
# endpoint
/commits
#example
http://localhost:3000/commits

# GET commits by author
# endpoint
/commits/author?author=name
# example
http://localhost:3000/commits/author?author=jorgeabrahan

# GET commits by date
# endpoint
/commits/date?dateSince=date&dateUntil=date
# example
http://localhost:3000/commits/date?dateSince=2023-10-01&dateUntil=2023-10-31

# GET commits by keyword
# endpoint
/commits/keyword?keyword=keyword
# example
http://localhost:3000/commits/keyword?keyword=create

# GET commits by filters
# endpoint
/commits/filters?author=name&dateSince=date&dateUntil=date&keyword=keyword
# example
http://localhost:3000/commits/filters?author=jorgeabrahan&dateSince=2023-10-01&dateUntil=2023-10-31&keyword=create
```
