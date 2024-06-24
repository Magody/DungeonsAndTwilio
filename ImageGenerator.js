const OpenAI = require('openai');

const openai = new OpenAI();

exports.handler = async function(context, event, callback) {
    // Getting authenticated Twilio Client
    const twilioClient = context.getTwilioClient();
    
    // Extracting the message and sender's info from the event
    const text = event.text;
    const myNumber = event.myNumber;
    const to = event.to;

    try {
        const response = await openai.images.generate({
          model: "dall-e-2",
          prompt: `Generate a simple magical image, without text, based on this. Try that to be very comic: ${text.substr(1, 100)}`,
          n: 1,
          size: "512x512",
        });
        image_url = response.data[0].url;
        
        const message = await twilioClient.messages.create({
            from: myNumber, // The Twilio WhatsApp number
            to: to,
            mediaUrl: [image_url]
        });
        
        callback(null, message.sid);
    } catch (error) {
        console.error('Error sending message:', error);
        callback(error);
    }
};
