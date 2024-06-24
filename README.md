*This is a submission for the [Twilio Challenge ](https://dev.to/challenges/twilio)*

## What I Built
This project demonstrates the integration of Twilio's communication services with OpenAI's GPT-3.5 and DALL-E models to create an interactive and engaging virtual Dungeon Master (DM) experience for a single-player Dungeons and Dragons (D&D) adventure. The system leverages Twilio for managing incoming and outgoing messages, while OpenAI's models generate narrative responses and creative images based on player inputs.

**_Impact:_**
The project offers a unique, AI-driven interactive storytelling experience for D&D players, enhancing their engagement and immersion in the game. By combining natural language processing and image generation capabilities, it provides personalized and entertaining gameplay that can adapt dynamically to the player's actions and decisions.

![Web Whatsapp sample](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lyj2oqxkjny0h29yvmgr.png)

I'm using Twilio Sync, a LLM from open AI, DALL-E and Twilio Functions to capture the webhook from whatsapp.

![Architecture](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eo0xv5aboyzhv3ui53e5.png)

## Demo

[Code](https://github.com/Magody/DungeonsAndTwilio/tree/main):  https://github.com/Magody/DungeonsAndTwilio/tree/main

Here is the demo:
{% embed https://drive.google.com/file/d/1LTQk7Asf1iT82ue-K1ntaL5WR3jyLEez/preview %}

## Twilio and AI
### Main Functionalities

#### Message Handling with Twilio
- **Incoming Message Processing:** Captures incoming messages from players via Twilio's messaging service, extracting key information such as the sender's profile name, phone number, and message content.
- **Message Storage:** Utilizes Twilio Sync to store and retrieve the history of messages, ensuring a consistent narrative flow and context-aware interactions.

#### Chat History Management
- **Sync Map Creation:** Messages are stored in a Sync Map with unique keys based on timestamps, allowing easy retrieval and organization of chat history.
- **Contextual Chat History Preparation:** Prepares a structured chat history for OpenAI's language model, including the system's instructions and previous messages.

#### AI-Powered Dungeon Master (DM)
- **OpenAI GPT-3.5 Integration:** Generates dynamic, context-aware responses to player inputs, guiding them through the adventure with engaging and humorous narratives. Ensures the AI follows D&D rules and keeps the game interactive and fun.
- **Interactive Storytelling:** The AI asks the player about their actions, offers choices, and adapts the storyline based on the player's decisions, creating a personalized gaming experience.

#### Image Generation with DALL-E
- **Creative Image Generation:** Uses OpenAI's DALL-E model to generate humorous and magical images based on the player's narrative inputs, enhancing the visual aspect of the game.
- **Media Messaging:** Sends the generated images to the player via Twilio's messaging service, enriching the storytelling experience with visual elements.

## Additional Prize Categories

I think this app falls into:
- Twilio Times Two: I use Twilio WhatsApp integration with web hooks to a Twilio function, also Twilio Sync to temporary store a database
- Entertaining Endeavors: The best of Dungeons and Dragons for me, it is to create a unique story. Generative AI is perfect for this, and could generate as much as you want.

# Instalation:
- Create the Twilio functions
- Add the Open AI Key
- Add axios, openai as dependency
- Connect whatsapp through web hook
- Send the first message to link your number to whatsapp sandbox
