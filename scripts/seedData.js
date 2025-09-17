const { db } = require('../config/firebase');

const sampleStudents = [
  {
    name: 'Maria Shereni',
    email: 'maria.shereni@example.com',
    phone: '+1234567890',
    grade: '12th',
    country: 'United States',
    applicationStatus: 'Exploring',
    lastActive: new Date(),
    interactions: [
      {
        type: 'Login',
        description: 'Student logged in to the platform',
        timestamp: new Date()
      },
      {
        type: 'Document Upload',
        description: 'Uploaded transcript',
        timestamp: new Date(Date.now() - 86400000) // 1 day ago
      }
    ],
    communications: [
      {
        type: 'email',
        subject: 'Welcome to Undergraduation',
        content: 'Thank you for joining our platform. We look forward to helping you with your college applications.',
        author: 'Admin User',
        timestamp: new Date()
      }
    ],
    notes: [
      {
        content: 'Interested in STEM programs. Follow up about scholarship opportunities.',
        author: 'Advisor Jane',
        timestamp: new Date()
      }
    ],
    createdAt: new Date()
  },
  {
    name: 'Mateo Garcia',
    email: 'mateo.garcia@example.com',
    phone: '+1987654321',
    grade: '11th',
    country: 'Spain',
    applicationStatus: 'Shortlisting',
    lastActive: new Date(Date.now() - 172800000), // 2 days ago
    interactions: [
      {
        type: 'Login',
        description: 'Student logged in to the platform',
        timestamp: new Date(Date.now() - 172800000)
      },
      {
        type: 'Search',
        description: 'Searched for engineering programs',
        timestamp: new Date(Date.now() - 172800000)
      }
    ],
    communications: [
      {
        type: 'email',
        subject: 'Program Recommendations',
        content: 'Based on your profile, we recommend these engineering programs...',
        author: 'Admin User',
        timestamp: new Date(Date.now() - 86400000)
      }
    ],
    notes: [
      {
        content: 'Needs help with shortlisting universities. Strong academic record.',
        author: 'Advisor Mathew',
        timestamp: new Date(Date.now() - 86400000)
      }
    ],
    createdAt: new Date(Date.now() - 2592000000) // 30 days ago
  },
  {
    name: 'David Chen',
    email: 'david.chen@example.com',
    phone: '+1122334455',
    grade: '12th',
    country: 'Canada',
    applicationStatus: 'Applying',
    lastActive: new Date(Date.now() - 43200000), // 12 hours ago
    interactions: [
      {
        type: 'Login',
        description: 'Student logged in to the platform',
        timestamp: new Date(Date.now() - 43200000)
      },
      {
        type: 'Essay Review',
        description: 'Submitted essay for review',
        timestamp: new Date(Date.now() - 86400000)
      }
    ],
    communications: [
      {
        type: 'email',
        subject: 'Essay Feedback',
        content: 'Your essay looks good, but needs some refinement in the conclusion...',
        author: 'Advisor Sarah',
        timestamp: new Date(Date.now() - 43200000)
      }
    ],
    notes: [
      {
        content: 'Strong writer, needs help with college selection.',
        author: 'Advisor Tom',
        timestamp: new Date(Date.now() - 86400000)
      }
    ],
    createdAt: new Date(Date.now() - 1728000000) // 20 days ago
  }
];

async function seedData() {
  try {
    console.log('Starting to seed data...');
    
    for (const student of sampleStudents) {
      const docRef = await db.collection('students').add(student);
      console.log(`Added student: ${student.name} with ID: ${docRef.id}`);
    }
    
    console.log('Sample data added successfully!');
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
}

// Run the seed function
seedData()
  .then(() => {
    console.log('Seeding completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });