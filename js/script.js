/* eslint-disable no-empty */
const select = {
  article: {
    all: '.post',
    title: '.post-title',
  },
  list: {
    titles: '.list.titles',
  },
  links: {
    author: '.post-author a',
    titles: '.titles a',
    tags: '.post-tags a',
  },
};

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
  let listTitles = document.querySelector(select.list.titles);
  listTitles.innerHTML = '';

  const articles = document.querySelectorAll('.post' + customSelector);

  for(let article of articles){
    const articleId = article.getAttribute('id');
    const articleTitle = article.querySelector(select.article.title).innerHTML;

    const listElement = document.createElement('li');

    listElement.innerHTML ='<a href="' + articleId + '"><span>' + articleTitle + '</span></a>';

    listTitles.appendChild(listElement);
  }

  const links = document.querySelectorAll(select.links.titles);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
};

generateTitleLinks();

const calculateTagsParams = function(tags){
  const tagMinMax = {
    min : 99999,
    max : 0,
  };

  // for(let tag in tags){

  //   tagMinMax.min = Math.min(tags[tag], tagMinMax.min);
  //   tagMinMax.max = Math.max(tags[tag], tagMinMax.max);

  // }

  for(let tag in tags){
    if(tags[tag] > tagMinMax.max){
      tagMinMax.max = tags[tag];
    } else if (tags[tag] < tagMinMax.min){
      tagMinMax.min = tags[tag];
    }
  }

  return tagMinMax;
};

const calculateTagClass = function(count, params){

  const classNumber = (count - params.min)/(params.max - params.min);
  const className = 'tag-size-' + Math.floor(classNumber * (5 - 1) +1);

  return className;

};

const generateItems = function(elementSelector, dataAttribute, hrefPrefix = '', listSelector, splitValue){
  const articles = document.querySelectorAll(select.article.all);
  let allItems = {};

  for(let article of articles){

    const itemWrapper = article.querySelector(elementSelector);

    itemWrapper.innerHTML = '';

    const dataItems = article.getAttribute(dataAttribute).split(splitValue);

    for(let dataItem of dataItems){
      const htmlLink = '<li><a href="#' + hrefPrefix + dataItem + '">' + dataItem + '</a></li>';
      itemWrapper.innerHTML += htmlLink;
      if(!allItems[dataItem]){
        allItems[dataItem] = 1;
      } else {
        allItems[dataItem]++;
      }
    }
  }

  const itemList = document.querySelector(listSelector);
  const itemsParams = calculateTagsParams(allItems);
  let allItemsHTML = '';
  for(let item in allItems){
    if(listSelector === '.tags'){
      allItemsHTML += '<li class="' + calculateTagClass(allItems[item], itemsParams) + '"><a href="#' + hrefPrefix + item + '">' + item + ' (' + allItems[item] + ') </a></li>';
    } else if(listSelector === '.authors'){
      allItemsHTML += '<li><a href="#' + hrefPrefix + item + '">' + item + ' (' + allItems[item] + ') </a></li>';
    }
    itemList.innerHTML = allItemsHTML;
  }
};

const generateTags = function() {
  generateItems('.list.list-horizontal', 'data-tags', 'tag-', '.tags', ' ');
};
const generateAuthors = function() {
  generateItems('.post-author','data-author', 'author-', '.authors');
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
  const tagLinks = document.querySelectorAll(select.links.tags);

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
  const authorLinks = document.querySelectorAll(select.links.author);

  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();



