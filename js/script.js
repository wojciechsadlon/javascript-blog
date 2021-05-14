// document.getElementById('test-button').addEventListener('click', function(){
//     const links = document.querySelectorAll('.titles a');
//     console.log('links:', links);
//   });

const titleClickHandler = function(){
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    event.preventDefault();
    const activeLinks = document.querySelectorAll('.titles a.active');
    const clickedElement = this;
    const activeArticles = document.querySelectorAll('.posts article.active');

    console.log('clickedElement (with plus): ' + clickedElement);

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

    const articleId = (clickedElement.getAttribute('href')).replace('#','');
    console.log(articleId);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const chosenArticle = document.getElementById(articleId);

    /* [DONE] add class 'active' to the correct article */

    chosenArticle.classList.add('active');


}

  
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
  link.addEventListener('click', titleClickHandler);
}