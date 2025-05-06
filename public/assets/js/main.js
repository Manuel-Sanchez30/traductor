let translateButon = document.querySelector("#translateButton");

translateButon.addEventListener("click", async () => {

    let inputText = document.querySelector("#inputText");

    //capturar  valor a traducir
    const text = inputText.value.trim();

    //capturar lenguaje destino
    const targetLang = document.querySelector("#targetLang").value;

    if(!text) return false;

    //capturar mensaje del usuario en la caja de mensajes
    const userMessages = document.createElement("div");
    userMessages.className = "chat__message chat__message--user";
    userMessages.textContent = text;

    const containerMessages = document.querySelector(".chat__messages");
    containerMessages.appendChild(userMessages);

    containerMessages.scrollTop = containerMessages.scrollHeight;

    //peticion al backend
    try {
        
        const response = await fetch("/api/traducir", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                text,
                targetLang
            })
        });

        const data = await response.json();
        const resultIA = data.translateText;
        
        //Agregar respuesta de la IA al chat
        const botMessage = document.createElement("div");
        botMessage.className = "chat__message chat__message--bot"
        botMessage.textContent = resultIA;

        containerMessages.appendChild(botMessage);
        containerMessages.scrollTop = containerMessages.scrollHeight;

    } catch (error) {
        console.log(error);
    }

    //vaciar Input
    inputText.value = "";

});
