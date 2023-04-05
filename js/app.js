function query_dog_api(event)
{
    //If there is already an image of a dog with the dog_image id, remove it
    if(document.querySelector(`#dog_image`))
    {
        document.querySelector(`#dog_image`).remove();
    }
    //If there is an error message displayer with the err_msg id, remove it
    if(document.querySelector(`#err_msg`))
    {
        document.querySelector(`#err_msg`).remove();
    }

    //Insert HTML to inform the user that their query is loading
    image_container.insertAdjacentHTML(`beforeend`, `<h3 id="load_msg">Loading...</h3>`)
    //Make the API request
    axios.request(
        {
            url: `https://dog.ceo/api/breeds/image/random`
        }
    ).then(dog_image_success).catch(dog_image_fail);
}

function dog_image_success(res)
{
    //Remove the loading message and inject the dog image using the data from the API
    document.querySelector(`#load_msg`).remove();
    image_container.insertAdjacentHTML(`beforeend`, 
    `<img id="dog_image" width="400px" src="${res[`data`][`message`]}" alt="Image of a dog">`);
}

function dog_image_fail(err)
{
    //Remove the loading message and inject and error message
    document.querySelector(`#load_msg`).remove();
    image_container.insertAdjacentHTML(`beforeend`, `<h3 id="err_msg">Something went wrong. Please try again.</h3>`)
}

let image_container = document.querySelector(`#image_container`);
document.querySelector(`#get_btn`).addEventListener(`click`, query_dog_api);
