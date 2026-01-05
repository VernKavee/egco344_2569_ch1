const express = require('express');
const app = express();
const port = 3000;

// Mock Data (In a real app, this would come from a database like MongoDB or MySQL)
const students = [
  { studentId: "6401001", name: "Vern S.", department: "Computer Engineering", gpa: 3.85 },
  { studentId: "6401002", name: "Alice M.", department: "Electrical Engineering", gpa: 3.40 },
  { studentId: "6401003", name: "Bob T.", department: "Civil Engineering", gpa: 2.95 },
  { studentId: "6401004", name: "Charlie D.", department: "Computer Engineering", gpa: 3.60 },
  { studentId: "6401005", name: "Diana P.", department: "Industrial Engineering", gpa: 3.25 }
];

// Middleware to parse JSON (good practice for future POST requests)
app.use(express.json());

// API 1: Get all students' GPAs
// Route: GET http://localhost:3000/api/students
app.get('/api/students', (req, res) => {
    // We send the whole list. You could also map this to only return ID and GPA if privacy was a concern.
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});

// API 2: Get individual GPA by Student ID
// Route: GET http://localhost:3000/api/students/6401001
app.get('/api/students/:id', (req, res) => {
    const id = req.params.id;
    
    // Find the student in the array
    const student = students.find(s => s.studentId === id);

    if (student) {
        res.status(200).json({
            success: true,
            data: {
                studentId: student.studentId,
                gpa: student.gpa,
                department: student.department // Including dept for context
            }
        });
    } else {
        res.status(404).json({
            success: false,
            message: `Student with ID ${id} not found.`
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`- GET All: http://localhost:${port}/api/students`);
    console.log(`- GET One: http://localhost:${port}/api/students/6401001`);
});