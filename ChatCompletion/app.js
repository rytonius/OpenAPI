const AIRESPONSE = document.getElementById("AIRESPONSE");
const ASSISTANT = document.getElementById("ASSISTANT")


async function fetchData(API_KEY, PROMPT) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization : `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-0301",
            messages: [
                {
                    role: "user", content: `${PROMPT}`
                    
                }
            ]
        })
    });

    const dataFromModel = await response.json();
    console.log(dataFromModel);
    ASSISTANT.textContent = dataFromModel.choices[0].message.role + ":";
    AIRESPONSE.textContent = dataFromModel.choices[0].message.content;
}
AIRESPONSE.textContent = "testing"
keyAPI = prompt("Past in API KEY");

if (!!keyAPI.trim()) {
    const promptModel = prompt("Ask the AI Overlord a question");
    fetchData(keyAPI, promptModel);
}

else 
    console.log("Forgot your api key");
