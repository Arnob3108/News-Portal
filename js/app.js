const loadCatagoris = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    displayCatagorys(data.data.news_category)
}

const displayCatagorys = catagorys => {
    const catagoryList = document.getElementById('catagory-section');
    for (const catagory of catagorys) {
        // console.log(catagory)
        const li = document.createElement('li');
        li.innerHTML = `<a onclick="loadCatagorisNews('${catagory.category_id}')">${catagory.category_name}</a>`;
        catagoryList.appendChild(li);
    }

}
const loadCatagorisNews = async (id) => {
    // console.log(id)
    loader(true)
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    displayNews(data.data);

}

const displayNews = allNews => {
    const newsSection = document.getElementById('news');
    newsSection.textContent = ``;
    const noNewsFound = document.getElementById('no-phone-found')
    if (allNews.length === 0) {
        noNewsFound.classList.remove('hidden')
    }
    else {
        noNewsFound.classList.add('hidden')
    }

    for (const news of allNews) {
        console.log(news.image_url)
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="h-96 my-8 card lg:card-side bg-base-100 shadow-xl hover:shadow-indigo-900/50">
            <figure><img class="w-80 h-full p-5" src="${news.image_url}" alt="Movie"></figure>
            <div class="card-body">
                <h2 class="card-title">New movie is released!</h2>
                <p>Click the button to watch on Jetflix app.</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Watch</button>
            </div>
            </div>
        </div>
        `;
        newsSection.appendChild(newsDiv);
    }
    loader(false);
}

const loader = isLoading => {
    const loaderDiv = document.getElementById('loader');
    if (isLoading) {
        loaderDiv.classList.remove('hidden')
    }
    else {
        loaderDiv.classList.add('hidden')
    }
}

loadCatagoris()
// loadCatagorisNews()
