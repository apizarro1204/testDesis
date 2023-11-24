<?php
// Conexión a la base de datos MySQL (reemplazar credenciales según corresponda)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "votos_db";

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Obtener regiones
    $queryRegiones = "SELECT id_region, name FROM regions";
    $stmtRegiones = $conn->prepare($queryRegiones);
    $stmtRegiones->execute();
    $regiones = $stmtRegiones->fetchAll(PDO::FETCH_ASSOC);

    // Obtener comunas
    if (isset($_GET['action']) && $_GET['action'] === 'getCommunes' && isset($_GET['regionId'])) {
        $regionId = $_GET['regionId'];
        $queryComunas = "SELECT id_city, name FROM cities WHERE id_region = :regionId";
        $stmtComunas = $conn->prepare($queryComunas);
        $stmtComunas->bindParam(':regionId', $regionId);
    } else {
        $queryComunas = "SELECT id_city, name FROM cities";
        $stmtComunas = $conn->prepare($queryComunas);
    }
    
    $stmtComunas->execute();
    $comunas = $stmtComunas->fetchAll(PDO::FETCH_ASSOC);

    // Cerrar la conexión
    $stmtRegiones = null;
    $stmtComunas = null;
    $conn = null;

    

    // Devolver las regiones y comunas como JSON
    echo json_encode(array('regiones' => $regiones, 'comunas' => $comunas));
} catch (PDOException $e) {
    // Loguear el error en el servidor
    error_log('Error en el servidor al obtener regiones y comunas: ' . $e->getMessage());
    echo json_encode(array('error' => 'Error al obtener regiones y comunas desde la base de datos'));
}

?>
