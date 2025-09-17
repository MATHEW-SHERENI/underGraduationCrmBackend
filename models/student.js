const { db, admin } = require('../config/firebase');

class Student {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.grade = data.grade;
    this.country = data.country;
    this.applicationStatus = data.applicationStatus || 'Exploring';
    this.lastActive = data.lastActive || new Date();
    this.interactions = data.interactions || [];
    this.communications = data.communications || [];
    this.notes = data.notes || [];
    this.createdAt = data.createdAt || new Date();
  }

  // Static method to get all students
  static async getAll() {
    try {
      const snapshot = await db.collection('students').get();
      const students = [];
      
      snapshot.forEach(doc => {
        students.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return students;
    } catch (error) {
      console.error('Error getting all students:', error);
      throw error;
    }
  }

  // Static method to get student by ID
  static async getById(id) {
    try {
      const doc = await db.collection('students').doc(id).get();
      if (!doc.exists) {
        return null;
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Error getting student by ID:', error);
      throw error;
    }
  }

  // Instance method to save student
  async save() {
    try {
      const studentData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        grade: this.grade,
        country: this.country,
        applicationStatus: this.applicationStatus,
        lastActive: this.lastActive,
        interactions: this.interactions,
        communications: this.communications,
        notes: this.notes,
        createdAt: this.createdAt,
        updatedAt: new Date()
      };

      if (this.id) {
        // Update existing student
        await db.collection('students').doc(this.id).update(studentData);
        return { id: this.id, ...studentData };
      } else {
        // Create new student
        const ref = await db.collection('students').add(studentData);
        this.id = ref.id;
        return { id: ref.id, ...studentData };
      }
    } catch (error) {
      console.error('Error saving student:', error);
      throw error;
    }
  }

  // Static method to create a new student
  static async create(data) {
    try {
      const studentData = {
        ...data,
        createdAt: new Date(),
        lastActive: new Date()
      };

      const ref = await db.collection('students').add(studentData);
      return { id: ref.id, ...studentData };
    } catch (error) {
      console.error('Error creating student:', error);
      throw error;
    }
  }

  // Static method to update a student
  static async update(id, data) {
    try {
      const updateData = {
        ...data,
        updatedAt: new Date()
      };

      await db.collection('students').doc(id).update(updateData);
      return { id, ...updateData };
    } catch (error) {
      console.error('Error updating student:', error);
      throw error;
    }
  }

  // Static method to add an interaction
  static async addInteraction(id, interaction) {
    try {
      const studentRef = db.collection('students').doc(id);
      await studentRef.update({
        interactions: admin.firestore.FieldValue.arrayUnion({
          ...interaction,
          timestamp: new Date()
        }),
        lastActive: new Date()
      });
      return interaction;
    } catch (error) {
      console.error('Error adding interaction:', error);
      throw error;
    }
  }

  // Static method to add a communication
  static async addCommunication(id, communication) {
    try {
      const studentRef = db.collection('students').doc(id);
      await studentRef.update({
        communications: admin.firestore.FieldValue.arrayUnion({
          ...communication,
          timestamp: new Date()
        })
      });
      return communication;
    } catch (error) {
      console.error('Error adding communication:', error);
      throw error;
    }
  }

  // Static method to add a note
  static async addNote(id, note) {
    try {
      const studentRef = db.collection('students').doc(id);
      await studentRef.update({
        notes: admin.firestore.FieldValue.arrayUnion({
          ...note,
          timestamp: new Date(),
          author: note.author
        })
      });
      return note;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  }

  // Static method to delete a student
  static async delete(id) {
    try {
      await db.collection('students').doc(id).delete();
      return { id, deleted: true };
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  }
}

module.exports = Student;