export interface BirthdayConfig {
  passcode: string;
  creatorName: string;
  recipientName: string;
  birthdayAge?: string;
  birthdayDate?: string;
  title: string;
  subheading: string;
  musicUrl?: string;
  letterGreeting: string;
  letterMessage: string[];
  letterClosing: string;
  photos: {
    id: string;
    url: string;
    caption: string;
    rotation: number;
  }[];
  wishes: {
    id: string;
    sender: string;
    text: string;
    avatarEmoji: string;
  }[];
}

export type SurpriseStep =
  | 'passcode'
  | 'welcome'
  | 'scratch'
  | 'balloons'
  | 'bouquet'
  | 'letter'
  | 'reasons'
  | 'cake'
  | 'fortune'
  | 'crown'
  | 'celebration';
