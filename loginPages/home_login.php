<?php 

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$mysqli = new mysqli("oceanus.cse.buffalo.edu", "johnbudn", "50382208", "cse442_2022_spring_team_n_db");

$username = "";
$password = "";
$login_err = "";
$result = "";
$col = "";

if($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['submit'])){
    $mysqli = new mysqli("oceanus.cse.buffalo.edu", "johnbudn", "50382208", "cse442_2022_spring_team_n_db");  
    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
        exit();
    }    
    // Check if username is empty   
    if (isset($_POST["username"]) && isset($_POST["password"])){
        $username = $_POST["username"]
        $password = $_POST["password"]
        print $username;
        print $password;

        $result = $mysqli->query("SELECT * FROM user where username = '$username' and password = '$password'");

        if($result->num_rows >0){
            echo "User validated";
            $col = $result->fetch_assoc();  

        if($col["is_professor"] == 0){
            echo " User is student";
        }
        else{
            echo " User is Professor";
        }
        else{
            echo "User not validated";
            $mysqli->close();
        }

    }
    else{
        $login_err = "invalid username or password"
    }
    // if(empty($_POST["username"])){
    //     $username_err = "Username cannot be empty.";
    // } else{
    //     $username = $_POST["username"];
    //     print $username;
    // }
    
    // // Check if password is empty
    // if(empty($_POST["password"])){
    //     $password_err = "Please cannot be empty.";
    // } else{
    //     $password = $_POST["password"];
    //     print $username;
    // }
    //   } 

}
