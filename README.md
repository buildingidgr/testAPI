# Greece Projects API

This API provides random project data based in Greece. It's designed to be deployed on Railway.

## Endpoints

- `GET /`: Welcome message
- `GET /api/projects`: Get a paginated list of projects

### Query Parameters

- `page`: Page number (default: 1)
- `pageSize`: Number of items per page (default: 10)

## Deployment

This project is set up for easy deployment to Railway. Simply connect your GitHub repository to Railway and it will automatically deploy.

## Local Development

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev` to start the development server

## Building for Production

Run `npm run build` to compile TypeScript to JavaScript. The compiled files will be in the `dist` directory.

## Starting the Production Server

Run `npm start` to start the production server.

