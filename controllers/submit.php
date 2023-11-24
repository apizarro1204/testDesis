<?php
// Verifica si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Obtiene los datos del formulario
    $nombreApellido = test_input($_POST["nombreApellido"]);
    $alias = test_input($_POST["alias"]);
    $email = test_input($_POST["email"]);
    $rut = test_input($_POST["rut"]);
    $region = test_input($_POST["region"]);
    $comuna = test_input($_POST["comuna"]);
    $candidato = test_input($_POST["candidato"]);

    // Verifica las opciones seleccionadas en "Cómo se enteró de nosotros"
    $referencia = isset($_POST["referencia"]) ? $_POST["referencia"] : array();

    try {
        // Conexión a la base de datos MySQL (reemplazar credenciales según corresponda)
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "votos_db";

        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Verificar si ya existe un RUT igual en la base de datos
        $checkDuplicateRut = "SELECT id FROM votos WHERE rut = :rut";
        $stmt = $conn->prepare($checkDuplicateRut);
        $stmt->bindParam(":rut", $rut);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            // El RUT ya existe, maneja la situación según tus necesidades
            echo json_encode(array('error' => 'El RUT ya ha sido registrado'));
        } else {
            // El RUT no existe, procede con la inserción en la base de datos

            // Inserción en la base de datos
            $insertQuery = "INSERT INTO votos (nombre_apellido, alias, email, rut, region, comuna, candidato, referencia) 
                            VALUES (:nombreApellido, :alias, :email, :rut, :region, :comuna, :candidato, :referencia)";

            $stmt = $conn->prepare($insertQuery);
            $stmt->bindParam(":nombreApellido", $nombreApellido);
            $stmt->bindParam(":alias", $alias);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":rut", $rut);
            $stmt->bindParam(":region", $region);
            $stmt->bindParam(":comuna", $comuna);
            $stmt->bindParam(":candidato", $candidato);
            $stmt->bindParam(":referencia", implode(", ", $referencia)); //Se puede utilizar implode o no, depende de referencia.

            if ($stmt->execute()) {
                // Ejemplo de datos para devolver como JSON en caso de éxito
                $responseData = array(
                    'nombreApellido' => $nombreApellido,
                    'alias' => $alias,
                    'email' => $email,
                    'rut' => $rut,
                    'region' => $region,
                    'comuna' => $comuna,
                    'candidato' => $candidato,
                    'referencia' => $referencia
                );

                //echo json_encode($responseData);
            } else {
                // Error al insertar en la base de datos
                echo json_encode(array('error' => 'Error al registrar en la base de datos'));
            }
        }

        // Cerrar la conexión
        $stmt = null;
        $conn = null;
    } catch (PDOException $e) {
        // Loguear el error en el servidor
        error_log('Error en el servidor: ' . $e->getMessage());
        echo json_encode(array('error' => 'Error en el servidor. Consulta los registros para más detalles.'));
    }
} else {
    header("Location: index.php");
    exit();
}

// Función para validar y limpiar los datos del formulario
function test_input($data)
{
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>
