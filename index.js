import { InstanceBase, runEntrypoint, InstanceStatus, combineRgb } from '@companion-module/base'
import TelegramBot from 'node-telegram-bot-api';
import { upgradeScripts } from './upgrade.js'
import { configFields } from './config.js'


class TelegramInstance extends InstanceBase {
	isInitialized = false
	async init(config) {
		this.config = config
		this.setupTelegramBot();
	}

	setupTelegramBot() {
		if (this.config.apiToken !== undefined && this.config.apiToken != "") {
			if (this.bot !== undefined) {
				this.bot.close();
				delete this.bot();
			}
			this.bot = new TelegramBot(this.config.apiToken, { polling: true });
			this.bot.on('polling_error', (error) => {
				this.updateStatus(InstanceStatus.ConnectionFailure, error.message);
			});
			this.bot.on('message', (msg) => {
				this.receivedMessage(msg);
			});
			this.initActions();
			this.initFeedbacks();
			this.setVariableDefinitions(
				[
					{
						name: 'The last received message',
						variableId: 'lastMessage'
					},
					{
						name: 'The last received chat id',
						variableId: 'lastChatId'
					},
					{
						name: 'The last received chat timestamp',
						variableId: 'lastTimestamp'
					},
				]
			);
			this.updateStatus(InstanceStatus.Ok);
		}
		else {
			this.updateStatus(InstanceStatus.BadConfig, "API token is missing");
		}

	}

	receivedMessage(msg) {
		console.log(msg);
		this.setVariableValues({
			lastMessage: msg.text,
			lastChatId: msg.chat.id,
			lastTimestamp: msg.date,
		})
	}

	sendMessage(chatId, text) {
		this.bot.sendMessage(chatId, text);
	}

	async destroy() {
		this.isInitialized = false
		if (this.bot != undefined) {
			this.bot.close();
			delete this.bot();
		}
	}


	async configUpdated(config) {
		this.config = config
		this.setupTelegramBot();
	}

	getConfigFields() {
		return configFields;
	}

	initFeedbacks() {
		this.setFeedbackDefinitions({});
	}

	initActions() {
		this.setActionDefinitions(
			{
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
						this.bot.sendMessage(action.options.chatId, action.options.message, { parse_mode: "HTML" });
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
						this.bot.sendDice(action.options.chatId);
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
						const pollSplit = action.options.pollOptions.split(';');
						this.bot.sendPoll(action.options.chatId, action.options.pollQuestion, pollSplit, {is_anonymous: action.options.isAnonymous});
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
						this.bot.sendPhoto(action.options.chatId, action.options.imageUrl, { caption: action.options.imageCaption, has_spoiler: action.options.spoiler});
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
						this.bot.sendAudio(action.options.chatId, action.options.audioUrl, { caption: action.options.audioCaption });
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
						this.bot.sendLocation(action.options.chatId, action.options.latitude, action.options.longitude);
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
						this.bot.sendVenue(action.options.chatId, action.options.latitude, action.options.longitude, action.options.venueTitle, action.options.venueAddress);
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
						this.bot.sendContact(action.options.chatId, action.options.phonenumber, action.options.firstName, {last_name: action.options.lastName});
					},
				},
			}
		);
	}
}

runEntrypoint(TelegramInstance, upgradeScripts)
