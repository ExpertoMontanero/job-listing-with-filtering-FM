// FETCHING JSON FILE
let data = '';
fetch('data.json')
    .then(response => response.json())
    .then(json => {
        json.forEach(json =>
            $('#main-section').append(
                ` 
        <div class="box">
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
                    post += `<button class="languages"> ${element}</button>`
                }
                if (type == 'tools') {
                    post += `<button class="tools"> ${element}</button>`
                }
            });
            return post;
        }
        else if (type == 'role') {
            let post = '';
            post = `<button class="role"> ${component}</button>`
            return post;
        }
        else if (type == 'level') {
            let post = '';
            post = `<button class="level"> ${component}</button>`
            return post;
        }
    }
}
