const API_KEY = "9103086726114a34a81c35759e8d37e8";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("india"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
}

function reload(){
  window.location.reload();
}

function bindData(articles){
  const cardsContainer = document.getElementById('cards-container');
  const newsCardTemplate = document.getElementById('tempalte-news-card');

  cardsContainer.innerHTML = '';

  articles.forEach(article => {
    if(!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone,article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone,article){
  const newsImg = cardClone.querySelector('#news-img');
  const newsTitle = cardClone.querySelector('#news-title');
  const newsSource = cardClone.querySelector('#news-source');
  const newsDesc = cardClone.querySelector('#news-desc');


  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US" , {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} : ${date}`;

  cardClone.firstElementChild.addEventListener('click',()=> {
    window.open(article.url, "_blank");
  });
}

var curSelectedNav = null;

function onNavItemClick(id){
  fetchNews(id);
  const NavItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");        
  //remove the active class from the previous when clicked on the new one
  curSelectedNav = NavItem;
  curSelectedNav.classList.add("active");
}

const searcButton = document.getElementById('search-button');
const searchText = document.getElementById('search-news');


searcButton.addEventListener('click', ()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    curSelectedNav.classList.remove("active");
    curSelectedNav = null;
});
