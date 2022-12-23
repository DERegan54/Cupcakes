const API_Base_URL = "http://127.0.0.1:5000";

// Generate HTML with given cupcake data 
function generateCupcakeListHTML(cupcake) {
    return `
        <div data-cupcake-id=${cupcake.id}>
            <img class="cupcake-image" src="${cupcake.image} alt="No image available for ${cupcake.flavor}.">
            <li>
                <br> 
                Flavor: ${cupcake.flavor}
                <br>
                Size: ${cupcake.size}
                <br>
                Rating: ${cupcake.rating}
                <br>
                <button class="delete">Delete Cupcake</button>
                <br>
                <hr>
            </li>
        </div>
    `;
}


// Render list of cupcakes on homepage
async function showCupcakeList() {
    const resp = await 
    axios.get(`${API_Base_URL}/api/cupcakes`);

    for (let cupcakeData of resp.data.cupcakes) {
        let newCupcake = $(generateCupcakeListHTML(cupcakeData));
        $("#cupcake-list").append(newCupcake);
    }
}


// Handle form submission for adding a cupcake
$("#add-cupcake-form").on("submit", async function(e) {
    e.preventDefault();

    let flavor = $("#flavor-input").val();
    let size = $("#size-input").val();
    let rating = $("#rating-input").val();
    let image = $("#image-url-input").val();

    const addCupcakeResp = await axios.post(`${API_Base_URL}/api/cupcakes`, {
        flavor, rating, size, image 
    });

    let newCupcake = $(generateCupcakeListHTML(addCupcakeResp.data.cupcake));
    $("#cupcake-list").append(newCupcake);
    $("#add-cupcake-form").trigger("reset");
});


// Handle for submission for deleting cupcake

$("#cupcake-list").on("click", ".delete", async function(e) {
    e.preventDefault();
    let $cupcake = $(e.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");

    await axios.delete(`${API_Base_URL}/api/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});

$(showCupcakeList);