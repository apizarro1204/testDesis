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
    if (isset($_GET['action']) && $_GET['action'] === 'getCandidates' && isset($_GET['regionId'])) {
        $regionId = $_GET['regionId'];
        $queryCandidatos = "SELECT id_candidate, name FROM candidates WHERE region_id = :regionId";
        $stmtCandidatos = $conn->prepare($queryCandidatos);
        $stmtCandidatos->bindParam(':regionId', $regionId);
    } else {
        $queryCandidatos = "SELECT id_candidate, name FROM candidates";
        $stmtCandidatos = $conn->prepare($queryCandidatos);
    }
    
    $stmtCandidatos->execute();
    $candidatos = $stmtCandidatos->fetchAll(PDO::FETCH_ASSOC);

    // Cerrar la conexión
    $stmtRegiones = null;
    $stmtCandidatos = null;
    $conn = null;

    

    // Devolver las regiones y comunas como JSON
    echo json_encode(array('regiones' => $regiones, 'candidatos' => $candidatos));
} catch (PDOException $e) {
    // Loguear el error en el servidor
    error_log('Error en el servidor al obtener regiones y candidatos: ' . $e->getMessage());
    echo json_encode(array('error' => 'Error al obtener regiones y candidatos desde la base de datos'));
}

?>
