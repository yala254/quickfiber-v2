export type Plan = {
  name: string;
  speed: number;
  price: string;
  features: string[];
  featured?: boolean;
};

const WHATSAPP = "254797575757";

export const waLink = (planName: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
    `Greetings, am interested in ${planName}. Please guide me through it`,
  )}`;

export const homePlans: Plan[] = [
  {
    name: "Bronze Package",
    speed: 20,
    price: "Ksh 2,000",
    features: [
      "Fast web browsing",
      "SD movie & music streaming",
      "Browsing, social media & email",
      "Multiple device streaming",
      "Superfast video downloads",
      "CCTV devices capacity",
    ],
  },
  {
    name: "Silver Package",
    speed: 30,
    price: "Ksh 3,000",
    features: [
      "Fast web browsing",
      "HD movie & music streaming",
      "Browsing, social media & email",
      "Multiple device streaming",
      "Superfast video downloads",
      "CCTV devices capacity",
    ],
  },
  {
    name: "Gold Package",
    speed: 40,
    price: "Ksh 4,000",
    featured: true,
    features: [
      "Fast web browsing",
      "HD movie & music streaming",
      "Browsing, social media & email",
      "Multiple device streaming",
      "Superfast video downloads",
      "CCTV devices capacity",
    ],
  },
  {
    name: "Diamond Package",
    speed: 50,
    price: "Ksh 5,000",
    features: [
      "Fast web browsing & video calls",
      "Full HD TV shows and movies",
      "Internet surfing, social media & email",
      "Superfast streaming",
      "Superfast video downloads",
      "CCTV devices capacity",
    ],
  },
];

export const businessPlans: Plan[] = [
  {
    name: "Startup Business Connect package",
    speed: 25,
    price: "Ksh 2,999",
    features: [
      "Ideal for 1-10 users",
      "25 Mbps download",
      "25 Mbps upload",
      "Unlimited usage",
      "CCTV Backup",
      "Free Wi-Fi router",
    ],
  },
  {
    name: "Lite SME Business Connect package",
    speed: 45,
    price: "Ksh 4,999",
    features: [
      "Ideal for 11-20 users",
      "45 Mbps download",
      "45 Mbps upload",
      "Unlimited usage",
      "CCTV Backup",
      "Free Wi-Fi router",
    ],
  },
  {
    name: "Turbo Business Connect package",
    speed: 60,
    price: "Ksh 6,999",
    featured: true,
    features: [
      "Ideal for 21-30 users",
      "60 Mbps download",
      "60 Mbps upload",
      "Unlimited usage",
      "CCTV Backup",
      "Free Wi-Fi router",
    ],
  },
  {
    name: "Platinum Business Connect package",
    speed: 100,
    price: "Ksh 9,999",
    features: [
      "Ideal for 31-50 users",
      "100 Mbps download",
      "100 Mbps upload",
      "Unlimited usage",
      "CCTV Backup",
      "Free Wi-Fi router",
    ],
  },
];
