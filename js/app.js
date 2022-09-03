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

const displayNews = async (allNews) => {
    console.log()
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
        // console.log(news.title)
        let totalNumberOfNews = document.getElementById('total-news');

        totalNumberOfNews.innerHTML = `
    <div class="p-3 my-10">
        <h1>${allNews.length} items available in This category</h1>
    </div>
    `;
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="lg:h-96 my-8 card lg:card-side bg-base-100 shadow-xl hover:shadow-indigo-900/50">
            <figure><img class="w-full h-full p-5" src="${news.image_url}" alt="Movie"></figure>
            <div class="card-body">
                <h2 class="card-title lg:text-3xl mb-5">${news.title}</h2> <br>
                <p class="text-justify lg:text-lg">${news.details.length > 20 ? news.details.slice(0, 200) + '...' : news.details}</p>
                <p class="text-justify lg:text-lg">${news.details.length > 20 ? news.details.slice(201, 400) + '...' : news.details}</p>
                <div class="flex gap-4 mt-5 justify-between items-center">
                <div class="flex items-center gap-4">
                    <div class="avatar">
                        <div
                            class="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src="${news.author.img}" />
                        </div>
                    </div>
                    <div>
                        <h1>${news.author.name ? news.author.name : 'No Data Available'}</h1>
                        <p>${news.author.published_date ? news.author.published_date : 'No Data Available'}</p>

                    </div>
                </div>
                <div class="flex gap-4 items-center">
                    <i class="fa-regular fa-eye"></i>
                    <p>${news.total_view ? news.total_view : 'No Data Available'}</p>
                </div>
                <div onclick="newsDetails('${news._id}')" class="card-actions justify-end">
                <!-- The button to open modal -->
                <label for="my-modal-4" class="btn modal-button">open modal</label>
                </div >
            </div >
            </div >
        </div >
    `;
        newsSection.appendChild(newsDiv);
    }
    loader(false);
}
// modal
const newsDetails = async (news_id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${news_id}`);
    const data = await res.json();
    console.log(data.data[0]);
}
newsDetails()

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
