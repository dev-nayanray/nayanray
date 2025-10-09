# Nayan Ray Backend API

A secure and fast backend API built with Node.js, Express, and MySQL for the Nayan Ray portfolio website.

## Features

- **Secure**: Helmet for security headers, CORS, rate limiting, input validation
- **Fast**: MySQL with connection pooling, optimized queries
- **RESTful API**: Clean REST endpoints for projects, blog, services, and contact
- **Database**: Sequelize ORM with MySQL
- **Validation**: Joi for input validation

## Prerequisites

- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

## Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up MySQL database:**
   - Create a new database named `nayanraydb`
   - Update the `.env` file with your MySQL credentials:
     ```
     DB_HOST=localhost
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     DB_NAME=nayanraydb
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     ```

4. **Run the seeder to populate database:**
   ```bash
   node -e "import('./seeders/seed.js').then(m => m.default())"
   ```

## Running the Server

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on port 5000 (or the port specified in .env).

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get single project

### Blog
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/:id` - Get single blog post

### Services
- `GET /api/services` - Get all services

### Contact
- `POST /api/contact` - Submit contact form

### Health Check
- `GET /health` - Server health check

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: Joi validation for all inputs
- **SQL Injection Protection**: Sequelize ORM

## Database Schema

### Projects Table
- id (Primary Key)
- title
- description
- image
- liveLink
- githubLink
- technologies (JSON)
- category
- icon
- gradient
- featured (Boolean)

### BlogPosts Table
- id (Primary Key)
- title
- date
- author
- excerpt
- image
- readTime
- category
- tags (JSON)

### ContactMessages Table
- id (Primary Key)
- name
- email
- subject
- message

### Services Table
- id (Primary Key)
- title
- description
- icon
- features (JSON)

## Environment Variables

Create a `.env` file in the backend directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=nayanraydb
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## Testing the API

You can test the API using tools like Postman or curl:

```bash
# Get all projects
curl http://localhost:5000/api/projects

# Get all blog posts
curl http://localhost:5000/api/blog

# Submit contact form
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "Hello, I am interested in your services."
  }'
```

## Deployment

1. Set up your production MySQL database
2. Update `.env` with production credentials
3. Run `npm start` to start the server
4. Use a process manager like PM2 for production

## License

ISC
