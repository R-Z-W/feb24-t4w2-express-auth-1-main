# Auto Service Management System API

ExpressJS API with MongoDB for managing auto service operations.

## Installation

```bash
git clone <repository-url>
cd feb24-t4w2-express-auth
npm install
```

Create a .env file with:
```
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```



Models
User
userId: UUID (auto-generated)
firstName: String (required)
lastName: String (required)
jobTitle: String (required)
department: String (required)
email: String (required, unique)
username: String (required, unique)
password: String (required, hashed)
isAdmin: Boolean (default: false)

Car
carId: Number (auto-incremented)
make: String (required)
model: String (required)
year: Number (required)
vin: String (required, unique)
status: String (default: "For Sale")

WorkOrder
workOrderId: Number (auto-incremented)
carId: String (required)
userId: String (required)
department: Enum ['Mechanical', 'Dent Repair', 'Paint Shop', 'Rim Repair', 'Upholstery', 'Detailing', 'Inspection']
status: String (default: "Pending")
tasks: [{ title: String, description: String }]
comments: [{ userId: String, text: String, createdAt: Date }]


Routes
Auth Routes
POST /signup - Create new user
POST /login - User login

User Routes (Admin Only)
GET /api/users - Get all users
GET /api/users/:id - Get user by ID
PUT /api/users/:id - Update user
DELETE /api/users/:id - Delete user

Car Routes
GET /api/cars - Get all cars
GET /api/cars/:id - Get car by ID
POST /api/cars - Create car
PUT /api/cars/:id - Update car
DELETE /api/cars/:id - Delete car

WorkOrder Routes
GET /api/workorders - Get all work orders
GET /api/workorders/:id - Get work order by ID
POST /api/workorders - Create work order
PUT /api/workorders/:id - Update work order
DELETE /api/workorders/:id - Delete work order
Comment Routes
POST /api/workorders/:id/comments - Add comment
PUT /api/workorders/:workOrderId/comments/:commentId - Update comment
DELETE /api/workorders/:workOrderId/comments/:commentId - Delete comment


Authentication
Protected routes require JWT token:
```
Authorization: Bearer <token>
```


Error Handling
All errors return JSON:
```
{
  "message": "Error description"
}
```
