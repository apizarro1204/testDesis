<?php
// Verifica si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera los datos del formulario
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
        // Conexión a la base de datos (reemplaza con tus propias credenciales)
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "votos_db";

        $conn = new mysqli($servername, $username, $password, $dbname);

        // Verificar la conexión
        if ($conn->connect_error) {
            throw new Exception("Conexión fallida: " . $conn->connect_error);
        }

        // Verificar si ya existe un RUT igual en la base de datos
        $checkDuplicateRut = "SELECT id FROM votos WHERE rut = ?";
        $stmt = $conn->prepare($checkDuplicateRut);
        $stmt->bind_param("s", $rut);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            // El RUT ya existe, maneja la situación según tus necesidades
            echo json_encode(array('error' => 'El RUT ya ha sido registrado'));
        } else {
            // El RUT no existe, procede con la inserción en la base de datos

            // Inserción en la base de datos
            $insertQuery = "INSERT INTO votos (nombre_apellido, alias, email, rut, region, comuna, candidato, referencia) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

            $stmt = $conn->prepare($insertQuery);
            $stmt->bind_param("ssssssss", $nombreApellido, $alias, $email, $rut, $region, $comuna, $candidato, $referencia);

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
                    'referencia' => $referencia  // Cambio aquí, usando implode
                );
                echo json_encode($responseData);
            } else {
                // Error al insertar en la base de datos
                echo json_encode(array('error' => 'Error al registrar en la base de datos'));
            }
        }

        // Cerrar la conexión
        $stmt->close();
        $conn->close();
    } catch (Exception $e) {
        echo json_encode(array('error' => 'Error en el servidor: ' . $e->getMessage()));
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
