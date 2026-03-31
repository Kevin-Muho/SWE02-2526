function loadStudentInfo() {
    const studentId = localStorage.getItem('studentToDeleteId');

    if (!studentId) {
        alert('No student selected for deletion');
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

    // Display student info
    document.getElementById('infoName').textContent = student.name;
    document.getElementById('infoId').textContent = student.id;
}

function confirmDelete() {
    const studentId = localStorage.getItem('studentToDeleteId');
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // Filter out the student to delete
    students = students.filter(s => s.id !== studentId);

    localStorage.setItem('students', JSON.stringify(students));
    localStorage.removeItem('studentToDeleteId'); // Clean up

    alert('Student deleted successfully!');
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    loadStudentInfo();

    const deleteBtn = document.getElementById('confirmDeleteBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', confirmDelete);
    }
});
