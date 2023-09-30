## Quillify Express Server

This Express App API uses MongoDb user authentication and for CRUD methods.

To use this repository:

```
git clone https://github.com/raishudesu/quillify-server
```

## Move to its directory:

```
cd quillify-server
```

## Install dependencies:

```
npm install
```

**Note:**
Create your own .env file and add `PORT` and `MONGO_URI`

Example:

```
PORT=400
MONGO_URI=mongodb+srv://<yourMongoDbUsername>:<yourMongoDbPassword>@expressapp.plphetj.mongodb.net/
```

Use your own MongoDb Atlas link.

## Run the server:

```
npm run dev
```

## Host the Express App with Vercel

Vercel Hosting configuration is already set in this app. You can directly host this in Vercel.
