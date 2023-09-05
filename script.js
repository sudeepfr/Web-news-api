const API_KEY = "ab280ae9093d4a19ba5924b83c86aafe";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchapidomain(" news"));

async function fetchapidomain(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);

}

function bindData(articles) {
    let newscard = document.getElementById('newscard');
    let templetecardnews = document.getElementById('templete-card-news');

    newscard.innerHTML = "";


    articles.forEach(article => {
        if (!article.urlToImage) {
            return;
        }

        const clone = templetecardnews.content.cloneNode(true);

        let cardimage = clone.getElementById('card-image');
        let title = clone.getElementById('title');
        let newsdisc = clone.getElementById('news-disc');
        let newssource = clone.getElementById('news-source');

        cardimage.src = article.urlToImage;
        title.innerHTML = article.title;
        newsdisc.innerHTML = article.description;
        newssource.innerHTML = article.source.name;


        clone.firstElementChild.addEventListener("click", () => {
            window.open(article.url, "_blank");
        })
        newscard.appendChild(clone);
    });


}
let rem = null;
let navfont = document.querySelectorAll(".navfont");

navfont.forEach((navItem) => {
    navItem.addEventListener("click", () => {
        navfont.forEach((element) => {
            element.style.backgroundColor = "";
            element.style.color = "";
        });

        navItem.style.backgroundColor = "white";
        navItem.style.color = "black";

        rem = navItem.textContent;
        fetchapidomain(rem);
    });
});

let nightmode = document.querySelector(".nightmode");
let nightbutton = document.querySelector(".nightbutton");

let body = document.body;
let mode = false;
nightmode.addEventListener("click", () => {
    mode = !mode;
    if (mode) {
        nightbutton.style.backgroundColor = "white";
        nightbutton.style.color = "black";
        body.style.backgroundColor = "black";
         nightbutton.textContent="Day";


    }
    else {
        nightbutton.style.backgroundColor = "black";
        nightbutton.style.color = "white";
        body.style.backgroundColor = "white";
        nightbutton.textContent="Night";

    }
})
let input = document.getElementById("input");
let button = document.getElementById("button");

button.addEventListener("click", () => {
    const query = input.value;
    if (!query) return;
    fetchapidomain(query);

    navfont.forEach((element) => {
        element.style.backgroundColor = "";
        element.style.color = "";
    });
})
