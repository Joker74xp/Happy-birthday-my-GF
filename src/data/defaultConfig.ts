import { BirthdayConfig } from '../types';

export const initialBirthdayConfig: BirthdayConfig = {
  passcode: '1111',
  creatorName: '',
  recipientName: 'Birthday Girl',
  birthdayAge: 'Special Day',
  birthdayDate: 'Today & Always',
  title: 'Happy Birthday, Beautiful!',
  subheading: 'A magical 10-step celebration crafted for the sweetest, most wonderful girl',
  musicUrl: 'https://youtu.be/PpXoKtxADdE?si=ez2vAmv5njlqXY4-',
  letterGreeting: 'Dearest Birthday Girl,',
  letterMessage: [
    'On this magical day, I wanted to create a special universe for someone as radiant, lovely, and extraordinary as you are.',
    'You bring so much gentle warmth, effortless grace, and contagious laughter into everything you touch. You make the world softer and brighter just by being in it.',
    'May this year wrap you in sweet adventures, dreams realized, boundless love, and unforgettable moments where your smile shines the brightest.',
    'Wear your crown proudly today, celebrate every second, and know how deeply adored and cherished you are!'
  ],
  letterClosing: 'With endless love, hugs & warmest wishes 💖✨',
  photos: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80',
      caption: 'Sparkles & Magic 🎉',
      rotation: -3,
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=600&q=80',
      caption: 'Pure Joy & Laughter ✨',
      rotation: 2,
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80',
      caption: 'Sweetest Moments 🎂',
      rotation: -2,
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      caption: 'Unforgettable Memories 🌟',
      rotation: 4,
    }
  ],
  wishes: [
    {
      id: 'w1',
      sender: 'Your Biggest Fan',
      text: 'Wishing the most gorgeous birthday girl a year full of butterflies, laughter, and magical moments! 🌸',
      avatarEmoji: '👑'
    },
    {
      id: 'w2',
      sender: 'With All My Heart',
      text: 'Happy Birthday to the girl with the sweetest heart and the prettiest smile! 💖✨',
      avatarEmoji: '✨'
    },
    {
      id: 'w3',
      sender: 'Forever Admirer',
      text: 'May every single wish you whisper today turn into a beautiful reality this year! 🍰🎈',
      avatarEmoji: '💖'
    }
  ]
};
