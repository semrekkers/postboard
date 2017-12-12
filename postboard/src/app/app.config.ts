/*
 * Global config
 */
const API_ENDPOINT = 'http://localhost:3000'

export class AppConfig {
    getApiEndpoint(): string {
        return API_ENDPOINT;
    }
}