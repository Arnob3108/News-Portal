const loadCatagoris = async () => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/categories`);
    const data = await res.json();
    displayCatagorys(data.data.news_category)
}

const displayCatagorys = catagorys => {
    const catagoryList = document.getElementById('catagory-section');
    for (const catagory of catagorys) {
        const li = document.createElement('li');
        li.innerHTML = `<a>${catagory.category_name}</a>`;
        catagoryList.appendChild(li);
    }
}

loadCatagoris()