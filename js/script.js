const removeActive = (selector) => {
  const activeLinks = document.querySelectorAll(selector);

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
};

const addActive = (selector) => {
  const activeLinks = document.querySelectorAll(selector);

  for(let activeLink of activeLinks){
    activeLink.classList.add('active');
  }
};

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;

  removeActive('titles a.active');
  removeActive('.posts article.active');

  clickedElement.classList.add('active');

  const articleId = clickedElement.getAttribute('href');

  const chosenArticle = document.getElementById(articleId);

  chosenArticle.classList.add('active');
};

const generateTitleLinks = (customSelector = '') => {
  let listTitles = document.querySelector('.list.titles');
  listTitles.innerHTML = '';

  const articles = document.querySelectorAll('.post' + customSelector);

  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector('.post-title').innerHTML;

    const listElement = document.createElement('li');

    listElement.innerHTML ='<a href="' + articleId + '"><span>' + articleTitle + '</span></a>';

    listTitles.appendChild(listElement);
  }

  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};

generateTitleLinks();

const generateItems = function(elementSelector, dataAttribute, hrefPrefix = '', splitValue){
  const articles = document.querySelectorAll('.post');

  for(let article of articles){

    const itemWrapper = article.querySelector(elementSelector);

    itemWrapper.innerHTML = '';

    const dataItems = article.getAttribute(dataAttribute).split(splitValue);

    for(let dataItem of dataItems){
      const htmlLink = '<a href="#' + hrefPrefix + dataItem + '">' + dataItem + '</a>';
      const linkElement = document.createElement('li');
      linkElement.innerHTML = htmlLink;
      itemWrapper.appendChild(linkElement);
    }
  }
};

const generateTags = function() {
  generateItems('.list.list-horizontal', 'data-tags', 'tag-', ' ');
};
const generateAuthors = function() {
  generateItems('.post-author','data-author', 'author-');
};


generateTags();

const tagClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-','');
  const activeTags = 'a.active[href^="#tag-"]';

  removeActive(activeTags);

  const hrefLinks = 'a[href="' + href + '"]';

  addActive(hrefLinks);

  generateTitleLinks('[data-tags~="' + tag + '"]');
};

function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('.post-tags a');

  for(let tagLink of tagLinks){
    tagLink.addEventListener('click', tagClickHandler);
  }
}



addClickListenersToTags();

generateAuthors();

const authorClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-','');

  const activeAuthors = 'a.active[href^="#author-"]';

  removeActive(activeAuthors);

  const hrefLinks = 'a[href="' + href + '"]';

  addActive(hrefLinks);

  generateTitleLinks('[data-author="' + author + '"]');
};

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('.post-author a');
  console.log(authorLinks);

  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();

