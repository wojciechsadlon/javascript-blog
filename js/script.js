/* eslint-disable no-empty */
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloud: Handlebars.compile(document.querySelector('#template-tag-cloud').innerHTML),
  authorSidebar: Handlebars.compile(document.querySelector('#template-author-sidebar').innerHTML),
};

const select = {
  article: {
    all: '.post',
    title: '.post-title',
  },
  list: {
    titles: '.list.titles',
  },
  links: {
    author: 'a[href^="#author-"]',
    titles: '.titles a',
    tags: 'a[href^="#tag-"]',
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

  const articleId = clickedElement.getAttribute('href').replace('#', '');

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

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

    listTitles.innerHTML += linkHTML;
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

const generateTags = function() {

  const articles = document.querySelectorAll(select.article.all);
  let allTags = {};

  for(let article of articles){

    const tagsWrapper = article.querySelector('.list.list-horizontal');

    tagsWrapper.innerHTML = '';

    const tags = article.getAttribute('data-tags').split(' ');

    for(let tag of tags){
      const linkHtmlData = {id: tag, title: tag};
      const linkHtml = templates.tagLink(linkHtmlData);

      tagsWrapper.innerHTML += linkHtml;

      if(!allTags[tag]){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
  }

  const itemList = document.querySelector('.tags');
  const itemsParams = calculateTagsParams(allTags);
  const allTagsData = {tags: []};

  for(let tag in allTags){

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], itemsParams)
    });

    itemList.innerHTML = templates.tagCloud(allTagsData);
  }
};

const generateAuthors = function() {

  const articles = document.querySelectorAll(select.article.all);
  let allAuthors = {};

  for(let article of articles){

    const authorsWrapper = article.querySelector('.post-author');

    const author = article.getAttribute('data-author');

    const linkHtmlData = {id: author, title: author};
    const linkHtml = templates.authorLink(linkHtmlData);
    authorsWrapper.innerHTML = linkHtml;
    if(!allAuthors[author]){
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }

  }

  const itemList = document.querySelector('.authors');
  const allAuthorsData = {authors: []};

  for(let author in allAuthors){

    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });

    itemList.innerHTML = templates.authorSidebar(allAuthorsData);

  }
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
