export interface Question {
  id: number;
  text: string;
  category: string;
}

export interface QuestionCategory {
  name: string;
  description: string;
  questions: Question[];
}

export const questions: Question[] = [
  // Relationships & Romance (20 questions) - 1-20 (TAME ROMANTIC STUFF)
  { id: 1, text: "Held hands romantically", category: "Relationships & Romance" },
  { id: 2, text: "Been on a date", category: "Relationships & Romance" },
  { id: 3, text: "Been in a relationship", category: "Relationships & Romance" },
  { id: 4, text: "Danced without leaving room for Jesus", category: "Relationships & Romance" },
  { id: 5, text: "Kissed a non-family member on the lips", category: "Relationships & Romance" },
  { id: 6, text: "French kissed", category: "Relationships & Romance" },
  { id: 7, text: "Kissed on the first date", category: "Relationships & Romance" },
  { id: 8, text: "Kissed more than one person in the same day", category: "Relationships & Romance" },
  { id: 9, text: "Given/received a hickey", category: "Relationships & Romance" },
  { id: 10, text: "Had a friends with benefits relationship", category: "Relationships & Romance" },
  { id: 11, text: "Hooked up with someone you met on a dating app", category: "Relationships & Romance" },
  { id: 12, text: "Been in a love triangle", category: "Relationships & Romance" },
  { id: 13, text: "Cheated while in a relationship", category: "Relationships & Romance" },
  { id: 14, text: "Cheated with a partner's friend", category: "Relationships & Romance" },
  { id: 15, text: "Been on a blind date", category: "Relationships & Romance" },
  { id: 16, text: "Stalked someone online for more than 20 minutes", category: "Relationships & Romance" },
  { id: 17, text: "Been stood up on a date", category: "Relationships & Romance" },
  { id: 18, text: "Ghosted someone after the first date", category: "Relationships & Romance" },
  { id: 19, text: "Had someone profess their love to you/professed your love to someone", category: "Relationships & Romance" },
  { id: 20, text: "Broken someone's heart/been heartbroken", category: "Relationships & Romance" },

  // Substances & Partying (18 questions) - 21-38
  { id: 21, text: "Consumed alcohol", category: "Substances & Partying" },
  { id: 22, text: "Been drunk", category: "Substances & Partying" },
  { id: 23, text: "Thrown up from drinking", category: "Substances & Partying" },
  { id: 24, text: "Blacked out from drinking", category: "Substances & Partying" },
  { id: 25, text: "Had a hangover", category: "Substances & Partying" },
  { id: 26, text: "Drank as a coping mechanism", category: "Substances & Partying" },
  { id: 27, text: "Used tobacco products (cigarettes, vapes, snus, etc.)", category: "Substances & Partying" },
  { id: 28, text: "Smoked/consumed marijuana", category: "Substances & Partying" },
  { id: 29, text: "Snorted drugs", category: "Substances & Partying" },
  { id: 30, text: "Used cocaine/ketamine/MDMA", category: "Substances & Partying" },
  { id: 31, text: "Used psychedelics (LSD, shrooms, etc.)", category: "Substances & Partying" },
  { id: 32, text: "Used prescription drugs not prescribed to you", category: "Substances & Partying" },
  { id: 33, text: "Bought drugs from a dealer", category: "Substances & Partying" },
  { id: 34, text: "Sold drugs", category: "Substances & Partying" },
  { id: 35, text: "Been so inebriated you yelled racial slurs", category: "Substances & Partying" },
  { id: 36, text: "Drank or snorted off someone's body", category: "Substances & Partying" },
  { id: 37, text: "Done drugs with someone you just met", category: "Substances & Partying" },
  { id: 38, text: "Been hospitalized due to alcohol or drug use", category: "Substances & Partying" },

  // Sexual Activity (41 questions) - 39-79 (ALL THE SPICY STUFF)
  { id: 39, text: "Masturbated", category: "Sexual Activity" },
  { id: 40, text: "Masturbated to pics of someone you know", category: "Sexual Activity" },
  { id: 41, text: "Engaged in Cuckold activities", category: "Sexual Activity" },
  { id: 42, text: "Masturbated with an inanimate object", category: "Sexual Activity" },
  { id: 43, text: "Viewed pornographic material", category: "Sexual Activity" },
  { id: 44, text: "Filmed and/or distributed pornographic material", category: "Sexual Activity" },
  { id: 45, text: "Created or paid for OF content", category: "Sexual Activity" },
  { id: 46, text: "Engaged in sexual intercourse", category: "Sexual Activity" },
  { id: 47, text: "Had your ass grabbed in public", category: "Sexual Activity" },
  { id: 48, text: "Engaged in breast fondling", category: "Sexual Activity" },
  { id: 49, text: "Engaged in butt stuff", category: "Sexual Activity" },
  { id: 50, text: "Been topless with someone other than the homies", category: "Sexual Activity" },
  { id: 51, text: "Compared genitalia with members of the same sex", category: "Sexual Activity" },
  { id: 52, text: "Committed an act of voyeurism", category: "Sexual Activity" },
  { id: 53, text: "Gone skinny dipping", category: "Sexual Activity" },
  { id: 54, text: "Caught someone/been caught having sex", category: "Sexual Activity" },
  { id: 55, text: "Engaged in roleplay", category: "Sexual Activity" },
  { id: 56, text: "Had oral sex", category: "Sexual Activity" },
  { id: 57, text: "Committed an act of BDSM", category: "Sexual Activity" },
  { id: 58, text: "Committed flatcest", category: "Sexual Activity" },
  { id: 59, text: "Had unprotected sex", category: "Sexual Activity" },
  { id: 60, text: "Hooked up with two or more people in the same night", category: "Sexual Activity" },
  { id: 61, text: "Contracted an STI", category: "Sexual Activity" },
  { id: 62, text: "Committed bestiality", category: "Sexual Activity" },
  { id: 63, text: "Committed incest", category: "Sexual Activity" },
  { id: 64, text: "Showered with a person of the preferred sex", category: "Sexual Activity" },
  { id: 65, text: "Given/received blue balls", category: "Sexual Activity" },
  { id: 66, text: "Impregnated someone or been impregnated", category: "Sexual Activity" },
  { id: 67, text: "Taken someone's virginity", category: "Sexual Activity" },
  { id: 68, text: "Had sexual intercourse with someone 5+ years older or younger", category: "Sexual Activity" },
  
  // THE LEGENDARY #69! 🎯
  { id: 69, text: "🙃", category: "Sexual Activity" },
  
  { id: 70, text: "Had a one-night stand", category: "Sexual Activity" },
  { id: 71, text: "Had sexual intercourse in a random person's bed", category: "Sexual Activity" },
  { id: 72, text: "Had sexual intercourse outdoors", category: "Sexual Activity" },
  { id: 73, text: "Had a threesome", category: "Sexual Activity" },
  { id: 74, text: "Had sex whilst high", category: "Sexual Activity" },
  { id: 75, text: "Hooked up with a MILF/DILF", category: "Sexual Activity" },
  { id: 76, text: "Joined the mile high club", category: "Sexual Activity" },
  { id: 77, text: "Used sex toys", category: "Sexual Activity" },
  { id: 78, text: "Had sex in a vehicle", category: "Sexual Activity" },
  { id: 79, text: "Had period sex", category: "Sexual Activity" },

  // Legal & Risky Behavior (12 questions) - 80-91 (ACTUAL LEGAL/RISKY STUFF) 
  { id: 80, text: "Driven while under the influence", category: "Legal & Risky Behavior" },
  { id: 81, text: "Been arrested/handcuffed", category: "Legal & Risky Behavior" },
  { id: 82, text: "Been in jail or prison", category: "Legal & Risky Behavior" },
  { id: 83, text: "Had police called on you", category: "Legal & Risky Behavior" },
  { id: 84, text: "Stolen something worth more than $20", category: "Legal & Risky Behavior" },
  { id: 85, text: "Vandalized/Graffitied property", category: "Legal & Risky Behavior" },
  { id: 86, text: "Urinated on someone else's property", category: "Legal & Risky Behavior" },
  { id: 87, text: "Been in a physical fight/thrown a punch", category: "Legal & Risky Behavior" },
  { id: 88, text: "Used fake ID", category: "Legal & Risky Behavior" },
  { id: 89, text: "Gambled more than $20 at once", category: "Legal & Risky Behavior" },
  { id: 90, text: "Been to court for legal troubles", category: "Legal & Risky Behavior" },
  { id: 91, text: "Paid for sex", category: "Legal & Risky Behavior" },

  // Academic & Professional (9 questions) - 92-100 (SCHOOL/WORK STUFF)
  { id: 92, text: "Cheated on a test", category: "Academic & Professional" },
  { id: 93, text: "Knowingly plagiarized/used AI entirely to complete an assignment", category: "Academic & Professional" },
  { id: 94, text: "Been suspended or expelled", category: "Academic & Professional" },
  { id: 95, text: "Had sex with a teacher/professor", category: "Academic & Professional" },
  { id: 96, text: "Been fired from a job", category: "Academic & Professional" },
  { id: 97, text: "Lied on a resume or application", category: "Academic & Professional" },
  { id: 98, text: "Had sex at work or school", category: "Academic & Professional" },
  { id: 99, text: "Been under the influence at work/school", category: "Academic & Professional" },
  { id: 100, text: "Been investigated by HR or school administration", category: "Academic & Professional" }
];

export const categories: QuestionCategory[] = [
  {
    name: "Relationships & Romance",
    description: "Dating, relationships, and romantic encounters",
    questions: questions.filter(q => q.category === "Relationships & Romance")
  },
  {
    name: "Substances & Partying",
    description: "Alcohol, drugs, and party experiences", 
    questions: questions.filter(q => q.category === "Substances & Partying")
  },
  {
    name: "Sexual Activity", 
    description: "Sexual experiences and encounters",
    questions: questions.filter(q => q.category === "Sexual Activity")
  },
  {
    name: "Legal & Risky Behavior",
    description: "Legal troubles and risky activities",
    questions: questions.filter(q => q.category === "Legal & Risky Behavior")
  },
  {
    name: "Academic & Professional",
    description: "School and workplace misconduct",
    questions: questions.filter(q => q.category === "Academic & Professional")
  }
]; 