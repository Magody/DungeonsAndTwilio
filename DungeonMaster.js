const OpenAI = require('openai');
const axios = require('axios');

const openai = new OpenAI();

exports.handler = async function(context, event, callback) {
    // Getting authenticated Twilio Client
    const twilioClient = context.getTwilioClient();
    const serviceSid = '<replace your sync ID>'; // Reemplaza con tu Sync Service SID
    
    console.log('Event:', JSON.stringify(event, null, 2));

    // Extracting the message and sender's info from the event
    const profileName = event.ProfileName;
    const fromNumber = event.From;
    const myNumber = event.To;
    const incomingMessage = event.Body;
    
    const syncMapName = "default";

    try {
        // Guardar el mensaje entrante en Twilio Sync
        await twilioClient.sync.services(serviceSid)
            .syncMaps(syncMapName)
            .syncMapItems
            .create({
                key: `${Date.now()}`, // Usar el timestamp como clave
                data: { from: fromNumber, to: myNumber, message: incomingMessage, timestamp: new Date().toISOString(), role: 'user' }
            });

        // Recuperar el historial de mensajes
        const syncMapItems = await twilioClient.sync.services(serviceSid)
            .syncMaps(syncMapName)
            .syncMapItems
            .list();
        
        const chatHistory = syncMapItems.map(item => item.data);

        // Preparar el historial para enviar a OpenAI
        const chatMessages = [
            { role: "system", content: `You are a virtual Dungeon Master (DM) for a single-player Dungeons and Dragons (D&D) adventure. Guide the player through an exciting journey, keeping it fun, interactive, and true to D&D rules.

            Instructions:

            Introduction: Greet the player, explain the adventure's setting and objective.
            Character Creation: Assist in creating the character with humorous descriptions.
            Narration: Describe detailed scenarios with humor, introduce challenges and combat.
            Interaction: Ask for actions and decisions, offer options, adapt the story.
            Combat: Describe combat vividly, guide through mechanics, present creative puzzles.
            Engagement: Use humor, witty dialogue, and entertaining descriptions.
            Keep your answer short! Because this cost money XD
            The profile name of the user is: ${profileName}
            ` }
        ];

        chatHistory.forEach(chat => {
            chatMessages.push({ role: chat.role, content: chat.message });
        });

        // Añadir el mensaje entrante al final
        chatMessages.push({ role: "user", content: incomingMessage });

        // Llamar a OpenAI para obtener la respuesta
        const completion = await openai.chat.completions.create({
            messages: chatMessages,
            model: "gpt-3.5-turbo-0125",
        });
      
        const replyMessage = completion.choices[0]['message']['content'];
        console.log(replyMessage);
        
        
        await twilioClient.sync.services(serviceSid)
            .syncMaps(syncMapName)
            .syncMapItems
            .create({
                key: `${Date.now()}`, // Usar el timestamp como clave
                data: { from: fromNumber, to: myNumber, message: replyMessage, timestamp: new Date().toISOString(), role: 'assistant' }
            });
            
        
        const message_text = await twilioClient.messages.create({
            from: myNumber, // The Twilio WhatsApp number
            to: fromNumber,
            body: replyMessage
        });
        
        console.log(`Message text sent: ${message_text.sid}`);
        
        const response = await axios.post('https://redwood-koala-4781.twil.io/xDImage', {
            text: replyMessage,
            myNumber: myNumber,
            to: fromNumber,
        });
        
        callback(null, message_text.sid);
    } catch (error) {
        console.error('Error sending message:', error);
        callback(error);
    }
};
