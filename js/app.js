// catagory loading section from api
const loadCatagoris = async () => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
        const data = await res.json();
        displayCatagorys(data.data.news_category)
    } catch (error) {
        console.log(error);
    }

}
// catagory display section
const displayCatagorys = catagorys => {
    const catagoryList = document.getElementById('catagory-section');
    for (const catagory of catagorys) {
        // console.log(catagory)
        const li = document.createElement('li');
        li.innerHTML = `<a onclick="loadCatagorisNews('${catagory.category_id}')">${catagory.category_name}</a>`;
        catagoryList.appendChild(li);
    }

}
// load news from category from api
const loadCatagorisNews = async (id) => {
    loader(true)
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
        const data = await res.json();
        displayNews(data.data);
    } catch (error) {
        console.log(error)
    }
}
// display news section
const displayNews = async (allNews) => {
    console.log()
    const newsSection = document.getElementById('news');
    newsSection.textContent = ``;
    // no news found 
    const noNewsFound = document.getElementById('no-phone-found')
    if (allNews.length === 0) {
        noNewsFound.classList.remove('hidden')
    }
    else {
        noNewsFound.classList.add('hidden')
    }
    // news in every catagory 
    let totalNumberOfNews = document.getElementById('total-news');
    totalNumberOfNews.innerHTML = `
    <div class="p-3 my-10">
        <h1>${allNews.length} News Available In This Category</h1>
    </div>
    `;
    // sorting by views 
    allNews.sort((a, b) => b.total_view - a.total_view);
    // all news dynamicly
    for (const news of allNews) {
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="lg:h-96 my-8 card lg:card-side bg-base-100 shadow-xl hover:shadow-indigo-900/50">
            <figure><img class="w-96 h-full p-5" src="${news.image_url}" alt="Movie"></figure>
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
                        <h1>${news.author.name ? news.author.name : 'Author Not found'}</h1>
                        <p>${news.author.published_date ? news.author.published_date : 'No Date found'}</p>

                </div>
            </div>
                <div class="flex gap-4 items-center">
                    <i class="fa-regular fa-eye"></i>
                    <p>${news.total_view ? news.total_view + 'M' : 'No Data Available'}</p>
                </div>
                <div onclick="newsDetails('${news._id}')" class="card-actions justify-end">
                <!-- The button to open modal -->
                <label for="my-modal-4" class="btn glass modal-button text-xl text-blue-500 "><i class="fa-sharp fa-solid fa-circle-info"></i></label>
                </div >
                </div >
            </div >
        </div >
    `;
        newsSection.appendChild(newsDiv);
    }
    loader(false);
}
// every news details from api
const newsDetails = async (news_id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/news/${news_id}`);
        const data = await res.json();
        displayNewsDetails(data.data[0]);
    } catch (error) {
        console.log(error)
    }
}
// news details showing with modal
const displayNewsDetails = (details) => {
    const newsDetailsModalSection = document.getElementById('modal-details');
    newsDetailsModalSection.innerHTML = '';
    newsDetailsModalSection.innerHTML = `
    <figure><img class="w-full h-full" src="${details.image_url}" alt="Album"></figure>
    <h3 class="text-lg font-bold mt-4">${details.title}</h3>
        <p class="py-4">${details.details}
    <p class="py-4 text-center"> Author: <img src=" ${details.author.img
        }" class="w-10 rounded-full block mx-auto">
    </p>
    <p class="text-yellow-400 text-center">
    ${details.author.name === null
            ? 'Author Not found'
            : details.author.name === ''
                ? 'Author Not found'
                : details.author.name
        }
    </p>
    `;

}

// spinner section

const loader = isLoading => {
    const loaderDiv = document.getElementById('loader');
    if (isLoading) {
        loaderDiv.classList.remove('hidden')
    }
    else {
        loaderDiv.classList.add('hidden')
    }
}
// catagory loaded by call function
loadCatagoris()
loadCatagorisNews('08')

