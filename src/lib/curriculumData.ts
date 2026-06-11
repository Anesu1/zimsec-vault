export interface Question {
  id: string;
  question: string;
  options: string[];
  answer: string; // "A", "B", "C", or "D"
  explanation: string;
}

export interface Paper2Question {
  id: string;
  question: string;
  sampleAnswer: string;
  keywords: string[]; // Keywords needed for the AI/heuristic marker
  explanation: string;
}

export interface SubjectMaterials {
  readingMaterial: string; // fallback
  readingMaterialPaper1?: string;
  readingMaterialPaper2?: string;
  flashcards: { front: string; back: string; topic: string }[];
  quiz: Question[]; // Paper 1
  paper2: Paper2Question[]; // Paper 2
}

export const curriculumData: Record<string, SubjectMaterials> = {
  "Mathematics": {
    readingMaterial: `
### ZIMSEC GRADE 7 MATHEMATICS CORE SUMMARY

Please see specific guides for Paper 1 and Paper 2 to prepare for your exams.
    `,
    readingMaterialPaper1: `
### ZIMSEC GRADE 7 MATHEMATICS: PAPER 1 (MULTIPLE CHOICE PREP)

#### 1. Decimal Place Value & Core Operations
In the decimal system, the value of a digit depends on its position. For example, in 45,678:
- **4** is in the Ten Thousands place (40,000)
- **5** is in the Thousands place (5,000)
- **6** is in the Hundreds place (600)
- **7** is in the Tens place (70)
- **8** is in the Units place (8)

**Calculation Tips**:
- **Addition**: Align digits vertically by place value before adding (e.g. 4,567 + 2,389 = 6,956).
- **Subtraction**: Always align place values and remember to borrow from the column to the left when necessary (e.g. 8,003 - 2,567 = 5,436).

#### 2. Fractions of Quantities
To find a fraction of a quantity (e.g. finding **3/4 of 20**):
1. **Divide** the total quantity by the denominator (bottom number): 20 ÷ 4 = 5.
2. **Multiply** the result by the numerator (top number): 5 × 3 = 15.

#### 3. Perimeter of Squares
- The **Perimeter** is the total distance around the outside of a shape.
- Since a square has four equal sides, the formula is: **Perimeter = 4 × Side**.
- *Example*: A square with a side length of 6 cm has a perimeter of 4 × 6 cm = 24 cm.

#### 4. Number Patterns & Sequences
- A sequence follows a constant rule (common difference).
- For the pattern **2, 4, 6, 8...**, the rule is to add 2 to the previous number. The next term is 8 + 2 = 10.
    `,
    readingMaterialPaper2: `
### ZIMSEC GRADE 7 MATHEMATICS: PAPER 2 (STRUCTURED & THEORY PREP)

In Paper 2, you must show all your workings, formulas, and correct units to receive full marks.

#### 1. Area of a Rectangle
- **Area** measures the surface inside a 2D boundary.
- **Formula**: **Area = Length × Width** (expressed in square units such as m² or cm²).
- *Example Working*: For a rectangular garden of length 12 metres and width 8 metres:
  - Step 1: Write the formula: **Area = L × W**
  - Step 2: Substitute values: **Area = 12m × 8m**
  - Step 3: Compute final value with units: **96 m²** or **96 square metres**.

#### 2. Introduction to Equations & Algebra
- An equation is balanced: whatever operation is performed on one side must be performed on the other.
- **Goal**: Isolate the variable (e.g. **y**) on one side.
- *Example Equation: 3y + 7 = 28*
  - Step 1 (Subtractive balance): Subtract 7 from both sides to isolate the variable term:
    3y + 7 - 7 = 28 - 7  =>  **3y = 21**
  - Step 2 (Divisive balance): Divide both sides by 3 to isolate y:
    3y ÷ 3 = 21 ÷ 3  =>  **y = 7**
    `,
    flashcards: [
      { front: "What is the formula for the Area of a Rectangle?", back: "Area = Length × Width", topic: "Measures" },
      { front: "What do the interior angles of a triangle add up to?", back: "180 degrees", topic: "Geometry" },
      { front: "How many sides does a hexagon have?", back: "6 sides", topic: "Geometry" },
      { front: "What is 25% written as a fraction in its lowest terms?", back: "1/4", topic: "Fractions & Decimals" },
      { front: "How do you find the Least Common Multiple (LCM) of 4 and 6?", back: "List multiples: 4 (4, 8, 12, 16...) and 6 (6, 12, 18...). The smallest common is 12.", topic: "Factors & Multiples" },
    ],
    quiz: [
      {
        id: "m1",
        question: "Calculate: 4,567 + 2,389",
        options: ["A. 6,846", "B. 6,956", "C. 6,856", "D. 7,056"],
        answer: "B",
        explanation: "Adding 4,567 and 2,389 gives 6,956."
      },
      {
        id: "m2",
        question: "Calculate: 8,003 - 2,567",
        options: ["A. 5,446", "B. 5,536", "C. 5,436", "D. 6,436"],
        answer: "C",
        explanation: "Subtracting 2,567 from 8,003 gives 5,436."
      },
      {
        id: "m3",
        question: "Find 3/4 of 20.",
        options: ["A. 12", "B. 16", "C. 15", "D. 10"],
        answer: "C",
        explanation: "Divide 20 by 4 to get 5, then multiply by 3 to get 15."
      },
      {
        id: "m4",
        question: "Find the perimeter of a square with sides of 6 cm.",
        options: ["A. 12 cm", "B. 24 cm", "C. 36 cm", "D. 18 cm"],
        answer: "B",
        explanation: "Perimeter of a square = 4 × side length = 4 × 6 = 24 cm."
      },
      {
        id: "m5",
        question: "What is the next number in the pattern: 2, 4, 6, 8, ___ ?",
        options: ["A. 9", "B. 10", "C. 12", "D. 16"],
        answer: "B",
        explanation: "The pattern increases by adding 2 each time. 8 + 2 = 10."
      }
    ],
    paper2: [
      {
        id: "mp2_1",
        question: "A rectangular garden measures 12 metres in length and 8 metres in width. Calculate the area of the garden, showing your formula and working.",
        sampleAnswer: "Area of a rectangle = length × width. Therefore, Area = 12 m × 8 m = 96 square metres.",
        keywords: ["area", "length", "width", "96", "m²", "square"],
        explanation: "To find the area, multiply the length (12) by the width (8). 12 × 8 = 96 square metres."
      },
      {
        id: "mp2_2",
        question: "Solve the algebraic equation: 3y + 7 = 28. Show all steps.",
        sampleAnswer: "Subtract 7 from both sides: 3y = 21. Divide both sides by 3: y = 7.",
        keywords: ["3y = 21", "y = 7", "subtract", "divide", "7"],
        explanation: "Subtracting 7 from both sides gives 3y = 21. Dividing by 3 yields y = 7."
      }
    ]
  },
  "Agriculture, Science & Technology": {
    readingMaterial: `
### ZIMSEC GRADE 7 AGRICULTURE, SCIENCE & TECHNOLOGY SUMMARY

#### 1. Soil Science & Nutrients
- **Soil Types**: Sand (large particles, poor water holding capacity), Clay (fine particles, high water retention, poor drainage), Silt (medium particles), and Loam (ideal mixture of sand, clay, and organic matter).
- **Major Nutrients**: Nitrogen (N) for leafy growth, Phosphorus (P) for root development, and Potassium (K) for flowers/fruit and disease resistance.
- **Soil Conservation**: Contouring, terracing, planting cover crops, and mulching help prevent soil erosion caused by wind and run-off water.

#### 2. Crop Production
- **Crop Rotation**: The practice of growing different types of crops in the same area in sequential seasons. Advantages:
  1. Balances soil nutrients (e.g., legumes fix nitrogen).
  2. Breaks pest and disease cycles.
  3. Improves soil structure.
- **Wheat Cultivation**: In Zimbabwe, wheat is primarily grown in **winter** under irrigation because it requires cooler temperatures and avoids the heavy summer rainfall that can spoil the mature crop.

#### 3. Farm Machinery & Energy
- **Friction**: The force that opposes motion. Farm tools and machinery wear out due to friction.
- **Lubrication**: Applying oil, grease, or wax between moving parts reduces friction, prevents wear, stops rusting, and lowers heat build-up.
- **Simple Machines**: Levers, pulleys, inclined planes, and wheelbarrows are force multipliers used to make farm labor easier.
    `,
    flashcards: [
      { front: "Why is wheat grown in winter in Zimbabwe?", back: "It requires cool temperatures and is grown under irrigation when summer rains have stopped.", topic: "Crop Production" },
      { front: "What are the three main soil types?", back: "Clay, sand, and silt (loam is a mixture).", topic: "Soils" },
      { front: "What are the major soil nutrients required by plants?", back: "Nitrogen (N), Phosphorus (P), Potassium (K).", topic: "Soils" },
      { front: "Why do we apply grease or oil to farm machines?", back: "To reduce friction, prevent wear, and stop rusting.", topic: "Farm Machinery" },
    ],
    quiz: [
      {
        id: "s1",
        question: "Which of the following is a primary benefit of crop rotation?",
        options: ["A. To waste fertilizer", "B. To maintain soil fertility and break pest life cycles", "C. To make weeding harder", "D. To dry out the soil"],
        answer: "B",
        explanation: "Crop rotation breaks pest cycles and prevents depletion of specific soil nutrients."
      },
      {
        id: "s2",
        question: "What force opposes motion when two surfaces rub together?",
        options: ["A. Gravity", "B. Magnetism", "C. Friction", "D. Tension"],
        answer: "C",
        explanation: "Friction is the force that resists sliding or rolling between touching surfaces."
      },
      {
        id: "s3",
        question: "Which type of soil has the highest water retention capacity?",
        options: ["A. Sandy soil", "B. Gravelly soil", "C. Clay soil", "D. Silt soil"],
        answer: "C",
        explanation: "Clay has tiny particles with small spaces, retaining water the longest."
      }
    ],
    paper2: [
      {
        id: "sp2_1",
        question: "Explain two reasons why farmers apply grease or oil to moving parts of farm machinery like tractors and ploughs.",
        sampleAnswer: "1. To reduce friction and wear between surfaces. 2. To prevent rusting and corrosion by blocking air and moisture.",
        keywords: ["reduce friction", "friction", "rust", "rusting", "corrosion", "lubrication", "wear"],
        explanation: "Lubricating moving parts reduces friction (stopping wear) and protects metal from moisture (preventing rust)."
      },
      {
        id: "sp2_2",
        question: "State two advantages of practicing crop rotation on a Zimbabwean farm.",
        sampleAnswer: "Crop rotation helps maintain soil fertility and breaks the breeding cycles of pests and diseases.",
        keywords: ["soil fertility", "fertility", "pest", "disease", "cycles", "nutrients"],
        explanation: "Crop rotation preserves soil nutrients (particularly nitrogen when legumes are used) and starves species-specific pests."
      }
    ]
  },
  "English Language": {
    readingMaterial: `
### ZIMSEC GRADE 7 ENGLISH LANGUAGE CORE SUMMARY

#### 1. Parts of Speech & Grammar
- **Pronouns**: Words that replace nouns to avoid repetition. Singular subject pronouns are I, you, he, she, it. Plural subject pronouns are we, they. Object pronouns are me, him, her, us, them.
- **Subject-Verb Agreement**: Singular subjects take singular verbs, and plural subjects take plural verbs. E.g., "The boy plays soccer," but "The boys play soccer."
- **Antonyms & Synonyms**:
  - **Synonym**: Words with similar meanings (e.g., *Generous* and *Kind*).
  - **Antonym**: Words with opposite meanings (e.g., *Generous* and *Mean* or *Stingy*).

#### 2. Sentence Structure & Writing Styles
- **Direct Speech**: Quoting the exact words spoken, enclosed in quotation marks. E.g., She said, "We are studying."
- **Indirect Speech**: Reporting what someone said without quoting directly. E.g., She said that they were studying.
- **Functional Writing**: Formal letters are used for business, applications, or writing to authorities. They require two addresses, a formal greeting (e.g., Dear Sir/Madam), a subject line, and a formal sign-off (e.g., Yours faithfully).
    `,
    flashcards: [
      { front: "What is a synonym?", back: "A word that has the same or similar meaning to another word (e.g. happy and glad).", topic: "Vocabulary" },
      { front: "Define the term 'antonym'.", back: "A word that means the opposite of another word (e.g. hot and cold).", topic: "Vocabulary" },
      { front: "When do we use formal letters?", back: "For official business, applications, or writing to people in authority.", topic: "Writing" }
    ],
    quiz: [
      {
        id: "e1",
        question: "Choose the correct pronoun: The boys went to the field and ___ played soccer.",
        options: ["A. he", "B. they", "C. she", "D. them"],
        answer: "B",
        explanation: "'They' is the plural subject pronoun representing 'the boys'."
      },
      {
        id: "e2",
        question: "Identify the antonym of the word 'Generous':",
        options: ["A. Kind", "B. Mean", "C. Friendly", "D. Polite"],
        answer: "B",
        explanation: "'Mean' is the opposite of generous."
      }
    ],
    paper2: [
      {
        id: "ep2_1",
        question: "Write down the correct form of the verb in brackets: Either Chipo or her brothers (has / have) taken the key.",
        sampleAnswer: "have",
        keywords: ["have"],
        explanation: "When a subject is linked by 'either... or', the verb agrees with the closer noun. 'Brothers' is plural, so 'have' is correct."
      },
      {
        id: "ep2_2",
        question: "Explain the main differences in structure between a formal letter and an informal letter.",
        sampleAnswer: "A formal letter has two addresses, a subject line, and ends with Yours faithfully. An informal letter has one address, no subject line, and ends with Yours sincerely or Love.",
        keywords: ["two addresses", "one address", "subject", "faithfully", "sincerely"],
        explanation: "Formal letters require the sender's and receiver's addresses, a subject title, and formal salutations, whereas informal letters only need the sender's address."
      }
    ]
  },
  "Social Science": {
    readingMaterial: `
### ZIMSEC GRADE 7 SOCIAL SCIENCE CORE SUMMARY

#### 1. Pre-Colonial Empires of Zimbabwe
- **Great Zimbabwe**: A powerful Shona (Karanga) pre-colonial kingdom known for its magnificent dry-stone walls built without mortar. It was a trade center dealing in gold, ivory, and cattle.
- **The Ndebele State**: Established by Mzilikazi in the 1830s after migrating from Zululand. Lobengula succeeded Mzilikazi and ruled during the period of European colonization.

#### 2. Colonisation & Liberation
- **Colonisation**: The British South Africa Company (BSAC) led by Cecil John Rhodes occupied Mashonaland in 1890 (Pioneer Column).
- **First Chimurenga (1896-1897)**: Armed resistance against colonial rule led by spirit mediums like Mbuya Nehanda and Sekuru Kaguvi.
- **Second Chimurenga**: The liberation struggle that led to Zimbabwe's Independence on 18 April 1980.

#### 3. Symbols, Citizenship & International Relations
- **Zimbabwe Bird**: A national emblem found at Great Zimbabwe representing historical heritage, authority, and national identity.
- **SADC**: Southern African Development Community, coordinates trade, peace, and economic cooperation among Southern African countries.
    `,
    flashcards: [
      { front: "Name the pre-colonial kingdom known for its magnificent stone architecture in Zimbabwe.", back: "Great Zimbabwe (built by the Shona / Karanga empire).", topic: "History" },
      { front: "What are the national colors of the Zimbabwe Flag?", back: "Green, Yellow, Red, Black, and White.", topic: "Citizenship" },
      { front: "Which body coordinates regional trade and cooperation in Southern Africa?", back: "SADC (Southern African Development Community).", topic: "International Bodies" }
    ],
    quiz: [
      {
        id: "ss1",
        question: "What is the significance of the Zimbabwe Bird symbol?",
        options: ["A. It represents a common farm bird", "B. It is a national emblem representing identity and heritage", "C. It represents rain forecasting", "D. It represents foreign trade"],
        answer: "B",
        explanation: "The soapstone birds found at Great Zimbabwe are national emblems representing Zimbabwean identity and heritage."
      },
      {
        id: "ss2",
        question: "Who was the leader of the Ndebele state during the First Chimurenga?",
        options: ["A. King Shaka", "B. King Lobengula", "C. King Mzilikazi", "D. Emperor Mutota"],
        answer: "B",
        explanation: "King Lobengula was the ruler of the Ndebele during the First Chimurenga resistance in the late 1890s."
      }
    ],
    paper2: [
      {
        id: "ssp2_1",
        question: "Explain the role of spirit mediums like Mbuya Nehanda in the First Chimurenga.",
        sampleAnswer: "Spirit mediums united different Shona and Ndebele clans, inspired the fighters, and provided spiritual guidance to resist colonial rule.",
        keywords: ["unite", "united", "inspire", "inspired", "spiritual", "guidance", "medium", "resistance"],
        explanation: "Spirit mediums played a crucial role in unifying the Shona and Ndebele groups and motivating resistance against colonial forces."
      },
      {
        id: "ssp2_2",
        question: "State three purposes of the Southern African Development Community (SADC).",
        sampleAnswer: "1. To promote economic cooperation and integration. 2. To coordinate regional trade. 3. To maintain regional peace and security.",
        keywords: ["economic", "cooperation", "trade", "peace", "security", "integration"],
        explanation: "SADC promotes economic development, integration, security, and trade policies across its Southern African member nations."
      }
    ]
  },
  "Ndebele Language": {
    readingMaterial: `
### ISINDEBELE GRADE 7 CORE SUMMARY

#### 1. Izaga leZitsho (Proverbs and Idioms)
Izaga are traditional sayings containing wisdom. E.g.:
- *"Inja yomoya ayibambi."* (Umduduli/umuntu oguquguqukayo kazuzi lutho — A person who lacks focus will not succeed).
- *"Isikhuni sibuya lomlotha."* (Okubi okwenzileyo kuzabuyela kuwe).

#### 2. Uhlelo loLimi (Grammar)
- **Izabizwa (Pronouns)**: Izabizwa zokukhomba (demonstrative pronouns) and izabizwa zoqobo (absolute pronouns).
- **Izenzo (Verbs)**: Ukuvumelana kukamqondisi wesenzo nebizo (Subject-Verb agreement). E.g., *Umfana ugijima enkundleni* (Class 1 subject 'umfana' takes subject concord 'u-').
    `,
    flashcards: [
      { front: "Explain the proverb: 'Isaga sithi: Inja yomoya ayibambi.'", back: "It means a person who lacks focus or changes direction constantly will not succeed.", topic: "Izaga leZitsho" },
      { front: "What is 'ukubingelela' in Ndebele?", back: "Greetings (e.g. Salibonani, Linjani).", topic: "Culture" }
    ],
    quiz: [
      {
        id: "nd1",
        question: "Gwalisa isikhala: Umfana ___ enkundleni.",
        options: ["A. ugijima", "B. bagijima", "C. sigijima", "D. kugijima"],
        answer: "A",
        explanation: "'Umfana' belongs to noun class 1, which uses the prefix concord 'u-'."
      }
    ],
    paper2: [
      {
        id: "ndp2_1",
        question: "Chaza ukuthi litsho ukuthini leli saga: 'Inja yomoya ayibambi.'",
        sampleAnswer: "Litho ukuthi umuntu oguquguqukayo noma ongenelisi ukuhlala endaweni eyodwa noma ukugxila entweni eyodwa kasoze aphumelele.",
        keywords: ["uguquguqukayo", "kasoze", "aphumelele", "gxila", "focus"],
        explanation: "Leli saga lifundisa ngokugxila entweni eyodwa ukuze uphumelele."
      }
    ]
  },
  "Family & Religious Studies (FRS)": {
    readingMaterial: `
### FAMILY & RELIGIOUS STUDIES (FRS) GRADE 7 SUMMARY

#### 1. Ubuntu / Unhu (Humanity & Ethics)
- **Unhu/Ubuntu** is an indigenous ethical framework emphasizing community solidarity, respect for elders, moral uprightness, and kindness. Core philosophy: "I am because we are."

#### 2. Major Religions in Zimbabwe
- **Indigenous Religion (ATR)**: Belief in God (Mwari/Musikavanhu), respect for ancestors (Vadzimu), and sacred shrines.
- **Christianity**: Belief in Jesus Christ, the Bible as the holy book, and moral codes like the Ten Commandments.
- **Islam**: Belief in Allah and His Prophet Muhammad, the Qur'an as the holy book, and the Five Pillars of Islam.
    `,
    flashcards: [
      { front: "What does the concept 'Unhu' or 'Ubuntu' teach?", back: "Humanity, respect, community sharing, and moral values ('I am because we are').", topic: "Indigenous Religion" },
      { front: "What is the sacred writing of Christianity?", back: "The Bible.", topic: "Christianity" },
      { front: "What is the sacred writing of Islam?", back: "The Qur'an.", topic: "Islam" }
    ],
    quiz: [
      {
        id: "fr1",
        question: "Which of the following is a core moral value in FAREME/FRS?",
        options: ["A. Selfishness", "B. Dishonesty", "C. Tolerance and respect", "D. Greed"],
        answer: "C",
        explanation: "Tolerance and respect are basic moral values taught in FRS to foster peaceful co-existence."
      }
    ],
    paper2: [
      {
        id: "frp2_1",
        question: "Explain the importance of the concept of 'Unhu' or 'Ubuntu' in Zimbabwean communities.",
        sampleAnswer: "It teaches respect for others, community sharing, solidarity, good morals, and helping the needy. It promotes peaceful living.",
        keywords: ["respect", "community", "sharing", "morals", "peaceful", "unhu", "ubuntu", "solidarity"],
        explanation: "Unhu promotes communal cohesion, moral responsibility, and mutual respect among community members."
      }
    ]
  }
};
