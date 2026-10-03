export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalDocument = {
  slug: "privacy" | "terms";
  badge: string;
  title: string;
  effectiveDate: string;
  intro: string;
  sections: LegalSection[];
};

export const legalDocuments: Record<LegalDocument["slug"], LegalDocument> = {
  privacy: {
    slug: "privacy",
    badge: "Privacy Policy",
    title: "Tresra Privacy Policy",
    effectiveDate: "Effective date: May 7, 2026",
    intro:
      "Tresra helps customers discover salons, choose professionals, and book appointments. This Privacy Policy explains what personal data we collect, why we collect it, how we use it, when we share it, and the choices available to users of our website, applications, and related services.",
    sections: [
      {
        heading: "1. Information we collect",
        bullets: [
          "Account details such as your name, mobile number, email address, city, and login credentials when you create an account or join a waitlist.",
          "Booking information such as the salon, stylist, services selected, appointment date and time, cancellations, reschedules, and booking notes.",
          "Device and usage data such as browser type, app version, IP address, approximate location, crash reports, and interaction patterns used to improve reliability and security.",
          "Support and communication records when you contact Tresra, respond to promotions, or share feedback with us.",
        ],
      },
      {
        heading: "2. How we use your data",
        bullets: [
          "To create and manage your account, confirm bookings, send reminders, and support appointment changes.",
          "To show relevant salons, professionals, service availability, and location-aware recommendations.",
          "To operate the platform safely, detect misuse, prevent fraud, troubleshoot issues, and maintain service quality.",
          "To improve product features, measure demand, understand usage trends, and communicate launches, offers, or updates where permitted by law.",
        ],
      },
      {
        heading: "3. When we share your data",
        bullets: [
          "With the salon or professional you book, so they can confirm, prepare for, and service your appointment.",
          "With vendors and service providers that help us with hosting, analytics, notifications, customer support, and infrastructure operations, subject to confidentiality and security obligations.",
          "With legal or regulatory authorities when required to comply with applicable law, court orders, or lawful enforcement requests.",
          "As part of a merger, acquisition, restructuring, or transfer of business assets, subject to appropriate confidentiality and continuity protections.",
        ],
      },
      {
        heading: "4. Your choices and controls",
        bullets: [
          "You may review or update account information through the platform features available to you.",
          "You can opt out of promotional messages, though transactional and service-related communications may still be sent when necessary.",
          "You may disable location or notification permissions from your device settings, but some product features may work less effectively.",
          "You may request deletion or closure of your account, subject to any records we must retain for security, fraud prevention, tax, audit, or dispute resolution purposes.",
        ],
      },
      {
        heading: "5. Retention, security, and children",
        paragraphs: [
          "We retain personal data only for as long as it is reasonably necessary for the purposes described in this policy, including account management, booking history, support, safety, and legal compliance. We use reasonable technical and organizational measures to protect information, but no internet-based service can guarantee absolute security.",
          "Tresra is not intended for children who are not legally permitted to use our services independently under applicable law. If we learn that personal data was provided in violation of applicable rules, we may suspend the account and delete the data where required.",
        ],
      },
      {
        heading: "6. Policy updates and contact",
        paragraphs: [
          "We may update this Privacy Policy as our services, features, or legal obligations evolve. When changes are material, we will revise the effective date and may provide additional notice within the website, app, or other official Tresra channels.",
          "For privacy-related questions, requests, or complaints, please contact Tresra through the official contact methods made available on our website or inside the application.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    badge: "Terms of Service",
    title: "Tresra Terms of Service",
    effectiveDate: "Effective date: May 7, 2026",
    intro:
      "These Terms of Service govern access to and use of Tresra's website, mobile applications, and related services by customers, visitors, and salon partners. By using Tresra, you agree to these terms and to any additional policies referenced within the platform.",
    sections: [
      {
        heading: "1. Platform role",
        paragraphs: [
          "Tresra provides a technology platform that helps users discover salons, view availability, choose professionals, and schedule appointments. Unless expressly stated otherwise, salon services are provided by independent salons or professionals, not by Tresra itself.",
        ],
      },
      {
        heading: "2. Eligibility and accounts",
        bullets: [
          "You must provide accurate, current information when creating an account or making a booking.",
          "You are responsible for activity that occurs through your account and for keeping your login credentials secure.",
          "Tresra may suspend or restrict access if information is false, misleading, unauthorized, or used in a way that harms the platform or other users.",
        ],
      },
      {
        heading: "3. Bookings, cancellations, and availability",
        bullets: [
          "Appointment slots shown on Tresra depend on information provided by salons, professionals, or system availability logic and may change without prior notice.",
          "By placing a booking request or confirmation through Tresra, you authorize us to share relevant booking details with the selected salon or professional.",
          "Cancellation, reschedule, late arrival, refund, deposit, or no-show rules may vary by salon, service type, campaign, or offer and may be displayed at the point of booking.",
        ],
      },
      {
        heading: "4. User conduct",
        bullets: [
          "You must not misuse the platform, interfere with bookings, attempt unauthorized access, scrape content at scale, impersonate another person, or use Tresra for unlawful purposes.",
          "You must not post or transmit abusive, defamatory, fraudulent, or misleading material through reviews, support channels, or any user-generated feature.",
        ],
      },
      {
        heading: "5. Pricing, salon responsibility, and service outcomes",
        paragraphs: [
          "Pricing, service quality, hygiene standards, stylist performance, and the final service experience are primarily controlled by the salon or professional delivering the appointment. Tresra may display price and service information, but salons remain responsible for the accuracy of their listings unless otherwise stated.",
          "Tresra may investigate disputes and support resolution, but we do not guarantee that every appointment, promotion, stylist preference, or salon representation will meet a user's expectations.",
        ],
      },
      {
        heading: "6. Intellectual property and platform rights",
        bullets: [
          "The Tresra brand, interface, software, layouts, graphics, and content are owned by or licensed to Tresra and are protected under applicable intellectual property laws.",
          "You may use the platform only for personal or internal business use as permitted by these terms and may not copy, reverse engineer, redistribute, or exploit the service beyond that permission.",
        ],
      },
      {
        heading: "7. Disclaimers and limitation of liability",
        paragraphs: [
          "Tresra is provided on an as-available basis. To the maximum extent permitted by law, we disclaim warranties not expressly stated in these terms, including implied warranties of uninterrupted availability, merchantability, fitness for a particular purpose, or non-infringement.",
          "To the extent permitted by law, Tresra will not be liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits, goodwill, data, or business opportunities arising from your use of the platform, third-party salon services, failed bookings, or service interruptions.",
        ],
      },
      {
        heading: "8. Suspension, termination, and governing law",
        paragraphs: [
          "We may suspend, restrict, or terminate access if you violate these terms, misuse the platform, create risk for other users, or if continued access is not commercially or legally feasible.",
          "These terms are governed by the laws of India. Any dispute arising from or relating to the use of Tresra will be subject to the jurisdiction of courts competent to hear the matter in India, unless mandatory law requires otherwise.",
        ],
      },
    ],
  },
};
