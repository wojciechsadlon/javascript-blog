const titleClickHandler = function(){

    /* [DONE] remove class 'active' from all article links  */
    event.preventDefault();
    const activeLinks = document.querySelectorAll('.titles a.active');
    const clickedElement = this;
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeLink of activeLinks){
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    for(let activeArticle of activeArticles){
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleId = clickedElement.getAttribute('href').replace('#','');

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const chosenArticle = document.getElementById(articleId);

    /* [DONE] add class 'active' to the correct article */

    chosenArticle.classList.add('active');
}

const generateTitleLinks = function(){
    let listTitles = document.querySelector('.list.titles');
    listTitles.innerHTML = '';

    const articles = document.querySelectorAll('.post');

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
}

generateTitleLinks();