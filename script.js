const libros = [
    { id: 1, titulo: "El Principito", autor: "Antoine de Saint-Exupéry", genero: "Fantasía", disponible: true },
    { id: 2, titulo: "Cien años de soledad", autor: "Gabriel García Márquez", genero: "Realismo mágico", disponible: true },
    { id: 3, titulo: "1984", autor: "George Orwell", genero: "Distopía", disponible: false },
    { id: 4, titulo: "Orgullo y prejuicio", autor: "Jane Austen", genero: "Romance", disponible: true },
    { id: 5, titulo: "Rayuela", autor: "Julio Cortázar", genero: "Narrativa", disponible: true }
];

const usuariosRegistrados = [];
const TARIFA_MULTA_POR_DIA = 150;

function mostrarMensajeBienvenida() {
    alert("¡Bienvenida/o a la Biblioteca Digital!\nGestiona tus préstamos desde este simulador.");
    console.log("Bienvenida/o al simulador de préstamos de la biblioteca digital.");
    console.log("Utiliza el menú para registrar lectores, consultar libros y estimar multas.");
}

function obtenerOpcionMenu() {
    const menu = `
Selecciona una opción:
1 - Mostrar catálogo completo
2 - Buscar libros por género
3 - Registrar un nuevo lector
4 - Simular préstamo de un libro
5 - Calcular multa por retraso
ESC - Salir del simulador
    `;

    const opcion = prompt(menu);
    return opcion ? opcion.trim() : null;
}

function mostrarCatalogo(listaLibros) {
    if (listaLibros.length === 0) {
        console.log("El catálogo actualmente no posee libros cargados.");
        return;
    }

    console.log("Catálogo de la biblioteca:");
    listaLibros.forEach((libro, indice) => {
        const estado = libro.disponible ? "Disponible" : "Prestado";
        console.log(`${indice + 1}. ${libro.titulo} - ${libro.autor} (${libro.genero}) | Estado: ${estado}`);
    });
}

function buscarLibrosPorGenero(listaLibros) {
    const generoBuscado = prompt("Ingresa el género que deseas consultar (por ejemplo, Fantasía, Distopía, Romance):");

    if (!generoBuscado) {
        console.log("Búsqueda cancelada por el usuario.");
        return;
    }

    const resultado = listaLibros.filter((libro) => libro.genero.toLowerCase() === generoBuscado.trim().toLowerCase());

    if (resultado.length === 0) {
        console.log(`No se encontraron libros para el género "${generoBuscado}".`);
        return;
    }

    console.log(`Libros encontrados en el género "${generoBuscado}":`);
    resultado.forEach((libro) => {
        console.log(`- ${libro.titulo} (${libro.autor}) | Disponible: ${libro.disponible ? "Sí" : "No"}`);
    });
}

function registrarUsuario() {
    const nombre = prompt("Ingresa el nombre del nuevo lector:");
    if (!nombre) {
        console.log("Registro cancelado. Es necesario indicar un nombre.");
        return;
    }

    const apellido = prompt("Ingresa el apellido del nuevo lector:");
    if (!apellido) {
        console.log("Registro cancelado. Es necesario indicar un apellido.");
        return;
    }

    const correo = prompt("Ingresa un correo de contacto:");
    if (!correo) {
        console.log("Registro cancelado. Es necesario indicar un correo.");
        return;
    }

    const nuevoUsuario = {
        id: usuariosRegistrados.length + 1,
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        correo: correo.trim()
    };

    usuariosRegistrados.push(nuevoUsuario);
    console.log(`Registro exitoso: ${nuevoUsuario.nombre} ${nuevoUsuario.apellido} (ID: ${nuevoUsuario.id})`);
}

function calcularMulta(diasRetraso) {
    if (diasRetraso <= 0) {
        return 0;
    }
    return diasRetraso * TARIFA_MULTA_POR_DIA;
}

function gestionarCalculoMulta() {
    const diasIngresados = prompt("¿Cuántos días de retraso registras?");

    if (diasIngresados === null) {
        console.log("Cálculo de multa cancelado por el usuario.");
        return;
    }

    const diasRetraso = parseInt(diasIngresados, 10);

    if (Number.isNaN(diasRetraso) || diasRetraso < 0) {
        console.log("Debes ingresar un número válido de días (0 o más).");
        return;
    }

    const monto = calcularMulta(diasRetraso);
    console.log(`Días de retraso: ${diasRetraso}. Multa estimada: $${monto}.`);
}

function simularPrestamo(listaLibros) {
    mostrarCatalogo(listaLibros);

    const tituloSolicitado = prompt("Escribe el título exacto del libro que deseas solicitar:");
    if (!tituloSolicitado) {
        console.log("No ingresaste un título. Proceso cancelado.");
        return;
    }

    const libroEncontrado = listaLibros.find(
        (libro) => libro.titulo.toLowerCase() === tituloSolicitado.trim().toLowerCase()
    );

    if (!libroEncontrado) {
        console.log(`El libro "${tituloSolicitado}" no forma parte del catálogo actual.`);
        return;
    }

    if (!libroEncontrado.disponible) {
        console.log(`El libro "${libroEncontrado.titulo}" ya está prestado. Intenta con otro título.`);
        return;
    }

    const deseaReservar = confirm(`"${libroEncontrado.titulo}" está disponible. ¿Deseas confirmar el préstamo?`);
    if (!deseaReservar) {
        console.log("Has cancelado el préstamo. El catálogo permanece sin cambios.");
        return;
    }

    let diasEstimados = prompt("¿Cuántos días planeas conservar el libro? (Sugerimos entre 7 y 14 días)");
    if (diasEstimados === null) {
        console.log("No indicaste los días de préstamo, se asignarán 7 días por defecto.");
        diasEstimados = "7";
    }

    let diasPrestamo = parseInt(diasEstimados, 10);
    if (Number.isNaN(diasPrestamo) || diasPrestamo <= 0) {
        console.log("Ingresaste un valor inválido. Se asignarán 7 días por defecto.");
        diasPrestamo = 7;
    }

    libroEncontrado.disponible = false;
    console.log(`Préstamo confirmado: "${libroEncontrado.titulo}" por ${diasPrestamo} días. ¡Disfruta la lectura!`);
}

function iniciarSimulador() {
    mostrarMensajeBienvenida();

    let continuar = true;

    while (continuar) {
        const opcionSeleccionada = obtenerOpcionMenu();

        if (opcionSeleccionada === null) {
            console.log("Cerraste la ventana de menú. Se detiene el simulador.");
            break;
        }

        const opcionNormalizada = opcionSeleccionada.toUpperCase();

        if (opcionNormalizada === "ESC") {
            console.log("Has decidido salir del simulador.");
            continuar = false;
        } else {
            switch (opcionNormalizada) {
                case "1":
                    mostrarCatalogo(libros);
                    break;
                case "2":
                    buscarLibrosPorGenero(libros);
                    break;
                case "3":
                    registrarUsuario();
                    break;
                case "4":
                    simularPrestamo(libros);
                    break;
                case "5":
                    gestionarCalculoMulta();
                    break;
                default:
                    console.log("La opción ingresada no es válida. Intenta nuevamente con un número del menú.");
            }

            if (continuar) {
                continuar = confirm("¿Deseas realizar otra acción en el simulador?");
            }
        }
    }

    console.log("Resumen final de usuarios registrados:");
    console.table(usuariosRegistrados);

    console.log("Estado actualizado del catálogo:");
    console.table(libros);

    alert("Gracias por utilizar el simulador de la Biblioteca Digital. ¡Hasta la próxima!");
}

iniciarSimulador();
