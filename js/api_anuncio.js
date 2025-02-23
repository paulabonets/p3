document.addEventListener("DOMContentLoaded", function () {
    const contenedorAnuncio = document.createElement("div");
    contenedorAnuncio.id = "contenedor-anuncio";
    document.body.appendChild(contenedorAnuncio);

    async function obtenerAnuncio() {
        try {
            const response = await fetch("https://api.adviceslip.com/advice");
            if (!response.ok) throw new Error("Error al obtener el anuncio");

            const data = await response.json();
            contenedorAnuncio.innerHTML = `<p><strong>Remember: </strong> ${data.slip.advice}</p>`;
        } catch (error) {
            console.error("Error al obtener el anuncio:", error);
            contenedorAnuncio.innerHTML = `<p>Consejo no disponible</p>`;
        }
    }

    obtenerAnuncio();
    setInterval(obtenerAnuncio, 3600000); // Actualizar cada hora
});
