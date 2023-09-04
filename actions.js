export function setActionDefinitions(instance) {
    instance.setActionDefinitions({
        sendMessage: {
            name: "Send message",
            description: "Send a message over the Telegram bot",
            options: [
                {
                    type: 'textinput',
                    width: 6,
                    label: 'Chat ID',
                    id: 'chatId',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Message',
                    id: 'message',
                },
            ],
            callback: async (action, context) => {
                console.log("Ok")
                var parsedChatId = await instance.parseVariablesInString(action.options.chatId);
                console.log("Ok2")
                var parsedMessage = await instance.parseVariablesInString(action.options.message);
                console.log("Ok3")
                instance.bot.sendMessage(parsedChatId, parsedMessage, { parse_mode: "HTML" });
                console.log("Ok4")
            },
        },
        sendDice: {
            name: "Send dice",
            description: "Send a rolling dice over the Telegram bot",
            options: [
                {
                    type: 'textinput',
                    width: 6,
                    label: 'Chat ID',
                    id: 'chatId',
                }
            ],
            callback: async (action, context) => {
                var parsedChatId = await instance.parseVariablesInString(action.options.chatId);
                instance.bot.sendDice(parsedChatId);
            },
        },
        sendPoll: {
            name: "Send a poll",
            description: "Send a poll over the Telegram bot",
            options: [
                {
                    type: 'textinput',
                    width: 6,
                    label: 'Chat ID',
                    id: 'chatId',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Question',
                    id: 'pollQuestion',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Poll options (; seperated)',
                    id: 'pollOptions',
                },
                {
                    type: 'checkbox',
                    label: 'Anonymous',
                    id: 'isAnonymous',
                    default: true,
                },
            ],
            callback: async (action, context) => {
                var parsedChatId = await instance.parseVariablesInString(action.options.chatId);
                var parsedPollOptions = await instance.parseVariablesInString(action.options.pollOptions);
                var parsedPollQuestion = await instance.parseVariablesInString(action.options.pollQuestion)
                const pollSplit = parsedPollOptions.split(';');
                instance.bot.sendPoll(parsedChatId, parsedPollQuestion, pollSplit, { is_anonymous: action.options.isAnonymous });
            },
        },
        sendImage: {
            name: "Send an image",
            description: "Send an image over the Telegram bot",
            options: [
                {
                    type: 'textinput',
                    width: 6,
                    label: 'Chat ID',
                    id: 'chatId',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Image URL',
                    id: 'imageUrl',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Caption',
                    id: 'imageCaption',
                },
                {
                    type: 'checkbox',
                    width: 12,
                    label: 'Spoiler',
                    id: 'spoiler',
                    default: false,
                },
            ],
            callback: async (action, context) => {
                var parsedChatId = await instance.parseVariablesInString(action.options.chatId);
                var parsedImageCaption = await instance.parseVariablesInString(action.options.imageCaption);
                var parsedImageUrl = await instance.parseVariablesInString(action.options.imageUrl);
                instance.bot.sendPhoto(parsedChatId, parsedImageUrl, { caption: parsedImageCaption, has_spoiler: action.options.spoiler });
            },
        },
        sendAudio: {
            name: "Send an audio file",
            description: "Send an audio file over the Telegram bot",
            options: [
                {
                    type: 'textinput',
                    width: 6,
                    label: 'Chat ID',
                    id: 'chatId',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Audio file URL',
                    id: 'audioUrl',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Caption',
                    id: 'audioCaption',
                },
            ],
            callback: async (action, context) => {
                var parsedChatId = await instance.parseVariablesInString(action.options.chatId);
                var parsedAudioUrl = await instance.parseVariablesInString(action.options.audioUrl);
                var parsedAudioCaption = await instance.parseVariablesInString(action.options.audioCaption);
                instance.bot.sendAudio(parsedChatId, parsedAudioUrl, { caption: parsedAudioCaption });
            },
        },
        sendLocation: {
            name: "Send a location",
            description: "Send a location over the Telegram bot",
            options: [
                {
                    type: 'textinput',
                    width: 6,
                    label: 'Chat ID',
                    id: 'chatId',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Latitude',
                    id: 'latitude',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Longitude',
                    id: 'longitude',
                },
            ],
            callback: async (action, context) => {
                var parsedChatId = await instance.parseVariablesInString(action.options.chatId);
                var parsedLatitude = await instance.parseVariablesInString(action.options.latitude);
                var parsedLongitude = await instance.parseVariablesInString(action.options.longitude);
                instance.bot.sendLocation(parsedChatId, parsedLatitude, parsedLongitude);
            },
        },
        sendVenue: {
            name: "Send a venue",
            description: "Send a venue over the Telegram bot",
            options: [
                {
                    type: 'textinput',
                    width: 6,
                    label: 'Chat ID',
                    id: 'chatId',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Latitude',
                    id: 'latitude',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Longitude',
                    id: 'longitude',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Title',
                    id: 'venueTitle',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Address',
                    id: 'venueAddress',
                },
            ],
            callback: async (action, context) => {
                var parsedChatId = await instance.parseVariablesInString(action.options.chatId);
                var parsedLatitude = await instance.parseVariablesInString(action.options.latitude);
                var parsedLongitude = await instance.parseVariablesInString(action.options.longitude);
                var parsedVenueTitle = await instance.parseVariablesInString(action.options.venueTitle);
                var parsedVenueAddress = await instance.parseVariablesInString(action.options.venueAddress);
                instance.bot.sendVenue(parsedChatId, parsedLatitude, parsedLongitude, parsedVenueTitle, parsedVenueAddress);
            },
        },
        sendContact: {
            name: "Send a contact",
            description: "Send a contact over the Telegram bot",
            options: [
                {
                    type: 'textinput',
                    width: 6,
                    label: 'Chat ID',
                    id: 'chatId',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Phone Number',
                    id: 'phonenumber',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'First Name',
                    id: 'firstName',
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Last name',
                    id: 'lastName',
                },
            ],
            callback: async (action, context) => {
                var parsedChatId = await instance.parseVariablesInString(action.options.chatId);
                var parsedPhoneNumber = await instance.parseVariablesInString(action.options.phonenumber);
                var parsedFirstName = await instance.parseVariablesInString(action.options.firstName);
                var parsedLastName = await instance.parseVariablesInString(action.options.lastName);
                instance.bot.sendContact(parsedChatId, parsedPhoneNumber, parsedFirstName, { last_name: parsedLastName });
            },
        },
    })
}