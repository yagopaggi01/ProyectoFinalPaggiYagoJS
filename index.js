// Array para almacenar los datos de DolarSi
let datosDolarSiArray = [];

// Función para manejar un array y es reutilizable!
function manejarArray(arr) {
  const suma = arr.reduce((total, elemento) => total + elemento.venta, 0);
}

// Función para cargar datos desde una API
async function cargarDatosDesdeAPI(
  apiUrl,
  token,
  requestData,
  onSuccess,
  onError
) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    });

    if (response.ok) {
      const data = await response.json();
      onSuccess(data);
    } else {
      throw new Error("Error al cargar los datos desde la API");
    }
  } catch (error) {
    onError(error);
  }
}

function calcularDolares() {
  // Obtener el valor ingresado en el input de pesos
  const pesosInput = document.getElementById("pesosInput");
  const cantidadPesos = parseFloat(pesosInput.value);

  // Verificar que la entrada sea un número válido
  if (isNaN(cantidadPesos) || cantidadPesos <= 0) {
    alert("Ingrese una cantidad en pesos y calcule el valor del dólar.");
    return;
  }

  // Verificar si el valor del dólar blue está disponible
  if (valorDolarBlue === 0) {
    alert(
      "Espere un momento mientras se obtiene el valor del dólar blue. Obtenga los valores con el botón de arriba!"
    );
    return;
  }

  // Calcular la cantidad de dólares a valor blue
  const cantidadDolares = cantidadPesos / valorDolarBlue;

  // Crear una tarjeta Bootstrap para mostrar el resultado
  const resultadoDolares = document.getElementById("resultadoDolares");
  resultadoDolares.innerHTML = `
    <div class="card mt-3">
      <div class="card-body">
        <h5 class="card-title">Resultado en Dólares</h5>
        <p class="card-text">Usted obtendría aproximadamente <span style="color: yellow; font-size: 2em;">${cantidadDolares.toFixed(
          2
        )}</span> dólares a valor blue.</p>
      </div>
    </div>
  `;

  // Agregar tarjetas adicionales según la cantidad de dólares
  if (cantidadDolares > 100000) {
    resultadoDolares.innerHTML += `
      <div class="card mt-3">
        <div class="card-body text-center">
          <h5 class="card-title">Con esta cantidad:</h5>
          <p class="card-text">Puede dejar de programar con esa plata.</p>
        </div>
      </div>
    `;
  } else if (cantidadDolares > 10000) {
    resultadoDolares.innerHTML += `
      <div class="card mt-3">
        <div class="card-body text-center">
          <h5 class="card-title">Con esta cantidad :</h5>
          <p class="card-text">Puede comprar un Gol Trend con esa plata.</p>
        </div>
      </div>
    `;
  } else if (cantidadDolares > 1000) {
    resultadoDolares.innerHTML += `
      <div class="card mt-3">
        <div class="card-body text-center">
          <h5 class="card-title">Con esta cantidad:</h5>
          <p class="card-text">Puede comprar una PlayStation con esa plata.</p>
        </div>
      </div>
    `;
  }
}

// Función para mostrar datos en tarjetas
function mostrarDatosEnTarjetas(datos) {
  const listaDatosDolarSi = document.getElementById("listaDatosDolarSi");
  listaDatosDolarSi.innerHTML = "";

  datos.forEach((dato) => {
    const card = document.createElement("div");
    card.className = "col-md-4";

    const cardHTML = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${dato.nombre}</h5>
          <p class="card-text">Venta: ${dato.venta}</p>
        </div>
      </div>
    `;

    card.innerHTML = cardHTML;
    listaDatosDolarSi.appendChild(card);
  });

  // Almacena los datos en el array
  datosDolarSiArray = datos;
  // Llama a la función para manejar el array
  manejarArray(datosDolarSiArray);
}

// Función para manejar el éxito al cargar datos desde la API
function onSuccess(data) {
  const resultadoElement = document.getElementById("resultado");
  resultadoElement.textContent = JSON.stringify(data);
}

// Resto de tu código para obtener datos de DolarSi
let mostrarDatosDolar = false;
// Declarar un array para almacenar los valores del dólar blue
const valoresDolarBlue = 0;

// Variable global para almacenar el valor del dólar blue
// Variable global para almacenar el valor del dólar blue
let valorDolarBlue = 0;

function getDatosDolarSi() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://dolarapi.com/v1/dolares");
      if (response.ok) {
        const data = await response.json();
        valorDolarBlue = data[1].compra; // Almacena el valor del dólar blue

        if (data) {
          mostrarDatosEnTarjetas(data);
          botonObtenerDatosDolarSi.textContent = "Ocultar Datos Dolar";
          mostrarDatosDolar = true;
          calcularDolares(valorDolarBlue);

          // Mostrar el toast cuando se hace clic en el botón
          var liveToast = new bootstrap.Toast(
            document.getElementById("liveToast")
          );
          liveToast.show();

          // Mostrar el input para ingresar la cantidad en pesos
          const inputPesos = document.getElementById("inputPesos");
          inputPesos.style.display = "block";

          // Resuelve la promesa con un mensaje de éxito
          resolve("Se obtuvieron los datos correctamente!");
        } else {
          throw new Error(
            "No se encontró el valor del Dólar Blue en los datos de la API"
          );
        }
      } else {
        throw new Error("Error al obtener los datos de DolarSi");
      }
    } catch (error) {
      reject(error); // Rechaza la promesa con el error
    }
  });
}

const botonObtenerDatosDolarSi = document.getElementById("obtenerDatosDolarSi");

botonObtenerDatosDolarSi.addEventListener("click", async () => {
  if (mostrarDatosDolar) {
    // Si se están mostrando los datos, ocultarlos
    const listaDatosDolarSi = document.getElementById("listaDatosDolarSi");
    listaDatosDolarSi.innerHTML = "";
    botonObtenerDatosDolarSi.textContent = "Obtener Datos Dolar";
    mostrarDatosDolar = false;
  } else {
    // Si no se están mostrando los datos, obtenerlos y mostrarlos
    try {
      await getDatosDolarSi();
    } catch (error) {}
  }
});
