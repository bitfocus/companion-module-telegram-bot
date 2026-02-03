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
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Message',
                    id: 'message',
                    useVariables: true,
                },
            ],
            callback: async (action, context) => {
                var parsedChatId = await instance.parseVariablesInString(action.options.chatId);
                var parsedMessage = await instance.parseVariablesInString(action.options.message);
                instance.bot.sendMessage(parsedChatId, parsedMessage, { parse_mode: "html" });
                console.log(parsedMessage);
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
                    useVariables: true,
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
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Question',
                    id: 'pollQuestion',
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Poll options (; seperated)',
                    id: 'pollOptions',
                    useVariables: true,
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
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Image URL',
                    id: 'imageUrl',
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Caption',
                    id: 'imageCaption',
                    useVariables: true,
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
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Audio file URL',
                    id: 'audioUrl',
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Caption',
                    id: 'audioCaption',
                    useVariables: true,
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
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Latitude',
                    id: 'latitude',
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Longitude',
                    id: 'longitude',
                    useVariables: true,
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
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Latitude',
                    id: 'latitude',
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Longitude',
                    id: 'longitude',
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Title',
                    id: 'venueTitle',
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Address',
                    id: 'venueAddress',
                    useVariables: true,
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
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Phone Number',
                    id: 'phonenumber',
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'First Name',
                    id: 'firstName',
                    useVariables: true,
                },
                {
                    type: 'textinput',
                    width: 12,
                    label: 'Last name',
                    id: 'lastName',
                    useVariables: true,
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
