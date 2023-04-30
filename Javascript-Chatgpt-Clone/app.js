
const submitButton = document.getElementById('submit');
const outPutElement = document.getElementById('output');
const inputElement = document.querySelector('input');
const historyElement = document.querySelector('.history');
const buttonElement = document.querySelector('button');
const bottomSection = document.querySelector('.bottom-section')

document.addEventListener('keyup', (event) => {
    //console.log(event);
    if (event.key === 'Enter')
        getMessage();

})
//console.log(bottomSection.offsetHeight);

function changeInput(value) {
    const inputElement = document.querySelector('input');
    inputElement.value = value;
}

async function getMessage() {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${API_KEY}`
        },

        body: JSON.stringify({
            model: "gpt-3.5-turbo-0301",
            messages: [{ role: "user", content: inputElement.value }],
            max_tokens: 1000
        })

    }

    if (!!(inputElement.value).trim()) {
        try {
            const RESPONSE = await fetch('https://api.openai.com/v1/chat/completions', options)
            const ModelRESPONSE = await RESPONSE.json();
            console.log(ModelRESPONSE);
            const ModelContent = ModelRESPONSE.choices[0].message.content;

            if (!!ModelContent.trim()) {
                outPutElement.textContent = ModelContent;
                const pHistoryElement = document.createElement('p');
                pHistoryElement.textContent = inputElement.value;
                pHistoryElement.addEventListener('click', () => changeInput(pHistoryElement.textContent))
                historyElement.append(pHistoryElement);
                outPutElement.textContent = ModelContent;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    else
        console.log("no input data");

}

submitButton.addEventListener('click', getMessage);

function clearInput() {
    inputElement.value = ''
}

buttonElement.addEventListener('click', clearInput);

const handleOnMouseMove = e => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
}

for (const mybuttons of document.querySelectorAll("button")) {
    mybuttons.onmousemove = e => handleOnMouseMove(e);
}

const API_KEY = prompt("Enter API KEY");