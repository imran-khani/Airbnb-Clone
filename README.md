# Airbnb Project

## Overview
This project is a web application inspired by Airbnb, allowing users to search for accommodations, make bookings, and manage their reservations.

## Installation
To get started with the project, follow these steps:

1. Clone the repository:
git clone <repository-url>


2. Navigate to the project directory:
cd airbnb


3. Install dependencies:
npm install


## Usage
After installation, you can use the following npm scripts:

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm start`: Start the production server.
- `npm run lint`: Lint the project files.
- `npm run postinstall`: Generate Prisma client after installation.

## Dependencies
Here are the main dependencies used in this project:

- **Next.js**: Framework for React applications.
- **Prisma**: Database toolkit.
- **NextAuth.js**: Authentication library for Next.js.
- **Axios**: HTTP client for making requests.
- **React**: JavaScript library for building user interfaces.
- **MongoDB**: NoSQL database.
- **React-Leaflet**: React components for Leaflet maps.
- **React-Select**: Customizable select input for React.
- **Zustand**: State management library for React.

For a complete list of dependencies, refer to the `package.json` file.

## Development Dependencies
These are the development dependencies used for building and linting the project:

- **TypeScript**: Typed superset of JavaScript.
- **ESLint**: JavaScript linter.
- **Tailwind CSS**: Utility-first CSS framework.
- **PostCSS**: CSS post-processor.
- **Autoprefixer**: CSS vendor prefixer.
- **@types/* packages**: TypeScript type definitions for various libraries.

- ## Configuration
### Environment Variables
You should add a `.env` file by your own which is not included in this repository. The `.env` file should contain configuration variables for GitHub, Google, and custom login integration, as well as Cloudinary API keys.

Example `.env` file:
DATABASE_URL=""

GITHUB_ID = ""
GITHUB_SECRET = ""

GOOGLE_ID =""

GOOGLE_SECRET =""

NEXTAUTH_SECRET = ""




NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
CLOUDINARY_URL=""

## Contributing
Contributions to the project are welcome! If you encounter any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).
