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

function generateTags(){
  const articles = document.querySelectorAll('.post');

  for(let article of articles){

    const tagWrapper = article.querySelector('.list.list-horizontal');

    tagWrapper.innerHTML = '';

    const dataTags = article.getAttribute('data-tags').split(' ');

    for(let dataTag of dataTags){
      const htmlLink = '<a href="#tag-' + dataTag + '">' + dataTag + '</a>';
      const linkElement = document.createElement('li');
      linkElement.innerHTML = htmlLink;
      tagWrapper.appendChild(linkElement);
    }
  }
}

generateTags();

const tagClickHandler = function(event){
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');

  /* find all tag links with class active */
  const activeTags = 'a.active[href^="#tag-"]';

  /* START LOOP: for each active tag link */

  removeActive(activeTags);

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefLinks = 'a[href=:"' + href + '"]';

  /* START LOOP: for each found tag link */

  addActive(hrefLinks);

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');

};

function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('.post-tags a');

  for(let tagLink of tagLinks){
    tagLink.addEventListener('click', tagClickHandler());
  }
}

addClickListenersToTags();

