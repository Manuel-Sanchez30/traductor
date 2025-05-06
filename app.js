//importar dependencias
import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

//cargar configuracion
dotenv.config();

//cargar express
const app = express();
const PORT = process.env.PORT || 3000;

//servir Frontend
app.use("/", express.static("public"));

//middelware para procesar json
app.use(express.json());

//instancia de openai y pasar el apikey
const openai = new OpenAI({
    apiKey: process.env.API_OPENAI_KEY
});

//ruta endpoint
app.post('/api/traducir', async(req,res)=>{

    const { text, targetLang } = req.body;

    const promtSystem1 = "Eres un traductor Profesional";
    const promtSystem2 = "solo puedes responder con una traduccion directa del texto que el usuario te envíe."
    + "cualquier otra respuesta o conversacion está prohibida";
    const promtUser = `Traduce el siguiente texto al ${targetLang}: ${text}`;

    //llamar al modelo de openai o LLM
    try {        
        const completion = await openai.chat.completions.create({
            model:"gpt-3.5-turbo",
            messages:[
                { role: "system", content: promtSystem1 },
                { role: "system", content: promtSystem2 },
                { role: "user", content: promtUser },
            ],
            max_tokens: 500,
            response_format:{type: "text"}
        });

        const translateText = completion.choices[0].message.content;

        return res.status(200).json({translateText})

    } catch (error) {
        return res.status(500).json({translateText})
    }     

});

    //servir el backend
    app.listen(PORT, ()=>{
        console.log(`servidor corriendo en el puerto: ${PORT}`);
    })



