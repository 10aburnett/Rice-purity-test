export interface Question {
  id: number;
  text: string;
  category: string;
}

export interface Category {
  name: string;
  description: string;
  questions: Question[];
}

export const girlsQuestions: Question[] = [
  // Sexual Activity (17 questions)
  { id: 1, text: "Made an OF 'just to see what happens'", category: "Sexual Activity" },
  { id: 2, text: "Masturbated using a toothbrush", category: "Sexual Activity" },
  { id: 3, text: "Faked an orgasm", category: "Sexual Activity" },
  { id: 4, text: "Been called 'mommy' during sex", category: "Sexual Activity" },
  { id: 5, text: "Sent nudes", category: "Sexual Activity" },
  { id: 6, text: "Been choked and started genuinely choking", category: "Sexual Activity" },
  { id: 7, text: "Said you were on your period/tired to avoid sex", category: "Sexual Activity" },
  { id: 8, text: "Made out with another girl drunk", category: "Sexual Activity" },
  { id: 9, text: "Had a one-night stand then blocked him on socials", category: "Sexual Activity" },
  { id: 10, text: "Had a fake bisexual phase for the vibes", category: "Sexual Activity" },
  { id: 11, text: "Created a sex playlist", category: "Sexual Activity" },
  { id: 12, text: "Taken the morning after pill", category: "Sexual Activity" },
  { id: 13, text: "Googled 'can I get pregnant from...'", category: "Sexual Activity" },
  { id: 14, text: "Watched porn out of curiosity", category: "Sexual Activity" },
  { id: 15, text: "Had multiple sneaky links at once", category: "Sexual Activity" },
  { id: 16, text: "Said 'I never usually do this' when you actually do", category: "Sexual Activity" },
  { id: 17, text: "Had sex with a best friend's ex", category: "Sexual Activity" },

  // Relationships & Drama (17 questions)
  { id: 18, text: "Used astrology to justify cheating", category: "Relationships & Drama" },
  { id: 19, text: "Intentionally dreamt about fake scenarios with boys", category: "Relationships & Drama" },
  { id: 20, text: "Lied about body count using 'girl math'", category: "Relationships & Drama" },
  { id: 21, text: "Had a secret crush that's too embarrassing to admit", category: "Relationships & Drama" },
  { id: 22, text: "Stood in between 2 dudes to break up a fight", category: "Relationships & Drama" },
  { id: 23, text: "Hit a guy in the face/balls", category: "Relationships & Drama" },
  { id: 24, text: "Thrown a drink over someone", category: "Relationships & Drama" },
  { id: 25, text: "Been toxic to an ex after a breakup", category: "Relationships & Drama" },
  { id: 26, text: "Cried in bed over a boy", category: "Relationships & Drama" },
  { id: 27, text: "Used the term 'strong, independent woman' unironically", category: "Relationships & Drama" },
  { id: 28, text: "Bragged about how emotionally intelligent you are", category: "Relationships & Drama" },
  { id: 29, text: "Made a boy cry", category: "Relationships & Drama" },
  { id: 30, text: "Flirted with a guy just so he buys you a drink", category: "Relationships & Drama" },
  { id: 31, text: "Said he's just a friend, only to get with him", category: "Relationships & Drama" },
  { id: 32, text: "Lied about your age", category: "Relationships & Drama" },
  { id: 33, text: "Faked liking video games to get with a guy", category: "Relationships & Drama" },
  { id: 34, text: "Knowingly gave someone an STI without telling them", category: "Relationships & Drama" },

  // Digital & Social Media (8 questions)
  { id: 35, text: "Stalked an ex's account for more than 30 mins", category: "Digital & Social Media" },
  { id: 36, text: "Posted a thirst trap", category: "Digital & Social Media" },
  { id: 37, text: "Blocked, unblocked, and re-blocked within 24 hrs", category: "Digital & Social Media" },
  { id: 38, text: "Spent more than an hour investigating your star sign", category: "Digital & Social Media" },
  { id: 39, text: "Had a vegetarian/vegan phase", category: "Digital & Social Media" },
  { id: 40, text: "Had a religious/spiritual phase", category: "Digital & Social Media" },
  { id: 41, text: "Ordered shots just to post it on your Instagram story", category: "Digital & Social Media" },
  { id: 42, text: "Doxxed someone online", category: "Digital & Social Media" },

  // Lifestyle & Personal (8 questions)
  { id: 43, text: "Taken a pregnancy testing kit on vacation with you", category: "Lifestyle & Personal" },
  { id: 44, text: "Had a self-proclaimed 'Hoe-phase'", category: "Lifestyle & Personal" },
  { id: 45, text: "Got a tattoo/piercing to piss someone off", category: "Lifestyle & Personal" },
  { id: 46, text: "Led someone on for attention", category: "Lifestyle & Personal" },
  { id: 47, text: "Lost your shoes on a night out", category: "Lifestyle & Personal" },
  { id: 48, text: "Gone into the same bathroom cubicle with two or more friends", category: "Lifestyle & Personal" },
  { id: 49, text: "Bought a dress, kept the label on, wore it once, then returned it", category: "Lifestyle & Personal" },
  { id: 50, text: "Had girlfriend therapy in the bathroom whilst drunk", category: "Lifestyle & Personal" }
];

export const girlsCategories: Category[] = [
  {
    name: "Sexual Activity",
    description: "Sexual experiences, adult content, and intimate encounters (17 questions)",
    questions: girlsQuestions.filter(q => q.category === "Sexual Activity")
  },
  {
    name: "Relationships & Drama", 
    description: "Dating experiences, relationship drama, and emotional situations (17 questions)",
    questions: girlsQuestions.filter(q => q.category === "Relationships & Drama")
  },
  {
    name: "Digital & Social Media",
    description: "Online behavior, social media use, and digital culture (8 questions)",
    questions: girlsQuestions.filter(q => q.category === "Digital & Social Media")
  },
  {
    name: "Lifestyle & Personal",
    description: "Personal habits, self-care, and lifestyle choices (8 questions)",
    questions: girlsQuestions.filter(q => q.category === "Lifestyle & Personal")
  }
]; 