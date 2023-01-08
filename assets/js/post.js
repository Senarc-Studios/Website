import FetchService from './service/FetchService';
const paste_url = "https://api.senarc.online/paste";

/*-- Objects --*/
const fetchService = new FetchService();
/*-- /Objects --*/

/*--Functions--*/
async function submitForm(e, form) {
    // 1. Prevent reloading page
    e.preventDefault();
    // 2. Submit the form
    // 2.1 User Interaction
    const btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.disabled = true;
    setTimeout(() => btnSubmit.disabled = false, 2000);
    // 2.2 Build JSON body
    const jsonFormData = buildJsonFormData(form);

    const emptyHeaders = {};
    // 2.4 Request & Response
    const response = await fetch(
        paste_url,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: `{
                "title": "${jsonFormData.title}",
                "content": "${jsonFormData.content}",
                "description": "${jsonFormData.language}",
                "text_colour": "${jsonFormData.text_colour}",
                "background_colour": "${jsonFormData.background_colour}",
                "embed_colour": "${jsonFormData.embed_colour}",
            }`
        }
    ); // Uses JSON Placeholder
    console.log(response);
    // 2.5 Inform user of result
    if(response)
        window.location = `${response.web_url}`;
    else
        alert(`An error occured.`);
}
function buildJsonFormData(form) {
    const jsonFormData = { };
    for(const pair of new FormData(form)) {
        jsonFormData[pair[0]] = pair[1];
    }
    return jsonFormData;
}
/*--/Functions--*/

/*--Event Listeners--*/
const sampleForm = document.querySelector("#sampleForm");
if(sampleForm) {
    sampleForm.addEventListener("submit", function(e) {
        submitForm(e, this);
    });
}
/*--/Event Listeners--*/