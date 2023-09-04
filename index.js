import { InstanceBase, runEntrypoint, InstanceStatus } from '@companion-module/base'
import TelegramBot from 'node-telegram-bot-api';
import { upgradeScripts } from './upgrade.js'
import { configFields } from './config.js'
import { setActionDefinitions } from './actions.js';
import { variables } from './variables.js';

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
			this.setVariableDefinitions(variables);
			this.updateStatus(InstanceStatus.Ok);
		}
		else {
			this.updateStatus(InstanceStatus.BadConfig, "API token is missing");
		}

	}

	receivedMessage(msg) {
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
		setActionDefinitions(this);
	}
}

runEntrypoint(TelegramInstance, upgradeScripts)
