import { Translate } from '@google-cloud/translate/build/src/v2';

// The Translate client will automatically look for GOOGLE_APPLICATION_CREDENTIALS env var
const translateClient = new Translate();

export class TranslateService {
    public static async translateText(text: string, targetLanguage: string): Promise<string> {
        try {
            const [translation] = await translateClient.translate(text, targetLanguage);
            return translation;
        } catch (error) {
            console.error('Real Google Translation failed, falling back to mock trace:', error);
            return `[Live-Error-Fallback to ${targetLanguage}]: ${text}`;
        }
    }
}
