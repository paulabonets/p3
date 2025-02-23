const API_URL = "https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple";

async function getQuestion(retries = 3) {
    try {
        const response = await fetch(API_URL);
        if (response.status === 429) {
            console.warn("Demasiadas solicitudes. Reintentando en 5 segundos...");
            if (retries > 0) {
                await new Promise(resolve => setTimeout(resolve, 5000));
                return getQuestion(retries - 1);
            } else {
                throw new Error("Límite de peticiones alcanzado. Inténtalo más tarde.");
            }
        }
        
        const data = await response.json();
        if (!data.results || data.results.length === 0) {
            throw new Error("No se encontraron preguntas en la API.");
        }
        return data.results[0];
    } catch (error) {
        console.error("Error al obtener la pregunta:", error);
        return null;
    }
}

export { getQuestion };