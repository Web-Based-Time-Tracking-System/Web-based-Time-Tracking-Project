<?php
// Database connection details
$host = 'localhost';
$dbname = 'time_tracking';
$username = 'root';
$password = '';

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if POST data is set
    if (isset($_POST['employee_name']) && isset($_POST['start_time']) && isset($_POST['end_time'])) {
        $employeeName = $_POST['employee_name'];
        $startTime = $_POST['start_time'];
        $endTime = $_POST['end_time'];

        // Insert data into the database
        $stmt = $pdo->prepare("INSERT INTO time_entries (employee_name, start_time, end_time) VALUES (:employee_name, :start_time, :end_time)");
        $stmt->bindParam(':employee_name', $employeeName);
        $stmt->bindParam(':start_time', $startTime);
        $stmt->bindParam(':end_time', $endTime);
        $stmt->execute();

        echo "Entry saved successfully!";
    } else {
        echo "Error: Missing form data.";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>