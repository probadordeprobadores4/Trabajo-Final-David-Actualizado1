/* jshint esversion: 6 */
document.addEventListener("DOMContentLoaded", () => {
  const newsList = document.getElementById("newsList");

  fetch("assets/news.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al cargar las noticias desde news.json");
      }
      return response.json();
    })
    .then(data => {
      newsList.innerHTML = "";

      data.forEach(noticia => {
        const article = document.createElement("article");
        article.classList.add("noticia");

        article.innerHTML = `
          <h3>${noticia.titulo}</h3>
          <p><small>Publicado el ${noticia.fecha}</small></p>
          <p>${noticia.descripcion}</p>
        `;
        newsList.appendChild(article);
      });
    })
    .catch(error => {
      newsList.innerHTML = `<p class="error">😢 No se pudieron cargar las noticias.</p>`;
      console.error("Error cargando noticias:", error);
    });
});
