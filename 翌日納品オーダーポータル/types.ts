
export interface OrderData {
  id: string;
  shootingId: string;
  centerName: string;
  contactName: string;
  email: string;
  phoneNumber: string;
  price: number;
  timestamp: string;
}

export type ViewState = 'FORM' | 'SUBMITTING' | 'SUCCESS';

export interface AppSettings {
  spreadsheetWebhookUrl: string;
}
