// Llamada a la función para cargar datos desde la API
function cargarDatosDesdeAPI() {
  const apiUrl = "https://api.m3o.com/v1/user/Create"; // URL real de la API
  const token = "YOUR_M3O_API_TOKEN"; // Reemplaza con tu token real

  const requestData = {
    email: "joe@example.com",
    id: "user-1",
    password: "Password1",
    username: "joe",
  };

  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Aquí puedes procesar los datos y mostrarlos en la página
      // Por ejemplo, actualiza un elemento con el ID "resultado" con los datos recibidos
      document.getElementById("resultado").textContent = JSON.stringify(data);
    })
    .catch((error) => {
      console.error("Error al cargar los datos desde la API:", error);
    });
}

async function getServiciosAlta() {
  try {
    const response = await fetch(
      `https://www.dolarsi.com/api/api.php?type=valoresprincipales`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      dataServicios = responseData.data;
      console.log("ACTIVOS", dataServicios);
    } else {
      console.error("Error al obtener los datos del servicio");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
