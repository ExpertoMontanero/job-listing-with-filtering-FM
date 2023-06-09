// FETCHING JSON FILE
let data = '';
fetch('data.json')
    .then(response => response.json())
    .then(json => {
        json.forEach(json =>
            $('#main-section').append(
                ` 
        <div class="box ${cardBorder(json.featured)}">
            <div class="inside-box">
                <div class="left-part">
                    <img src="${json.logo}" class="logo" alt="logo">
                    <div class="rows-section">
                        <div class="row first-row">
                            <h2 class="brand">${json.company}</h2>
                          ${createNewTag(json.new)}
                          ${createFeaturedTag(json.featured)}
                        </div>
                        <div class="row second-row">
                            <h1 class="title">${json.position}</h1>
                        </div>
                        <div class="row third-row">
                            <p class="info">${json.postedAt}</p>
                            <hr>
                            <p class="info">${json.contract}</p>
                            <hr>
                            <p class="info">${json.location}</p>
                        </div>
                    </div>
                </div>
                <hr class="mobile-hr">
                <div class="right-part">
                    ${createButtons(json.role, 'role')} 
                    ${createButtons(json.level, 'level')}
                    ${createButtons(json.languages, 'languages')}
                    ${createButtons(json.tools, 'tools')}
                </div>
            </div>
        </div>
    `)
        );
    });

// CREATING ('NEW!' TAG)
const createNewTag = (newTag) => {
    let tag = "";
    if (newTag) tag = `<h3 class="special-label new-label">NEW!</h3>`

    return tag;
};

// CREATING ('FEATURED' TAG)
const createFeaturedTag = (newTag) => {
    let tag = "";
    if (newTag) tag = `<h3 class="special-label featured-label">FEATURED</h3>`

    return tag;
};

// BUTTONS CREATION (role, level, languages, tools)
const createButtons = (component, type) => {
    let post = '';
    if (component) {
        if (Array.isArray(component)) {
            component.forEach(element => {
                if (type == 'languages') {
                    post += `<button class="filter-button languages"> ${element}</button>`
                }
                if (type == 'tools') {
                    post += `<button class="filter-button  tools"> ${element}</button>`
                }
            });
            return post;
        }
        else if (type == 'role') {
            let post = '';
            post = `<button class="filter-button role"> ${component}</button>`
            return post;
        }
        else if (type == 'level') {
            let post = '';
            post = `<button class="filter-button level"> ${component}</button>`
            return post;
        }
    }
}

//ADDING (FEATURED LABEL) WRAPPING BORDER 
const cardBorder = (featured) => {
    if (featured) {
        return "featured-border";
    }
};
//FILTER BAR CREATION
var activeFilters = [];
var filterBarCreated = false;
var parentSection = $('#filter-section');
$('#main-section').on('click', '.filter-button', function () {
    if (filterBarCreated == false) {
        $('#filter-section').append(`<div id="filter-bar">
<div id="buttons-bar">
<div class="filter-item">
    <p class="filter-item-text">${this.textContent}</p>
    <button class="delete-filter-btn"></button>
</div>
</div>
<button id="clear-btn">Clear</button>
</div> `)
        filterBarCreated = true;
        activeFilters.push(this.textContent);
    }
    //preventing multiplying same filters
    if (!($('.filter-item-text').filter(`:contains('${this.textContent}')`).length > 0)) {
        $('#buttons-bar').append(`<div class="filter-item">
        <p class="filter-item-text">${this.textContent}</p>
        <button class="delete-filter-btn"></button>
    </div>`)
        activeFilters.push(this.textContent);
    }
});

//deleting button or whole filter bar if the number of filter buttons is 0
$('#filter-section').on('click', '.delete-filter-btn', function () {
    $(this).parent().remove();
    if (!$('#buttons-bar').has($('.filter-item')).length > 0) {
        $('#filter-bar').remove();
        filterBarCreated = false;
    }
});

//clear button 
$('#filter-section').on('click', '#clear-btn', function () {
    $('#filter-bar').remove();
    $('.box').show();
    filterBarCreated = false;
    activeFilters = [];
});

//ACTUALL FILTERING

//applying filter

$('#main-section').on('click', '.filter-button', function () {
    var element = $(`.right-part:not(:contains(${this.textContent}))`);
    (element).closest($('.box')).hide();
});

//removing filter
$('#filter-section').on('click', '.delete-filter-btn', function () {
    activeFilters.splice(activeFilters.indexOf(`${$(this).siblings('.filter-item-text').text()}`), 1);
    $('.box').each(function (index, element) {
        var currentElement = $(element);
        doesElementContainAll(currentElement.find('.filter-button'), activeFilters);
    });
});

//showing boxes when removing filters function
function doesElementContainAll(element, arr) {
    var filtr = $(element.text().split(" ")).toArray();
    const array = arr.map(elements => elements.trim());
    for (var i = 0; i < array.length; i++) {
        if (!filtr.includes(`${array[i]}`)) {
            return false;
        }
    }
    element.closest('.box').css('display', 'block');
}
