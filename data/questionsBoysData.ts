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

export const boysQuestions: Question[] = [
  // Sexual Activity (19 questions)
  { id: 1, text: "Gooned/Edged for more than 30 minutes", category: "Sexual Activity" },
  { id: 2, text: "Used a fleshlight", category: "Sexual Activity" },
  { id: 3, text: "Had sex whilst watching a film", category: "Sexual Activity" },
  { id: 4, text: "Received road head", category: "Sexual Activity" },
  { id: 5, text: "Wore socks during sex", category: "Sexual Activity" },
  { id: 6, text: "Had sex with someone you were embarrassed to tell people about", category: "Sexual Activity" },
  { id: 7, text: "Masturbated to someone's Instagram story", category: "Sexual Activity" },
  { id: 8, text: "Been bricked up in public and prayed no one noticed", category: "Sexual Activity" },
  { id: 9, text: "Engaged in any sus homiesexual activities", category: "Sexual Activity" },
  { id: 10, text: "Took Viagra recreationally", category: "Sexual Activity" },
  { id: 11, text: "Had severe post-nut clarity", category: "Sexual Activity" },
  { id: 12, text: "Used a sock to masturbate", category: "Sexual Activity" },
  { id: 13, text: "Had a measuring contest with a homie", category: "Sexual Activity" },
  { id: 14, text: "Skipped the intro to porn to 'save time'", category: "Sexual Activity" },
  { id: 15, text: "Had a friend send you nudes 'for science'", category: "Sexual Activity" },
  { id: 16, text: "Gooned to AI deepfakes of celebrities", category: "Sexual Activity" },
  { id: 17, text: "Gooned to AI-generated girls", category: "Sexual Activity" },
  { id: 18, text: "Had a girl call you 'daddy'", category: "Sexual Activity" },
  { id: 19, text: "Said 'it's not cheating if...'", category: "Sexual Activity" },

  // Relationships & Dating (11 questions)
  { id: 20, text: "Talked about Crypto/Stocks or Gym/Bodybuilding with a girl in bed", category: "Relationships & Dating" },
  { id: 21, text: "Got rejected by giving a girl the 'ick'", category: "Relationships & Dating" },
  { id: 22, text: "Masturbated to the memory of a girl", category: "Relationships & Dating" },
  { id: 23, text: "Stalked your situationship's Spotify to decode their mood", category: "Relationships & Dating" },
  { id: 24, text: "Argued about body count with a girl", category: "Relationships & Dating" },
  { id: 25, text: "Been catfished by a tinder date", category: "Relationships & Dating" },
  { id: 26, text: "Faked liking a hobby for sex", category: "Relationships & Dating" },
  { id: 27, text: "Tried to flirt using zodiac signs", category: "Relationships & Dating" },
  { id: 28, text: "Sent 'u up?' to a girl", category: "Relationships & Dating" },
  { id: 29, text: "Made a list to keep track of girls you've slept with", category: "Relationships & Dating" },
  { id: 30, text: "Lied about political views to get with her", category: "Relationships & Dating" },

  // Digital & Social Media (10 questions)
  { id: 31, text: "Paid for an OF subscription", category: "Digital & Social Media" },
  { id: 32, text: "Used ChatGPT to write a pickup line", category: "Digital & Social Media" },
  { id: 33, text: "Used Reddit to ask if you were normal", category: "Digital & Social Media" },
  { id: 34, text: "Donated to an e-girl's twitch", category: "Digital & Social Media" },
  { id: 35, text: "Created intentionally offensive content online", category: "Digital & Social Media" },
  { id: 36, text: "Said 'I'm not like other guys' unironically", category: "Digital & Social Media" },
  { id: 37, text: "Been banned from a social media platform", category: "Digital & Social Media" },
  { id: 38, text: "Watched hentai unironically", category: "Digital & Social Media" },
  { id: 39, text: "Consumed more than an hour of Andrew Tate content", category: "Digital & Social Media" },
  { id: 40, text: "Identified as a Sigma male unironically", category: "Digital & Social Media" },

  // Lifestyle & Personal (10 questions)
  { id: 41, text: "Gone over 2 months without changing your bed sheets", category: "Lifestyle & Personal" },
  { id: 42, text: "Broken an Xbox/PS controller", category: "Lifestyle & Personal" },
  { id: 43, text: "Bought the Fortnite battlepass", category: "Lifestyle & Personal" },
  { id: 44, text: "Hotboxed your room", category: "Lifestyle & Personal" },
  { id: 45, text: "Tried 'No Nut November' or been in a group chat for it", category: "Lifestyle & Personal" },
  { id: 46, text: "Been bullied by the boys for an entire night", category: "Lifestyle & Personal" },
  { id: 47, text: "Googled 'how to roll a joint'", category: "Lifestyle & Personal" },
  { id: 48, text: "Texted one of the boys that you love them", category: "Lifestyle & Personal" },
  { id: 49, text: "Messaged the boys right after sex", category: "Lifestyle & Personal" },
  { id: 50, text: "Stuffed used tissues down the side of your bed", category: "Lifestyle & Personal" }
];

export const boysCategories: Category[] = [
  {
    name: "Sexual Activity",
    description: "Sexual experiences, adult content, and intimate encounters (20 questions)",
    questions: boysQuestions.filter(q => q.category === "Sexual Activity")
  },
  {
    name: "Relationships & Dating", 
    description: "Dating experiences, relationship dynamics, and romantic encounters (10 questions)",
    questions: boysQuestions.filter(q => q.category === "Relationships & Dating")
  },
  {
    name: "Digital & Social Media",
    description: "Online behavior, social media use, and digital culture (10 questions)",
    questions: boysQuestions.filter(q => q.category === "Digital & Social Media")
  },
  {
    name: "Lifestyle & Personal",
    description: "Personal habits, gaming culture, and lifestyle choices (10 questions)",
    questions: boysQuestions.filter(q => q.category === "Lifestyle & Personal")
  }
]; 