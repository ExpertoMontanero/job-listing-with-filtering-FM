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
                    <img src="${json.logo}" alt="">
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

const createNewTag = (newTag) => {
    let tag = "";
    if (newTag) tag = `<h3 class="special-label new-label">NEW!</h3>`

    return tag;
};

const createFeaturedTag = (newTag) => {
    let tag = "";
    if (newTag) tag = `<h3 class="special-label featured-label">FEATURED</h3>`

    return tag;
};

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





    // "id": 9,
    // "company": "Eyecam Co.",
    // "logo": "./images/eyecam-co.svg",
    // "new": false,
    // "featured": false,
    // "position": "Full Stack Engineer",
    // "role": "Fullstack",
    // "level": "Midweight",
    // "postedAt": "3w ago",
    // "contract": "Full Time",
    // "location": "Worldwide",
    // "languages": ["JavaScript", "Python"],
    // "tools": ["Django"]
