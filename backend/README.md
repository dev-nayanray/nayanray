# Nayan Ray Backend API

A secure and fast backend API built with Node.js, Express, and PostgreSQL for the Nayan Ray portfolio website.

## Features

- **Secure**: Helmet for security headers, CORS (restricted via `FRONTEND_URL`), rate limiting, input validation
- **Fast**: Postgres with connection pooling, optimized queries
- **RESTful API**: Clean REST endpoints for projects, blog, services, and contact
- **Database**: Sequelize ORM with PostgreSQL (works with any Postgres host, e.g. Supabase, Neon)
- **Validation**: Joi for input validation

## Prerequisites

- Node.js (v18 or higher)
- A PostgreSQL database (e.g. free tier on [Supabase](https://supabase.com))
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

3. **Set up the database:**
   - Create a free Postgres project (e.g. on Supabase) and copy its connection string.
   - Copy `.env.example` to `.env` and fill in:
     ```
     DATABASE_URL=postgresql://user:password@host:5432/postgres
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     FRONTEND_URL=http://localhost:5173
     ```

4. The first server start (`npm run dev` / `npm start`) automatically syncs tables and seeds sample data if the tables are empty — no manual seeder step needed.

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

Create a `.env` file in the backend directory (see `.env.example`):

```env
DATABASE_URL=postgresql://user:password@host:5432/postgres
JWT_SECRET=your_jwt_secret_key
PORT=5000
FRONTEND_URL=http://localhost:5173
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

## Deployment (free hosting)

1. Create a free Postgres database on [Supabase](https://supabase.com) and copy the connection string.
2. Deploy this repo to [Render](https://render.com) as a Web Service (root directory: `backend`, build command: `npm install`, start command: `npm start`). A `render.yaml` blueprint is included at the repo root.
3. Set the `DATABASE_URL`, `JWT_SECRET`, and `FRONTEND_URL` environment variables on Render.
4. Update the frontend's `VITE_API_URL` env var (on Vercel) to point at the deployed Render URL, e.g. `https://your-service.onrender.com/api`.

## License

ISC
