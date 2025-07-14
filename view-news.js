const articleView = document.getElementById('article-view');

function loadArticle() {
  const index = localStorage.getItem('selectedArticleIndex');
  const articles = JSON.parse(localStorage.getItem('allArticles'));

  if (!index || !articles || !articles[index]) {
    articleView.innerHTML = '<p class="text-danger text-center">Article not found.</p>';
    return;
  }

  const article = articles[index];

  const formattedContent = article.content
    ? article.content
    : `<p>${article.description}</p>`;

  articleView.innerHTML = `
    <article style="max-width: 800px; margin: auto; background-color: #202123; padding: 1rem; border-radius: 10px; box-shadow: 0 0 15px #00ffbc;">
      <img src="${article.image}" alt="News Image" style="width: 100%; height: auto; object-fit: cover; border-radius: 10px 10px 0 0;">
      <h2 class="mt-3 mb-3" style="color:#00f2c3;">${article.title}</h2>
      ${formattedContent}
    </article>
  `;
}

loadArticle();

 document.title = article.title;
    document.getElementById('og-title').setAttribute('content', article.title);
    document.getElementById('og-desc').setAttribute('content', article.description);
    document.getElementById('og-image').setAttribute('content', article.image);
    document.getElementById('og-url').setAttribute('content', window.location.href);