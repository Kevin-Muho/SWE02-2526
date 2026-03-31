function loadStudentData() {
    const studentId = localStorage.getItem('studentToEditId');

    if (!studentId) {
        alert('No student selected for editing');
        window.location.href = 'index.html';
        return;
    }

    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(s => s.id === studentId);

    if (!student) {
        alert('Student not found');
        window.location.href = 'index.html';
        return;
    }

    // Populate the form with student data
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentId').value = student.id;
    document.getElementById('mathGrade').value = student.grades.math;
    document.getElementById('englishGrade').value = student.grades.english;
    document.getElementById('scienceGrade').value = student.grades.science;
}

function updateStudent(event) {
    event.preventDefault();

    const studentId = localStorage.getItem('studentToEditId');
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex === -1) {
        alert('Student not found');
        window.location.href = 'index.html';
        return;
    }

    // Update student data
    students[studentIndex] = {
        name: document.getElementById('studentName').value,
        id: studentId, // Keep the same ID
        grades: {
            math: document.getElementById('mathGrade').value,
            english: document.getElementById('englishGrade').value,
            science: document.getElementById('scienceGrade').value
        }
    };

    localStorage.setItem('students', JSON.stringify(students));
    localStorage.removeItem('studentToEditId'); // Clean up

    alert('Student updated successfully!');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    loadStudentData();

    const form = document.getElementById('editStudentForm');
    if (form) {
        form.addEventListener('submit', updateStudent);
    }
});
