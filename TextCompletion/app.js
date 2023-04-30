const HTMLResponse = document.getElementById("response")

async function fetchData() {

    const API_KEY = prompt("Enter api key");
    const aprompt = prompt("Ask the AI what you want");
    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: `${aprompt}`,
            max_tokens: 30
        })
    })

    // const modelresponse = await fetch("https://api.openai.com/v1/models", {
    //     method: "GET",
    //     headers: {
    //         Authorization: `Bearer ${API_KEY}`,
    //     },

    // })

    const data = await response.json();
    HTMLResponse.textContent = data.choices[0].text + "         also i'm going to EAT dante MUAHAHHA";
    console.log(data);
    // const modeldata = await modelresponse.json();
    // console.log(modeldata);
}

fetchData();