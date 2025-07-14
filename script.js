const newsContainer = document.getElementById('news-container');
const categoryList = document.getElementById('category-list');

let articles = [];
let filteredArticles = [];
let selectedCategory = 'All';

async function fetchNews() {
  try {
    const response = await fetch('news.json');
    const data = await response.json();
    articles = data.articles;

    initCategories();
    filterAndRender();
    localStorage.setItem('allArticles', JSON.stringify(articles));
  } catch (error) {
    console.error('Error loading news:', error);
    newsContainer.innerHTML = `<p class="text-danger text-center">Unable to load news. Please try again.</p>`;
  }
}

function initCategories() {
  const categories = ['All', ...new Set(articles.map(a => a.category).filter(Boolean))];
  categoryList.innerHTML = '';

  categories.forEach(cat => {
    const li = document.createElement('li');
    const link = document.createElement('a');

    link.className = `dropdown-item text-light bg-dark`;
    link.href = '#';
    link.textContent = cat;

    link.addEventListener('click', () => {
      selectedCategory = cat;
      filterAndRender();
    });

    li.appendChild(link);
    categoryList.appendChild(li);
  });
}

function filterAndRender() {
  filteredArticles = articles.filter(article =>
    selectedCategory === 'All' || article.category === selectedCategory
  );

  renderArticles(filteredArticles);
}

function renderArticles(list) {
  newsContainer.innerHTML = '';

  if (list.length === 0) {
    newsContainer.innerHTML = `<p class="text-center text-muted">No results found.</p>`;
    return;
  }

  const row = document.createElement('div');
  row.className = 'row g-4';

  list.forEach((article, index) => {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 col-sm-12';

    // ✅ Format published date
    const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    col.innerHTML = `
      <article class="card bg-dark text-light border-0 shadow-sm h-100">
        <img src="${article.image}" class="card-img-top" alt="News Image" />
        <div class="card-body d-flex flex-column">
        <p class="card-text small text-muted mb-1">Published: ${formattedDate}</p>
          <h3 class="card-title">${article.title}</h3>
          <p class="card-text flex-grow-1">${article.description}</p>
          <button onclick="viewNews(${articles.indexOf(article)})" class="btn btn-info mt-auto align-self-start">Read more</button>
        </div>
      </article>
    `;

    row.appendChild(col);
  });

  newsContainer.appendChild(row);
}

function viewNews(index) {
  localStorage.setItem('selectedArticleIndex', index);
  window.location.href = 'news.html';
}

fetchNews();
