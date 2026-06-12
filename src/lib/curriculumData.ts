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

**Official exam format (7020/01)**: 40 multiple-choice questions, 2 hours, NO calculators. Answers are shaded on a separate answer sheet with an HB pencil.
**ZIMSEC tip**: the exam often writes decimals with a comma — **0,7 means 0.7** and **$25,00 means $25.00**. Do not be confused by this.

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
- **Multiplication**: Break large numbers apart (e.g. 36 × 25 = 36 × 100 ÷ 4 = 900).
- **Division**: Check your answer by multiplying back (e.g. 144 ÷ 12 = 12 because 12 × 12 = 144).

#### 2. Fractions of Quantities
To find a fraction of a quantity (e.g. finding **3/4 of 20**):
1. **Divide** the total quantity by the denominator (bottom number): 20 ÷ 4 = 5.
2. **Multiply** the result by the numerator (top number): 5 × 3 = 15.

**Equivalent fractions**: Multiply or divide the top and bottom by the same number (1/2 = 2/4 = 5/10).
**Lowest terms**: Divide top and bottom by their highest common factor (e.g. 8/12 = 2/3 after dividing by 4).

#### 3. Decimals, Percentages & Fractions
These are three ways of writing the same value. Learn the common conversions:
- 1/2 = 0.5 = 50%
- 1/4 = 0.25 = 25%
- 3/4 = 0.75 = 75%
- 1/10 = 0.1 = 10%
- 1/5 = 0.2 = 20%

To find a percentage of an amount: convert to a fraction first. *Example*: 25% of 80 = 1/4 × 80 = 20.

#### 4. Factors, Multiples, LCM & HCF
- **Factor**: A number that divides exactly into another (factors of 12: 1, 2, 3, 4, 6, 12).
- **Multiple**: The times-table of a number (multiples of 4: 4, 8, 12, 16...).
- **LCM (Least Common Multiple)**: The smallest number in both times-tables. LCM of 4 and 6 is 12.
- **HCF (Highest Common Factor)**: The largest number that divides into both. HCF of 12 and 18 is 6.

#### 5. Perimeter of Squares & Rectangles
- The **Perimeter** is the total distance around the outside of a shape.
- Square: **Perimeter = 4 × Side**. *Example*: side 6 cm → 4 × 6 = 24 cm.
- Rectangle: **Perimeter = 2 × (Length + Width)**. *Example*: 10 m by 4 m → 2 × 14 = 28 m.

#### 6. Number Patterns & Sequences
- A sequence follows a constant rule (common difference).
- For the pattern **2, 4, 6, 8...**, the rule is to add 2. The next term is 10.
- Patterns can also multiply: **3, 6, 12, 24...** doubles each time, so the next term is 48.

#### 7. Time, Money & Rates
- Time: 1 hour = 60 minutes; 1 minute = 60 seconds. A bus leaving at 09:45 and arriving at 11:15 travels for 1 hour 30 minutes.
- Money: Always line up the decimal points when adding dollars and cents.
- Rates: If 3 exercise books cost $6, one book costs $6 ÷ 3 = $2, so 5 books cost 5 × $2 = $10.

#### 8. Angles & Shapes
- A **right angle** is exactly 90°. A **straight line** is 180°. A full turn is 360°.
- Angles in a triangle add up to **180°**. Angles on a straight line add up to **180°**.
- A hexagon has 6 sides; a pentagon has 5; an octagon has 8.

#### 9. Data Handling (Averages)
- **Mean (average)** = total of all values ÷ how many values there are.
- *Example*: Scores 6, 8, 10 → mean = (6 + 8 + 10) ÷ 3 = 24 ÷ 3 = 8.
- **Mode** = the value that appears most often. **Median** = the middle value when arranged in order. **Range** = biggest value − smallest value.

#### 10. Rounding & Estimation (Common ZIMSEC Questions)
- To round to the nearest hundred, look at the tens digit: 5 or more rounds UP. 4,567 → **4,600**.
- Estimate before calculating: 198 + 305 ≈ 200 + 300 = **500**.
- Order of operations (BODMAS): multiply/divide BEFORE add/subtract. 7 × 8 + 6 = 56 + 6 = **62**.

#### 11. Unit Conversions (Learn These by Heart)
- Length: 1 km = 1,000 m; 1 m = 100 cm. So 2 km = **2,000 m**.
- Mass: 1 kg = 1,000 g. So 3.5 kg = **3,500 g**.
- Capacity: 1 litre = 1,000 ml. So 2 litres = **2,000 ml**.
- Time: 1 hour = 60 min, so half an hour = **30 minutes**. ZIMSEC also tests 24-hour time: 2:30 pm = **1430**.
- Money: 100 cents = $1, so 3,007 cents = **$30.07**.

#### 12. Square Numbers, Even/Odd & Discounts
- A **square number** is a number times itself: 1, 4, 9, 16, 25... (9 = 3 × 3).
- **Even** numbers end in 0, 2, 4, 6, 8; **odd** numbers end in 1, 3, 5, 7, 9.
- **Discount**: 10% off $25.00 → discount = $2.50, so you pay 25.00 − 2.50 = **$22.50**.
- Lines that never meet are **parallel**; lines meeting at 90° are **perpendicular**.
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

#### 3. Ratio & Sharing
- A ratio compares quantities. To share $60 between two people in the ratio 2:1:
  - Step 1: Add the ratio parts: 2 + 1 = 3 parts.
  - Step 2: Find one part: $60 ÷ 3 = $20.
  - Step 3: Multiply out: first person gets 2 × $20 = **$40**, second gets 1 × $20 = **$20**.
  - Step 4: Check: $40 + $20 = $60. ✓

#### 4. Word Problems with Money
Read the question twice, underline the numbers, and decide on the operation before working.
- *Example*: Mrs Moyo buys 4 loaves of bread at $1.50 each and pays with a $10 note.
  - Cost: 4 × $1.50 = **$6.00**
  - Change: $10.00 − $6.00 = **$4.00**
- Always write money answers with two decimal places and the dollar sign.

#### 5. Volume of a Cuboid
- **Volume = Length × Width × Height**, measured in cubic units (cm³ or m³).
- *Example*: A box 5 cm long, 4 cm wide, and 3 cm high has volume 5 × 4 × 3 = **60 cm³**.

#### 6. Averages in Context
- To find an average (mean), add all values then divide by the count.
- *Example Working*: A learner scores 65, 72, and 88 in three tests.
  - Total: 65 + 72 + 88 = 225
  - Mean: 225 ÷ 3 = **75**
- If asked "what must she score next time to average 80 over four tests", work backwards:
  total needed = 80 × 4 = 320; already has 225; so she needs 320 − 225 = **95**.

#### 7. Showing Working: The Three-Step Habit
For every structured question:
1. **Formula** — write the rule you are using.
2. **Substitute** — replace letters with the numbers given.
3. **Answer with units** — compute and never forget cm, m², kg, $ or hours.
Marks are awarded for each step, so even a wrong final answer earns method marks.
    `,
    flashcards: [
      { front: "What is the formula for the Area of a Rectangle?", back: "Area = Length × Width", topic: "Measures" },
      { front: "What do the interior angles of a triangle add up to?", back: "180 degrees", topic: "Geometry" },
      { front: "How many sides does a hexagon have?", back: "6 sides", topic: "Geometry" },
      { front: "What is 25% written as a fraction in its lowest terms?", back: "1/4", topic: "Fractions & Decimals" },
      { front: "How do you find the Least Common Multiple (LCM) of 4 and 6?", back: "List multiples: 4 (4, 8, 12, 16...) and 6 (6, 12, 18...). The smallest common is 12.", topic: "Factors & Multiples" },
      { front: "What is the formula for the perimeter of a rectangle?", back: "Perimeter = 2 × (Length + Width)", topic: "Measures" },
      { front: "What is the formula for the volume of a cuboid?", back: "Volume = Length × Width × Height (in cubic units, e.g. cm³)", topic: "Measures" },
      { front: "How do you calculate the mean (average) of a set of numbers?", back: "Add all the values, then divide by how many values there are.", topic: "Data Handling" },
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
      },
      {
        id: "m6",
        question: "What is 25% of 80?",
        options: ["A. 25", "B. 40", "C. 15", "D. 20"],
        answer: "D",
        explanation: "25% = 1/4, and 1/4 of 80 = 80 ÷ 4 = 20."
      },
      {
        id: "m7",
        question: "Find the HCF of 12 and 18.",
        options: ["A. 2", "B. 3", "C. 6", "D. 36"],
        answer: "C",
        explanation: "Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. The highest common factor is 6."
      },
      {
        id: "m8",
        question: "A bus leaves Bulawayo at 09:45 and arrives in Gweru at 11:15. How long is the journey?",
        options: ["A. 1 hour 15 minutes", "B. 1 hour 30 minutes", "C. 2 hours", "D. 1 hour 45 minutes"],
        answer: "B",
        explanation: "From 09:45 to 11:15 is 1 hour 30 minutes (15 min to 10:00, then 1 hour 15 min more)."
      },
      {
        id: "m9",
        question: "If 3 exercise books cost $6, how much do 5 books cost?",
        options: ["A. $8", "B. $12", "C. $10", "D. $15"],
        answer: "C",
        explanation: "One book costs $6 ÷ 3 = $2, so 5 books cost 5 × $2 = $10."
      },
      {
        id: "m10",
        question: "Two angles of a triangle measure 60° and 80°. What is the third angle?",
        options: ["A. 40°", "B. 50°", "C. 60°", "D. 30°"],
        answer: "A",
        explanation: "Angles in a triangle add up to 180°. 180 − (60 + 80) = 40°."
      },
      {
        id: "m11",
        question: "What is the mean of the scores 6, 8 and 10?",
        options: ["A. 7", "B. 8", "C. 9", "D. 24"],
        answer: "B",
        explanation: "Mean = (6 + 8 + 10) ÷ 3 = 24 ÷ 3 = 8."
      },
      {
        id: "m12",
        question: "Which fraction is equal to 0.75?",
        options: ["A. 1/4", "B. 2/3", "C. 3/4", "D. 7/5"],
        answer: "C",
        explanation: "0.75 = 75/100, which simplifies to 3/4."
      },
      {
        id: "m13",
        question: "Calculate: 234 × 6",
        options: ["A. 1,404", "B. 1,304", "C. 1,444", "D. 1,204"],
        answer: "A",
        explanation: "234 × 6: 200×6=1,200, 30×6=180, 4×6=24. 1,200+180+24 = 1,404."
      },
      {
        id: "m14",
        question: "Calculate: 1,248 ÷ 8",
        options: ["A. 146", "B. 156", "C. 166", "D. 126"],
        answer: "B",
        explanation: "1,248 ÷ 8 = 156. Check by multiplying back: 156 × 8 = 1,248."
      },
      {
        id: "m15",
        question: "Round 4,567 to the nearest hundred.",
        options: ["A. 4,500", "B. 4,600", "C. 4,570", "D. 5,000"],
        answer: "B",
        explanation: "The tens digit is 6 (5 or more), so round up: 4,567 → 4,600."
      },
      {
        id: "m16",
        question: "In the number 45,678, the digit 5 stands for:",
        options: ["A. 50", "B. 500", "C. 5,000", "D. 50,000"],
        answer: "C",
        explanation: "The 5 is in the thousands place, so it stands for 5,000."
      },
      {
        id: "m17",
        question: "Work out 7 × 8 + 6.",
        options: ["A. 56", "B. 62", "C. 98", "D. 60"],
        answer: "B",
        explanation: "Multiply before adding (BODMAS): 7 × 8 = 56, then 56 + 6 = 62."
      },
      {
        id: "m18",
        question: "Calculate: 1/2 + 1/4",
        options: ["A. 2/6", "B. 1/2", "C. 3/4", "D. 1/6"],
        answer: "C",
        explanation: "Make the denominators the same: 1/2 = 2/4, so 2/4 + 1/4 = 3/4."
      },
      {
        id: "m19",
        question: "Simplify 6/8 to its lowest terms.",
        options: ["A. 2/4", "B. 3/4", "C. 4/6", "D. 1/2"],
        answer: "B",
        explanation: "Divide top and bottom by 2: 6 ÷ 2 = 3 and 8 ÷ 2 = 4, giving 3/4."
      },
      {
        id: "m20",
        question: "Calculate: 0.5 + 0.25",
        options: ["A. 0.30", "B. 0.55", "C. 0.75", "D. 0.07"],
        answer: "C",
        explanation: "Line up the decimal points: 0.50 + 0.25 = 0.75."
      },
      {
        id: "m21",
        question: "Calculate: 3.6 × 10",
        options: ["A. 0.36", "B. 36", "C. 360", "D. 3.60"],
        answer: "B",
        explanation: "Multiplying by 10 moves the decimal point one place right: 3.6 → 36."
      },
      {
        id: "m22",
        question: "Find 10% of 250.",
        options: ["A. 2.5", "B. 25", "C. 250", "D. 20"],
        answer: "B",
        explanation: "10% = 1/10, and 250 ÷ 10 = 25."
      },
      {
        id: "m23",
        question: "Tendai pays for a $2.35 item with $5.00. How much change does he get?",
        options: ["A. $2.65", "B. $3.35", "C. $2.75", "D. $2.35"],
        answer: "A",
        explanation: "$5.00 − $2.35 = $2.65. Line up the decimal points when subtracting money."
      },
      {
        id: "m24",
        question: "2 km = ____ m",
        options: ["A. 200", "B. 2,000", "C. 20,000", "D. 20"],
        answer: "B",
        explanation: "1 km = 1,000 m, so 2 km = 2 × 1,000 = 2,000 m."
      },
      {
        id: "m25",
        question: "3.5 kg = ____ g",
        options: ["A. 350", "B. 35,000", "C. 3,500", "D. 3,050"],
        answer: "C",
        explanation: "1 kg = 1,000 g, so 3.5 kg = 3.5 × 1,000 = 3,500 g."
      },
      {
        id: "m26",
        question: "Find the area of a rectangle 8 cm long and 5 cm wide.",
        options: ["A. 13 cm²", "B. 26 cm²", "C. 40 cm²", "D. 45 cm²"],
        answer: "C",
        explanation: "Area = length × width = 8 × 5 = 40 cm²."
      },
      {
        id: "m27",
        question: "Two straight lines that never meet are said to be:",
        options: ["A. perpendicular", "B. parallel", "C. curved", "D. equal"],
        answer: "B",
        explanation: "Parallel lines run side by side and never meet; perpendicular lines cross at 90°."
      },
      {
        id: "m28",
        question: "If x + 5 = 12, then x =",
        options: ["A. 5", "B. 7", "C. 12", "D. 17"],
        answer: "B",
        explanation: "Subtract 5 from both sides: x = 12 − 5 = 7."
      },
      {
        id: "m29",
        question: "A farmer plants 8 rows of maize with 25 plants in each row. How many plants are there in total?",
        options: ["A. 180", "B. 200", "C. 210", "D. 225"],
        answer: "B",
        explanation: "8 rows × 25 plants = 200 plants."
      },
      {
        id: "m30",
        question: "144 eggs are packed into trays that hold 12 eggs each. How many trays are needed?",
        options: ["A. 10", "B. 11", "C. 12", "D. 14"],
        answer: "C",
        explanation: "144 ÷ 12 = 12 trays."
      },
      {
        id: "m31",
        question: "Which of the following is a square number?",
        options: ["A. 3", "B. 5", "C. 9", "D. 12"],
        answer: "C",
        explanation: "9 = 3 × 3, a number multiplied by itself. (From the ZIMSEC specimen paper.)"
      },
      {
        id: "m32",
        question: "A pair of shoes is marked $25.00. If a 10% discount is offered for cash, the discount price is:",
        options: ["A. $23.75", "B. $26.25", "C. $2.50", "D. $22.50"],
        answer: "D",
        explanation: "10% of $25.00 is $2.50. Discount price = $25.00 − $2.50 = $22.50."
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
      },
      {
        id: "mp2_3",
        question: "Tendai and Sipho share $60 in the ratio 2:1. Show how much each person receives, with full working.",
        sampleAnswer: "Total parts = 2 + 1 = 3 parts. Divide to share: one part = $60 ÷ 3 = $20. Tendai gets 2 × $20 = $40 and Sipho gets 1 × $20 = $20.",
        keywords: ["parts", "3", "20", "40", "divide"],
        explanation: "Add the ratio parts (3), divide the total by 3 to get $20 per part, then multiply each person's parts."
      },
      {
        id: "mp2_4",
        question: "Mrs Moyo buys 4 loaves of bread at $1.50 each. She pays with a $10 note. Calculate her change, showing all working.",
        sampleAnswer: "Cost = 4 × $1.50 = $6.00. Change = $10.00 − $6.00 = $4.00.",
        keywords: ["6", "4.00", "multiply", "change", "subtract"],
        explanation: "First find the total cost (4 × $1.50 = $6.00), then subtract from $10.00 to get $4.00 change."
      },
      {
        id: "mp2_5",
        question: "A box is 5 cm long, 4 cm wide and 3 cm high. Calculate its volume, stating the formula and the correct units.",
        sampleAnswer: "Volume = length × width × height = 5 × 4 × 3 = 60 cm³ (cubic centimetres).",
        keywords: ["volume", "60", "cm³", "cubic", "height", "multiply"],
        explanation: "Volume of a cuboid = L × W × H = 5 × 4 × 3 = 60, measured in cubic centimetres (cm³)."
      }
    ]
  },
  "Agriculture, Science & Technology": {
    readingMaterial: `
### ZIMSEC GRADE 7 AGRICULTURE, SCIENCE & TECHNOLOGY SUMMARY

Please see the Paper 1 and Paper 2 guides for full exam preparation.
    `,
    readingMaterialPaper1: `
### ZIMSEC GRADE 7 AGRICULTURE, SCIENCE & TECHNOLOGY: PAPER 1 (MULTIPLE CHOICE PREP)

**Official exam format (703/1)**: multiple choice, 1 hour 45 minutes. Paper 2 (703/2) is structured with sections A-D.

#### 1. Soil Science & Nutrients
- **Soil Types**: Sand (large particles, poor water holding capacity), Clay (fine particles, high water retention, poor drainage), Silt (medium particles), and Loam (ideal mixture of sand, clay, and organic matter — the best soil for most crops).
- **Major Nutrients**: Nitrogen (N) for leafy growth, Phosphorus (P) for root development, and Potassium (K) for flowers/fruit and disease resistance.
- **Soil Conservation**: Contour ridging, terracing, planting cover crops, and mulching help prevent soil erosion caused by wind and run-off water.

#### 2. Crop Production
- **Crop Rotation**: Growing different crop families in the same field in sequential seasons. Advantages:
  1. Balances soil nutrients (legumes like beans fix nitrogen).
  2. Breaks pest and disease cycles.
  3. Improves soil structure.
- **Wheat Cultivation**: In Zimbabwe, wheat is grown in **winter** under irrigation because it requires cooler temperatures and must avoid heavy summer rainfall.
- **Germination**: A seed needs **water, air (oxygen) and warmth** to germinate. Light is not required until the shoot emerges.

#### 3. Livestock & Poultry
- **Ruminants** (cattle, goats, sheep) have a four-chambered stomach and chew the cud.
- **Broilers** are chickens raised for meat; **layers** are raised for eggs.
- Animals need a balanced diet, clean water, shelter, and vaccination against diseases such as Newcastle disease (poultry) and anthrax (cattle).

#### 4. Farm Machinery & Energy
- **Friction**: The force that opposes motion. Farm tools and machinery wear out due to friction.
- **Lubrication**: Applying oil or grease between moving parts reduces friction, prevents wear, stops rusting, and lowers heat build-up.
- **Simple Machines**: Levers, pulleys, inclined planes, and wheelbarrows are force multipliers that make farm labour easier. A wheelbarrow is a class 2 lever.

#### 5. Matter, Water & Energy
- **States of matter**: solid, liquid, gas. Water changes state by **melting, freezing, evaporation and condensation**.
- **The Water Cycle**: the sun heats water (evaporation) → vapour cools into clouds (condensation) → rain falls (precipitation) → water collects in rivers and dams.
- **Energy sources**: renewable (solar, wind, hydro, biogas) and non-renewable (coal, petrol, diesel). Zimbabwe's Kariba Dam generates **hydro-electric power**.

#### 6. Electricity & Safety
- A complete circuit needs a power source, conducting wires, and a load (e.g. bulb).
- **Conductors** (copper, iron) allow current to flow; **insulators** (plastic, rubber, dry wood) do not.
- Safety rules: never touch switches with wet hands, never insert objects into sockets, and report fallen power lines to ZESA.

#### 7. Information & Communication Technology (ICT)
- **Hardware** is the physical parts of a computer (keyboard, monitor, mouse); **software** is the programs.
- Input devices: keyboard, mouse, scanner. Output devices: monitor, printer, speakers.
- ICT in farming: weather forecasts, market prices via mobile phones, and record keeping.

#### 8. Water & Farming Systems (Syllabus Topics)
- **Natural water sources**: rivers, springs, rain, lakes. **Man-made sources**: dams, wells, boreholes, tanks.
- Conserve water by mulching, drip irrigation, fixing leaks, and harvesting rainwater.
- **Mixed farming** = growing crops AND keeping livestock on the same farm. Advantages: manure from animals fertilises crops, crop residues feed animals, and income comes from two sources.
- **Careers in agriculture**: farmer, agronomist, veterinary surgeon, agricultural engineer, extension officer.
    `,
    readingMaterialPaper2: `
### ZIMSEC GRADE 7 AGRICULTURE, SCIENCE & TECHNOLOGY: PAPER 2 (STRUCTURED PREP)

In Paper 2 you must write clear sentences, give the number of points asked for, and use correct scientific terms.

#### 1. Explaining Lubrication (Common Question)
Why farmers apply grease or oil to moving machine parts:
1. To **reduce friction** between surfaces so parts move smoothly.
2. To **prevent wear** — less rubbing means parts last longer.
3. To **prevent rusting** — oil blocks air and moisture from reaching the metal.
4. To **reduce heat** build-up in moving parts.

#### 2. Explaining Crop Rotation (Common Question)
Advantages a farmer gains from rotating crops:
1. **Maintains soil fertility** — legumes (beans, groundnuts) fix nitrogen for the next crop.
2. **Breaks pest and disease cycles** — pests that feed on maize starve in a bean year.
3. **Improves soil structure** — different root depths loosen different soil layers.
4. **Controls weeds** that are adapted to one crop.

#### 3. Soil Erosion: Causes & Control
- **Causes**: deforestation, overgrazing, ploughing up and down slopes, veld fires.
- **Control measures**: contour ridges, planting grass strips, reforestation, mulching, controlled grazing.
- Be ready to explain **how** each measure works, e.g. "Contour ridges slow run-off water so it sinks into the soil instead of carrying topsoil away."

#### 4. The Water Cycle in Steps
1. **Evaporation** — the sun heats water in rivers, dams and oceans, turning it into vapour.
2. **Condensation** — the vapour rises, cools and forms clouds.
3. **Precipitation** — water falls as rain, hail or snow.
4. **Collection** — water gathers in rivers, dams and underground.

#### 5. Germination Experiment (Practical Question)
To prove seeds need water to germinate:
- Take two containers with cotton wool and bean seeds.
- **Container A**: keep the cotton wool moist. **Container B**: keep it dry.
- Leave both in a warm place for one week.
- **Result**: only the seeds in Container A germinate, showing water is necessary.
- A fair test changes **only one factor** (water) and keeps everything else the same.

#### 6. Balanced Diet for Livestock & People
- **Carbohydrates** (maize, sadza) give energy; **proteins** (beans, meat, milk) build the body;
  **vitamins and minerals** (fruit, vegetables) protect against disease; water and roughage aid digestion.
- A kwashiorkor-type condition results from protein deficiency.
    `,
    flashcards: [
      { front: "Why is wheat grown in winter in Zimbabwe?", back: "It requires cool temperatures and is grown under irrigation when summer rains have stopped.", topic: "Crop Production" },
      { front: "What are the three main soil types?", back: "Clay, sand, and silt (loam is a mixture).", topic: "Soils" },
      { front: "What are the major soil nutrients required by plants?", back: "Nitrogen (N), Phosphorus (P), Potassium (K).", topic: "Soils" },
      { front: "Why do we apply grease or oil to farm machines?", back: "To reduce friction, prevent wear, and stop rusting.", topic: "Farm Machinery" },
      { front: "What three things does a seed need to germinate?", back: "Water, air (oxygen) and warmth.", topic: "Crop Production" },
      { front: "Name the four steps of the water cycle.", back: "Evaporation, condensation, precipitation, collection.", topic: "Water & Energy" },
      { front: "What is the difference between a conductor and an insulator?", back: "A conductor (e.g. copper) lets electricity flow; an insulator (e.g. plastic) does not.", topic: "Electricity" },
      { front: "What is the difference between broilers and layers?", back: "Broilers are chickens raised for meat; layers are raised for eggs.", topic: "Livestock" },
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
      },
      {
        id: "s4",
        question: "Which nutrient do legumes such as beans add to the soil?",
        options: ["A. Potassium", "B. Nitrogen", "C. Iron", "D. Calcium"],
        answer: "B",
        explanation: "Legumes have root nodules with bacteria that fix nitrogen from the air into the soil."
      },
      {
        id: "s5",
        question: "Which of these is NOT needed for a seed to germinate?",
        options: ["A. Water", "B. Warmth", "C. Air", "D. Light"],
        answer: "D",
        explanation: "Seeds germinate underground in the dark — they need water, air and warmth, not light."
      },
      {
        id: "s6",
        question: "The process by which water vapour cools and forms clouds is called:",
        options: ["A. Evaporation", "B. Condensation", "C. Precipitation", "D. Collection"],
        answer: "B",
        explanation: "Condensation is when water vapour cools back into tiny water droplets, forming clouds."
      },
      {
        id: "s7",
        question: "Which of the following is a renewable source of energy?",
        options: ["A. Coal", "B. Diesel", "C. Solar power", "D. Petrol"],
        answer: "C",
        explanation: "Solar energy is renewable because the sun's energy cannot be used up; coal, diesel and petrol are non-renewable fossil fuels."
      },
      {
        id: "s8",
        question: "Which material is a good conductor of electricity?",
        options: ["A. Plastic", "B. Rubber", "C. Copper", "D. Dry wood"],
        answer: "C",
        explanation: "Copper is a metal and conducts electricity well; plastic, rubber and dry wood are insulators."
      },
      {
        id: "s9",
        question: "A wheelbarrow is an example of which simple machine?",
        options: ["A. A pulley", "B. A lever", "C. An inclined plane", "D. A screw"],
        answer: "B",
        explanation: "A wheelbarrow is a class 2 lever — the load sits between the wheel (fulcrum) and the effort at the handles."
      },
      {
        id: "s10",
        question: "Animals such as cattle and goats that chew the cud are called:",
        options: ["A. Rodents", "B. Ruminants", "C. Reptiles", "D. Raptors"],
        answer: "B",
        explanation: "Ruminants have a four-chambered stomach and bring food back to the mouth to chew again (chewing the cud)."
      },
      {
        id: "s11",
        question: "Which of the following is an INPUT device of a computer?",
        options: ["A. Monitor", "B. Printer", "C. Keyboard", "D. Speakers"],
        answer: "C",
        explanation: "A keyboard sends information INTO the computer. Monitors, printers and speakers are output devices."
      },
      {
        id: "s12",
        question: "Kariba Dam generates electricity using:",
        options: ["A. Coal power", "B. Hydro-electric power", "C. Solar power", "D. Wind power"],
        answer: "B",
        explanation: "Kariba uses the force of falling water from the dam to turn turbines — hydro-electric power."
      },
      {
        id: "s13",
        question: "Which of the following is a MAN-MADE source of water?",
        options: ["A. A river", "B. A spring", "C. A borehole", "D. Rain"],
        answer: "C",
        explanation: "Boreholes, wells, dams and tanks are man-made; rivers, springs and rain are natural sources."
      },
      {
        id: "s14",
        question: "Growing crops AND keeping livestock on the same farm is called:",
        options: ["A. Monoculture", "B. Mixed farming", "C. Market gardening", "D. Shifting cultivation"],
        answer: "B",
        explanation: "Mixed farming combines crops and livestock — manure fertilises the crops and crop residues feed the animals."
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
      },
      {
        id: "sp2_3",
        question: "Describe two ways a farmer can control soil erosion on a sloping field, explaining how each method works.",
        sampleAnswer: "1. Contour ridging — ridges across the slope slow run-off water so it sinks into the soil instead of washing topsoil away. 2. Planting grass strips or cover crops — roots hold the soil together and leaves shield it from heavy raindrops.",
        keywords: ["contour", "ridges", "grass", "cover crop", "run-off", "topsoil", "roots", "mulch"],
        explanation: "Erosion control works by slowing moving water (contours, terraces) or binding/covering the soil (grass, mulch, cover crops)."
      },
      {
        id: "sp2_4",
        question: "Describe the four stages of the water cycle in the correct order.",
        sampleAnswer: "Evaporation: the sun heats water and turns it into vapour. Condensation: the vapour cools and forms clouds. Precipitation: water falls as rain. Collection: water gathers in rivers, dams and underground.",
        keywords: ["evaporation", "condensation", "precipitation", "collection", "vapour", "clouds", "rain"],
        explanation: "The cycle moves water from the earth to the sky and back: evaporation → condensation → precipitation → collection."
      },
      {
        id: "sp2_5",
        question: "A learner wants to prove that seeds need water to germinate. Describe a simple experiment she can use, including how she makes it a fair test.",
        sampleAnswer: "Put bean seeds on cotton wool in two containers. Keep container A moist and container B dry, both in the same warm place. After a week only the seeds in A germinate, proving seeds need water. It is a fair test because only one factor (water) is changed.",
        keywords: ["two containers", "moist", "dry", "germinate", "fair test", "one factor", "water"],
        explanation: "A controlled experiment changes only the factor being tested (water) while keeping warmth, air and seed type the same."
      }
    ]
  },
  "English Language": {
    readingMaterial: `
### ZIMSEC GRADE 7 ENGLISH LANGUAGE CORE SUMMARY

Please see the Paper 1 and Paper 2 guides for full exam preparation.
    `,
    readingMaterialPaper1: `
### ZIMSEC GRADE 7 ENGLISH LANGUAGE: PAPER 1 (MULTIPLE CHOICE PREP)

**Official exam format (7010/01)**: multiple choice, 1 hour 30 minutes — comprehension passages, vocabulary and grammar.

#### 1. Parts of Speech & Grammar
- **Pronouns**: Words that replace nouns to avoid repetition. Singular subject pronouns are I, you, he, she, it. Plural subject pronouns are we, they. Object pronouns are me, him, her, us, them.
- **Subject-Verb Agreement**: Singular subjects take singular verbs, and plural subjects take plural verbs. E.g., "The boy plays soccer," but "The boys play soccer."
- **Antonyms & Synonyms**:
  - **Synonym**: Words with similar meanings (e.g., *Generous* and *Kind*).
  - **Antonym**: Words with opposite meanings (e.g., *Generous* and *Mean* or *Stingy*).

#### 2. Tenses
- **Present simple**: She walks to school every day.
- **Past simple**: She walked to school yesterday. Irregular verbs change completely: go → went, eat → ate, see → saw, write → wrote.
- **Future**: She will walk to school tomorrow.
- **Present continuous**: She is walking to school right now.

#### 3. Prepositions
Prepositions show position or relationship: in, on, at, under, between, among, behind.
- Use **at** for exact times (at 8 o'clock), **on** for days (on Monday), **in** for months and years (in March, in 2026).
- **Between** is used for two things; **among** for three or more.

#### 4. Plurals & Spelling
- Regular plurals add -s or -es: book → books, box → boxes.
- Words ending in consonant + y change to -ies: baby → babies.
- Irregular plurals: child → children, foot → feet, woman → women, sheep → sheep.

#### 5. Punctuation
- Every sentence starts with a capital letter and ends with a full stop, question mark or exclamation mark.
- **Commas** separate items in a list: We bought bread, milk, eggs and sugar.
- **Apostrophes** show possession (Chipo's book) or contraction (don't = do not).
- **Quotation marks** enclose the exact words spoken in direct speech.

#### 6. Comprehension Skills
- Read the passage **twice** before answering questions.
- Find answers **in the passage** — do not guess from your own ideas.
- Watch for question words: *who* (person), *when* (time), *where* (place), *why* (reason — answer with "because...").
- For vocabulary questions ("What does X mean as used in the passage?"), replace the word with each option and see which keeps the sentence's meaning.
    `,
    readingMaterialPaper2: `
### ZIMSEC GRADE 7 ENGLISH LANGUAGE: PAPER 2 (WRITTEN PREP)

**Official exam format (7010/02)**: written paper, 1 hour 45 minutes. Section A: Composition [20 marks] — choose ONE of two topics, write **80 to 120 words** using the guiding notes given. Section B: Comprehension — answer in FULL sentences with correct punctuation. Spend about 1 hour on the composition and 30 minutes on comprehension.

#### 1. Direct & Indirect Speech
- **Direct Speech**: Quoting the exact words spoken, enclosed in quotation marks. E.g., She said, "We are studying."
- **Indirect Speech**: Reporting what someone said without quoting directly. E.g., She said that they were studying.
- Changes when converting: present tense → past tense, "today" → "that day", "tomorrow" → "the next day", I/we → he/she/they.

#### 2. Functional Writing: Formal & Informal Letters
- **Formal letters** (to a headmaster, council, business) require:
  - **Two addresses** (yours top right, receiver's on the left), the date,
  - a formal greeting (Dear Sir/Madam), a **subject line**,
  - clear paragraphs, and a formal sign-off: **Yours faithfully** (if Dear Sir/Madam) or **Yours sincerely** (if you used their name).
- **Informal letters** (to a friend or relative) need only **one address**, a friendly greeting (Dear Rudo), a chatty tone, and end with Love / Your friend.

#### 3. Composition Writing (Planning Wins Marks)
Before writing, spend 5 minutes planning:
1. **Introduction** — set the scene in 2-3 sentences; grab attention.
2. **Body** — 2-3 paragraphs, each with ONE main idea plus supporting details.
3. **Conclusion** — wrap up the story or argument; never end suddenly.
Markers reward: paragraphing, varied sentence openings, correct tenses kept consistent, descriptive vocabulary (instead of "nice", use "delightful", "generous", "sparkling").

#### 4. Common Structured Question Types
- **Verb form questions**: Either Chipo or her brothers (has/have) taken the key → "have" (the verb agrees with the nearer subject, "brothers").
- **Rewrite without changing meaning**: e.g. "Although it rained, we played." → "It rained but we still played."
- **Punctuating a sentence**: add capitals, commas, quotation marks and end marks.
- **Completing proverbs/idioms**: e.g. "A stitch in time saves nine"; "Look before you leap."

#### 5. Building Better Sentences
- Join short sentences with conjunctions: and, but, because, although, since, while.
- *Weak*: The dog barked. The thief ran away.
- *Strong*: The dog barked loudly, so the frightened thief ran away.
    `,
    flashcards: [
      { front: "What is a synonym?", back: "A word that has the same or similar meaning to another word (e.g. happy and glad).", topic: "Vocabulary" },
      { front: "Define the term 'antonym'.", back: "A word that means the opposite of another word (e.g. hot and cold).", topic: "Vocabulary" },
      { front: "When do we use formal letters?", back: "For official business, applications, or writing to people in authority.", topic: "Writing" },
      { front: "What is the past tense of 'go', 'eat' and 'write'?", back: "went, ate, wrote — they are irregular verbs.", topic: "Tenses" },
      { front: "When do we use 'between' and when do we use 'among'?", back: "'Between' for two things; 'among' for three or more.", topic: "Grammar" },
      { front: "What is the plural of 'child', 'foot' and 'sheep'?", back: "children, feet, sheep (irregular plurals).", topic: "Spelling" },
      { front: "How does direct speech change to indirect speech?", back: "Remove quotation marks, shift tense back (present → past), and change pronouns and time words.", topic: "Writing" },
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
      },
      {
        id: "e3",
        question: "Choose the correct verb: The herd of cattle ___ grazing by the river.",
        options: ["A. were", "B. are", "C. is", "D. have"],
        answer: "C",
        explanation: "'Herd' is a collective noun treated as singular, so it takes 'is'."
      },
      {
        id: "e4",
        question: "What is the past tense of the verb 'write'?",
        options: ["A. writed", "B. wrote", "C. written", "D. writes"],
        answer: "B",
        explanation: "'Write' is irregular: write → wrote (past) → written (past participle)."
      },
      {
        id: "e5",
        question: "Choose the correct preposition: The meeting will start ___ 8 o'clock.",
        options: ["A. on", "B. in", "C. at", "D. by"],
        answer: "C",
        explanation: "Use 'at' for exact clock times: at 8 o'clock."
      },
      {
        id: "e6",
        question: "What is the plural of 'baby'?",
        options: ["A. babys", "B. babyes", "C. babies", "D. babie"],
        answer: "C",
        explanation: "Words ending in consonant + y change y to -ies: baby → babies."
      },
      {
        id: "e7",
        question: "Which sentence is punctuated correctly?",
        options: ["A. she said \"we are late\"", "B. She said, \"We are late.\"", "C. She said we are late.\"", "D. she said, We are late."],
        answer: "B",
        explanation: "Direct speech needs a capital letter, a comma before the quote, quotation marks, and end punctuation inside the quotes."
      },
      {
        id: "e8",
        question: "Choose the synonym of 'rapid':",
        options: ["A. slow", "B. quick", "C. lazy", "D. careful"],
        answer: "B",
        explanation: "'Rapid' and 'quick' both mean fast."
      },
      {
        id: "e9",
        question: "The teacher shared the sweets ___ the forty pupils.",
        options: ["A. between", "B. among", "C. besides", "D. within"],
        answer: "B",
        explanation: "Use 'among' for three or more people; 'between' is only for two."
      },
      {
        id: "e10",
        question: "Complete the proverb: A stitch in time saves ___.",
        options: ["A. money", "B. cloth", "C. nine", "D. time"],
        answer: "C",
        explanation: "The proverb is 'A stitch in time saves nine' — fixing a problem early prevents bigger problems."
      },
      {
        id: "e11",
        question: "Choose the sentence in the future tense:",
        options: ["A. Rudo walks to school.", "B. Rudo walked to school.", "C. Rudo will walk to school.", "D. Rudo is walking to school."],
        answer: "C",
        explanation: "'Will + verb' shows the future tense."
      },
      {
        id: "e12",
        question: "What does the apostrophe show in the phrase 'Chipo's book'?",
        options: ["A. A contraction", "B. A plural", "C. Possession", "D. A question"],
        answer: "C",
        explanation: "The apostrophe + s shows the book belongs to Chipo (possession)."
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
      },
      {
        id: "ep2_3",
        question: "Change the following sentence into indirect (reported) speech: Tariro said, \"We are going to the fields today.\"",
        sampleAnswer: "Tariro said that they were going to the fields that day.",
        keywords: ["that they were", "were going", "that day", "they"],
        explanation: "In reported speech: remove quotation marks, 'we are' becomes 'they were', and 'today' becomes 'that day'."
      },
      {
        id: "ep2_4",
        question: "Join the two sentences using a suitable conjunction: It was raining heavily. The pupils arrived at school on time.",
        sampleAnswer: "Although it was raining heavily, the pupils arrived at school on time.",
        keywords: ["although", "but", "despite", "on time"],
        explanation: "A contrast conjunction such as 'although' or 'but' joins two ideas that pull in opposite directions."
      },
      {
        id: "ep2_5",
        question: "Punctuate the following sentence correctly: my uncle visited harare bulawayo and mutare last december",
        sampleAnswer: "My uncle visited Harare, Bulawayo and Mutare last December.",
        keywords: ["My", "Harare", "Bulawayo", "Mutare", "December", "comma", "full stop"],
        explanation: "Capital letters for the start of the sentence, place names and the month; commas between list items; a full stop at the end."
      },
      {
        id: "ep2_6",
        question: "GUIDED COMPOSITION (specimen style): You have been selected as the Head Boy or Head Girl of your school. Write the acceptance speech you would give at assembly, between 80 and 120 words. Use these notes: thank the teachers and learners for trusting you; promise to maintain discipline; lead by example; work as a team with the prefects; ask for everyone's co-operation.",
        sampleAnswer: "Good morning teachers and fellow learners. I would like to thank you all for trusting me with this important position. I promise to maintain discipline in our school and to lead by example in everything I do. I will work hand in hand with the prefects as a team so that our school runs smoothly. I kindly ask for co-operation from every learner and teacher. Together we can make our school the best in the district. Thank you.",
        keywords: ["thank", "discipline", "example", "team", "prefects", "co-operation", "cooperation"],
        explanation: "A full-mark answer covers ALL the given notes, stays within 80-120 words, opens with a greeting, and closes politely. This is the exact task style from ZIMSEC Paper 2 Section A."
      }
    ]
  },
  "Social Science": {
    readingMaterial: `
### ZIMSEC GRADE 7 SOCIAL SCIENCE CORE SUMMARY

Please see the Paper 1 and Paper 2 guides for full exam preparation.
    `,
    readingMaterialPaper1: `
### ZIMSEC GRADE 7 SOCIAL SCIENCE: PAPER 1 (MULTIPLE CHOICE PREP)

**Official exam format (7050/1)**: 40 multiple-choice questions, 1 hour 45 minutes. The real paper mixes history, geography, citizenship, family/community life, culture and health — including picture-based questions (e.g. identifying customs, ceremonies and instruments from photographs).

#### 1. Pre-Colonial Empires of Zimbabwe
- **Great Zimbabwe**: A powerful Shona (Karanga) pre-colonial kingdom known for its magnificent dry-stone walls built without mortar. It was a trade centre dealing in gold, ivory, and cattle, trading with Swahili and Portuguese merchants on the Indian Ocean coast.
- **The Mutapa State**: Founded by Nyatsimba Mutota after the decline of Great Zimbabwe; controlled gold trade along the Zambezi.
- **The Ndebele State**: Established by Mzilikazi in the 1830s after migrating from Zululand. Lobengula succeeded Mzilikazi and ruled during the period of European colonisation. The capital was at Bulawayo.

#### 2. Colonisation & Liberation
- **Colonisation**: The British South Africa Company (BSAC) led by Cecil John Rhodes occupied Mashonaland in 1890 (the Pioneer Column).
- **First Chimurenga / Umvukela (1896-1897)**: Armed resistance against colonial rule inspired by spirit mediums like Mbuya Nehanda and Sekuru Kaguvi.
- **Second Chimurenga**: The liberation struggle of the 1960s-70s that led to Zimbabwe's Independence on **18 April 1980**.

#### 3. Symbols, Citizenship & Government
- **Zimbabwe Bird**: A national emblem found at Great Zimbabwe representing heritage, authority, and national identity.
- **Flag colours**: Green (agriculture/vegetation), Yellow (mineral wealth), Red (blood shed in the liberation struggle), Black (the majority people), White (peace).
- **The Constitution** is the supreme law. Government has three arms: the **Executive** (President and Cabinet), the **Legislature** (Parliament — makes laws), and the **Judiciary** (courts — interpret laws).
- **Rights and responsibilities**: every child has a right to education, health and protection — and the responsibility to respect others, obey just laws and care for the environment.

#### 4. Map Work & Geography of Zimbabwe
- The four **cardinal points** are North, South, East, West (NEWS on the compass).
- Zimbabwe is **landlocked**, bordered by Zambia (north), Mozambique (east), South Africa (south) and Botswana (west).
- Zimbabwe has **10 provinces**. Harare is the capital city; Bulawayo is the second largest city.
- Major rivers: the **Zambezi** (north, home of Victoria Falls and Kariba Dam) and the **Limpopo** (south).

#### 5. Natural Resources & The Economy
- Minerals: gold, platinum, diamonds, coal (Hwange), chrome.
- Tourism sites: Victoria Falls (Mosi-oa-Tunya), Great Zimbabwe ruins, Hwange National Park, Matobo Hills.
- Conservation: resources must be used sustainably so future generations also benefit.

#### 6. Family, Community & Culture (Heavily Tested!)
The specimen paper opens with family and community questions:
- **Family types**: nuclear (parents + children), extended (includes grandparents, aunts, cousins), **polygamous** (a man with more than one wife), **monogamous** (one husband, one wife), single-parent and **child-headed** families.
- **Respect customs (inhlonipho/kuremekedza)**: kneeling or bowing when greeting elders, greeting first, helping elders carry loads.
- **Culture**: the **drum (ingoma/ngoma)** is the indigenous instrument used at ceremonies; traditional ceremonial drinks are prepared from **sorghum** (soaked, germinated, dried, mixed and fermented).
- **Health basics** also appear: brush teeth regularly for strong healthy teeth; wash hands to prevent disease.

#### 7. International Cooperation
- **SADC**: Southern African Development Community — coordinates trade, peace, and economic cooperation among Southern African countries.
- **African Union (AU)**: unites all African countries for peace and development.
- **United Nations (UN)**: world body that promotes peace, human rights and development.
    `,
    readingMaterialPaper2: `
### ZIMSEC GRADE 7 SOCIAL SCIENCE: PAPER 2 (STRUCTURED PREP)

In Paper 2, answer in full sentences and give the exact number of points asked for.

#### 1. The Role of Spirit Mediums in the First Chimurenga (Common Question)
- Spirit mediums like **Mbuya Nehanda** and **Sekuru Kaguvi**:
  1. **United** different Shona and Ndebele communities behind one cause.
  2. **Inspired** and encouraged fighters, assuring them of ancestral support.
  3. Provided **spiritual guidance** and communication networks for the resistance.
- Mbuya Nehanda's famous words before her execution: "My bones will rise again" — prophesying the Second Chimurenga.

#### 2. Why Great Zimbabwe Declined
Possible reasons historians give:
1. **Overpopulation** exhausted the land, firewood and pastures.
2. **Decline in the gold trade** as gold near the surface ran out.
3. **Drought and famine** weakened the state.
4. Trade routes **shifted north** to the Mutapa state on the Zambezi.

#### 3. Purposes of SADC (Common Question)
1. To promote **economic cooperation and integration** among member states.
2. To coordinate **regional trade** and development projects.
3. To maintain **regional peace and security**.
4. To share resources and infrastructure (e.g. electricity grids, transport corridors).

#### 4. Rights & Responsibilities of a Child
- **Rights**: education, health care, shelter, protection from abuse and child labour, a name and nationality.
- **Responsibilities**: attending school, respecting parents/elders and others' rights, obeying just laws, protecting the environment, helping with reasonable family chores.
- Be ready to explain that every right carries a matching responsibility.

#### 5. Importance of National Symbols
- Symbols (flag, anthem, Zimbabwe Bird, coat of arms) **unite citizens**, build **national identity and pride**, and **honour the country's history** and those who sacrificed for freedom.
- Respect for the flag and anthem is a mark of good citizenship.

#### 6. Conserving Natural Resources
- Why conserve? Resources are limited; future generations need them; tourism and jobs depend on them.
- How? Anti-poaching laws, reforestation, recycling, avoiding veld fires, sustainable mining and fishing.
    `,
    flashcards: [
      { front: "Name the pre-colonial kingdom known for its magnificent stone architecture in Zimbabwe.", back: "Great Zimbabwe (built by the Shona / Karanga empire).", topic: "History" },
      { front: "What are the national colors of the Zimbabwe Flag?", back: "Green, Yellow, Red, Black, and White.", topic: "Citizenship" },
      { front: "Which body coordinates regional trade and cooperation in Southern Africa?", back: "SADC (Southern African Development Community).", topic: "International Bodies" },
      { front: "When did Zimbabwe gain independence?", back: "18 April 1980.", topic: "History" },
      { front: "Name the four countries that border Zimbabwe.", back: "Zambia (north), Mozambique (east), South Africa (south), Botswana (west).", topic: "Geography" },
      { front: "What are the three arms of government?", back: "Executive (President & Cabinet), Legislature (Parliament), Judiciary (courts).", topic: "Citizenship" },
      { front: "Who founded the Ndebele state and who succeeded him?", back: "Mzilikazi founded it in the 1830s; his son Lobengula succeeded him.", topic: "History" },
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
        question: "Who was the last king of the Ndebele state, ruling when the BSAC colonised Mashonaland in 1890?",
        options: ["A. King Shaka", "B. King Lobengula", "C. King Mzilikazi", "D. Emperor Mutota"],
        answer: "B",
        explanation: "King Lobengula was the last Ndebele king (son of Mzilikazi). He ruled during colonisation in 1890 and died in 1894 — the 1896 First Chimurenga was then led by spirit mediums like Mbuya Nehanda."
      },
      {
        id: "ss3",
        question: "On what date did Zimbabwe gain independence?",
        options: ["A. 18 April 1980", "B. 25 May 1975", "C. 18 April 1990", "D. 11 November 1965"],
        answer: "A",
        explanation: "Zimbabwe became independent on 18 April 1980 after the Second Chimurenga."
      },
      {
        id: "ss4",
        question: "Which country borders Zimbabwe to the NORTH?",
        options: ["A. South Africa", "B. Botswana", "C. Zambia", "D. Mozambique"],
        answer: "C",
        explanation: "Zambia lies north of Zimbabwe across the Zambezi River; South Africa is south, Botswana west, Mozambique east."
      },
      {
        id: "ss5",
        question: "What does the green colour on the Zimbabwean flag represent?",
        options: ["A. Mineral wealth", "B. The blood of liberation heroes", "C. Agriculture and vegetation", "D. Peace"],
        answer: "C",
        explanation: "Green stands for agriculture and vegetation; yellow for minerals, red for the liberation struggle, black for the majority people, white for peace."
      },
      {
        id: "ss6",
        question: "Which arm of government is responsible for MAKING laws?",
        options: ["A. The Judiciary", "B. The Legislature (Parliament)", "C. The Executive", "D. The Police"],
        answer: "B",
        explanation: "Parliament (the Legislature) makes laws; the Executive implements them and the Judiciary interprets them."
      },
      {
        id: "ss7",
        question: "Great Zimbabwe grew rich mainly through trade in:",
        options: ["A. Oil and gas", "B. Gold and ivory", "C. Cars and machinery", "D. Cotton and paper"],
        answer: "B",
        explanation: "Great Zimbabwe controlled the gold and ivory trade with Swahili merchants on the Indian Ocean coast."
      },
      {
        id: "ss8",
        question: "Who led the Pioneer Column that occupied Mashonaland in 1890?",
        options: ["A. David Livingstone", "B. The British South Africa Company of Cecil John Rhodes", "C. The Portuguese", "D. King Mzilikazi"],
        answer: "B",
        explanation: "The BSAC, formed by Cecil John Rhodes, organised the Pioneer Column which occupied Mashonaland in 1890."
      },
      {
        id: "ss9",
        question: "Victoria Falls is found on which river?",
        options: ["A. Limpopo", "B. Save", "C. Zambezi", "D. Mazowe"],
        answer: "C",
        explanation: "Victoria Falls (Mosi-oa-Tunya) is on the Zambezi River between Zimbabwe and Zambia."
      },
      {
        id: "ss10",
        question: "Which of the following is a RIGHT of every child?",
        options: ["A. Driving a car", "B. Education", "C. Voting in elections", "D. Owning a business"],
        answer: "B",
        explanation: "Every child has the right to education, health and protection; voting and driving come with adulthood."
      },
      {
        id: "ss11",
        question: "Which spirit medium is famous for the words 'My bones will rise again'?",
        options: ["A. Sekuru Kaguvi", "B. Mbuya Nehanda", "C. Lobengula", "D. Nyatsimba Mutota"],
        answer: "B",
        explanation: "Mbuya Nehanda said her bones would rise again — a prophecy linked to the Second Chimurenga."
      },
      {
        id: "ss12",
        question: "How many provinces does Zimbabwe have?",
        options: ["A. 8", "B. 9", "C. 10", "D. 12"],
        answer: "C",
        explanation: "Zimbabwe is divided into 10 provinces, including Harare and Bulawayo metropolitan provinces."
      },
      {
        id: "ss13",
        question: "A family with more than one wife is called a:",
        options: ["A. nuclear family", "B. polygamous family", "C. child-headed family", "D. monogamous family"],
        answer: "B",
        explanation: "Polygamous = a man married to more than one wife; monogamous = one husband and one wife. (Question style from the ZIMSEC specimen paper.)"
      },
      {
        id: "ss14",
        question: "Which relationship represents a member of the EXTENDED family?",
        options: ["A. grandmother", "B. mother", "C. father", "D. brother"],
        answer: "A",
        explanation: "Mother, father and brother belong to the nuclear family; a grandmother belongs to the extended family. (From the ZIMSEC specimen paper.)"
      },
      {
        id: "ss15",
        question: "In Zimbabwe, which indigenous instrument is used during traditional ceremonies?",
        options: ["A. flute", "B. guitar", "C. drum", "D. piano"],
        answer: "C",
        explanation: "The drum (ingoma/ngoma) is the indigenous instrument that leads traditional ceremonies. (From the ZIMSEC specimen paper.)"
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
      },
      {
        id: "ssp2_3",
        question: "Give two possible reasons why the Great Zimbabwe state declined.",
        sampleAnswer: "1. Overpopulation exhausted the land, pastures and firewood. 2. The gold trade declined as surface gold ran out, and trade shifted north to the Mutapa state. Drought and famine also weakened the state.",
        keywords: ["overpopulation", "gold", "trade", "drought", "famine", "pastures", "decline"],
        explanation: "Historians point to resource exhaustion, declining gold trade, drought, and shifting trade routes as causes of the decline."
      },
      {
        id: "ssp2_4",
        question: "State two rights of a child and two responsibilities that go with them.",
        sampleAnswer: "Rights: the right to education and the right to health care. Responsibilities: attending school and studying hard; keeping clean and helping care for the home environment. Children must also respect others and obey just laws.",
        keywords: ["education", "health", "respect", "school", "responsibility", "obey", "protect"],
        explanation: "Every right pairs with a responsibility — e.g. the right to education carries the responsibility to attend school and work hard."
      },
      {
        id: "ssp2_5",
        question: "Explain two reasons why national symbols such as the flag and the national anthem are important to Zimbabwe.",
        sampleAnswer: "1. They unite citizens and build national identity and pride. 2. They honour the country's history and the sacrifices made during the liberation struggle.",
        keywords: ["unite", "identity", "pride", "history", "honour", "liberation"],
        explanation: "National symbols build unity and pride, and remind citizens of the nation's heritage and the price of freedom."
      }
    ]
  },
  "Ndebele Language": {
    readingMaterial: `
### ISINDEBELE GRADE 7 CORE SUMMARY

Bona izihloko zePaper 1 lePaper 2 ukuze ulungiselele imihloliso.
    `,
    readingMaterialPaper1: `
### ISINDEBELE GRADE 7: IPHEPHA 1 (7060/1)

**Official exam format**: Iphepha 1 liqala ngendatshana yokuzwisisa (a comprehension passage) elandelwa yimibuzo yokukhetha (multiple choice), 1 hour 30 minutes. Bala indatshana KABILI ungakaphenduli — read the passage TWICE before answering. Impendulo zitholakala endatshaneni (the answers are found in the passage).

#### 1. Ukufunda Lokuqedisisa (Comprehension Practice)
Bala le ndatshana (read this practice passage, written in the style of the real exam):

*Izihlahla ziqakathekile kakhulu empilweni yabantu lezinyamazana. Izinyanga zesiNtu zisebenzisa izimpande, amaxolo kanye lamahlamvu ukulungisa imithi yelapha imikhuhlane. Izihlahla zisipha umoya omuhle esiwuphefumulayo, ziyikudla kwabantu lezinyamazana, njalo izinyoni zakhela izidleke zazo kuzo. Kufanele sihlanyele izihlahla ezintsha ukubuyisela lezo eziganyuliweyo.*

**English summary (to help you understand)**: Trees are very important to people and animals. Traditional healers use roots, bark and leaves to make medicine that cures diseases. Trees give us clean air to breathe, provide food for people and animals, and birds build their nests in them. We must plant new trees to replace those that have been cut down.

**Amabala aqakathekileyo (key vocabulary)**: izimpande = roots | amaxolo = bark | amahlamvu = leaves | imikhuhlane = diseases | izidleke = nests | ukuhlanyela = to plant | ukuganyulwa = to be cut down | izinyanga = traditional healers | imvelo = nature/environment

#### 2. Izaga (Proverbs)
Izaga zinhlamvu zenhlakanipho yabadala — proverbs carry the wisdom of the elders. Funda lezi (learn these):
- *"Inja yomoya ayibambi."* (literally: "a dog of the wind catches nothing")
  — Umuntu oguquguqukayo kazuzi lutho. **English**: A person who lacks focus and keeps changing direction will not succeed.
- *"Isikhuni sibuya lomlotha."* (literally: "the firebrand comes back with ashes")
  — Okubi okwenzileyo kuzabuyela kuwe. **English**: Your bad deeds will come back to you.
- *"Indlela ibuzwa kwabaphambili."* (literally: "the way is asked from those ahead")
  — Ulwazi luvela kwabadala. **English**: Ask those with experience; learn from your elders.
- *"Inkunzi isematholeni."* (literally: "the bull is among the calves")
  — Abakhokheli bakusasa ngabantwana balamuhla. **English**: Future leaders are today's children.
- *"Akusoka lingelasici."* (literally: "there is no bachelor without a flaw")
  — Kakho umuntu opheleleyo. **English**: Nobody is perfect.
- *"Umntwana ongakhaliyo ufela embelekweni."* (literally: "the child who does not cry dies on its mother's back")
  — Ongakhulumiyo kazuzi sizo. **English**: If you do not speak up and ask, you will not get help.

#### 3. Izitsho (Idioms)
- *Ukuthwala ilanga* (literally: "to carry the sun") — ukulinda isikhathi eside. **English**: to wait a very long time.
- *Ukubamba inhliziyo* (literally: "to hold the heart") — ukubekezela. **English**: to be patient / to endure.
- *Ukudla imali* (literally: "to eat money") — ukuchitha imali. **English**: to spend money wastefully.

#### 4. Uhlelo: Izigaba Zamabizo (Noun Classes) & Izivumelwano (Subject Concords)
Each noun class has its own prefix and matching verb concord — like "he runs / they run" in English:
- **Isigaba 1 (um-/aba-)**: umfana (boy) → abafana (boys); umuntu (person) → abantu (people). Isivumelwano: **u-** / **ba-**
  (Umfana **u**gijima = The boy runs. Abafana **ba**gijima = The boys run.)
- **Isigaba 3 (um-/imi-)**: umuthi (tree/medicine) → imithi; umfula (river) → imifula. Isivumelwano: **u-** / **i-**
- **Isigaba 5 (i-/ama-)**: ilizwe (country) → amazwe; ibhuku (book) → amabhuku. Isivumelwano: **li-** / **a-**
- **Isigaba 7 (isi-/izi-)**: isihlahla (tree/bush) → izihlahla; isikolo (school) → izikolo. Isivumelwano: **si-** / **zi-**
- **Isigaba 9 (in-/izin-)**: inja (dog) → izinja; inkomo (cow) → izinkomo. Isivumelwano: **i-** / **zi-**

#### 5. Ukubingelela (Greetings) & Inhlonipho (Respect)
- Ekuseni (in the morning): *Livukile?* (Have you woken well?) / Emini (in the day): *Litshonile?* (Have you spent the day well?)
- Kumuntu omdala sithi **Salibonani** (to an elder we say "Salibonani" — the respectful plural greeting), hatshi "Sawubona".
- Inhlonipho (respect): speak politely to elders, greet first, and use the plural form (ubuningi) when addressing an older person.

#### 6. Imisindo Lemibhalo (Spelling & Sounds)
- Ama-click sounds: **c** (njengaku "cela" — to ask), **q** (njengaku "qela"), **x** (njengaku "xoxa" — to chat).
- Subject prefixes attach to the verb: *ngi-* (I), *si-* (we), *ba-* (they) — ngiyafunda (I am learning), siyafunda (we are learning), bayafunda (they are learning).
    `,
    readingMaterialPaper2: `
### ISINDEBELE GRADE 7: PAPER 2 (IMIBUZO EMIDE / STRUCTURED QUESTIONS)

KuPaper 2 phendula ngemitsho egcweleyo, ubhale kuhle, uchaze ngokupheleleyo.
(In Paper 2, answer in full sentences, write neatly, and explain completely.)

#### 1. Ukuchaza Izaga (Explaining Proverbs)
Nxa uchaza isaga (when explaining a proverb):
1. Bhala isaga ngokupheleleyo. (Write the proverb in full.)
2. Chaza umqondo waso ngamazwi akho. (Explain its deeper meaning in your own words — not the literal words.)
3. Nika isibonelo sempilo lapho isaga esisebenza khona. (Give a real-life example where the proverb applies.)
- *Isibonelo (example)*: "Inja yomoya ayibambi" — umuntu ontshintshantshintsha imisebenzi noma izifundo kazukuphumelela; kufanele sigxile entweni eyodwa.
  **English**: A person who keeps switching jobs or studies will not succeed; we must focus on one thing.

#### 2. Ukubhala Indaba (Composition Writing)
- **Isingeniso (introduction)**: yethula indaba ngendlela ekhangayo — open with a sentence that grabs attention.
- **Umzimba (body)**: izigaba ezi-2 kuze kube 3 — 2 to 3 paragraphs, each with ONE main idea.
- **Isiphetho (conclusion)**: phetha indaba — finish the story properly; never leave it hanging.
- Sebenzisa izaga lezitsho ukucecisa indaba yakho — decorate your composition with proverbs and idioms; markers reward this with high marks.

#### 3. Ukubhala Incwadi (Letter Writing)
- **Incwadi yobungane (friendly/informal letter)** — to a friend or relative: ikheli lakho lodwa (your address only), ukubingelela okukhululekileyo (a relaxed greeting, e.g. "Mngane wami Sipho" — My friend Sipho), lesiphetho esifudumeleyo (a warm closing: "Owakho ozithobayo / Umngane wakho" — Yours humbly / Your friend).
- **Incwadi esemthethweni (formal letter)** — to a headmaster or official: amakheli amabili (two addresses), isihloko (a subject line), ulimi oluhloniphayo (respectful language), lesiphetho esisemthethweni (a formal closing).

#### 4. Izivumelwano Ezenzweni (Subject-Verb Agreement Practice)
Singular → plural; watch how the concord on the verb changes:
- Umfana **u**dlala ebaleni. → Abafana **ba**dlala ebaleni. (The boy plays on the field → The boys play on the field.)
- Isihlahla **si**khulile. → Izihlahla **zi**khulile. (The tree has grown → The trees have grown.)
- Inkomo **i**sedlelweni. → Izinkomo **zi**sedlelweni. (The cow is in the pasture → The cows are in the pasture.)
- Ilizwe **li**yathuthuka. → Amazwe **a**yathuthuka. (The country is developing → The countries are developing.)

#### 5. Ubuningi (Plurals Practice)
umfana (boy) → abafana | umuthi (tree) → imithi | ilizwe (country) → amazwe | isikolo (school) → izikolo | inja (dog) → izinja | uluthi (stick) → izinti
    `,
    flashcards: [
      { front: "Explain the proverb: 'Isaga sithi: Inja yomoya ayibambi.' (A dog of the wind catches nothing.)", back: "A person who lacks focus or changes direction constantly will not succeed. (Umuntu oguquguqukayo kazuzi lutho.)", topic: "Izaga leZitsho" },
      { front: "What is 'ukubingelela' in Ndebele?", back: "Greetings — e.g. Salibonani (respectful hello), Linjani? (How are you?).", topic: "Culture" },
      { front: "Sitshoni isaga esithi 'Indlela ibuzwa kwabaphambili'? (The way is asked from those ahead.)", back: "Ulwazi luvela kwabadala — ask those with experience; learn from elders.", topic: "Izaga leZitsho" },
      { front: "Ubuningi bika 'umfana', 'isihlahla' le 'inja'? (Plural of boy, tree, dog?)", back: "abafana (boys), izihlahla (trees), izinja (dogs).", topic: "Uhlelo" },
      { front: "Sitshoni isitsho esithi 'ukubamba inhliziyo'? (Idiom: to hold the heart.)", back: "Ukubekezela — to be patient or endure hardship.", topic: "Izaga leZitsho" },
      { front: "Sitshoni isaga esithi 'Inkunzi isematholeni'? (The bull is among the calves.)", back: "Abakhokheli bakusasa ngabantwana balamuhla — future leaders are today's children.", topic: "Izaga leZitsho" },
    ],
    quiz: [
      {
        id: "nd1",
        question: "Gwalisa isikhala (Fill in the gap): Umfana ___ enkundleni. (The boy ___ on the playground.)",
        options: ["A. ugijima", "B. bagijima", "C. sigijima", "D. kugijima"],
        answer: "A",
        explanation: "'Umfana' (boy) belongs to noun class 1, which uses the subject concord 'u-': Umfana ugijima = The boy runs."
      },
      {
        id: "nd2",
        question: "Gwalisa isikhala (Fill in the gap): Abafana ___ enkundleni. (The boys ___ on the playground.)",
        options: ["A. ugijima", "B. bagijima", "C. ligijima", "D. zigijima"],
        answer: "B",
        explanation: "The plural of class 1 (aba-) takes the concord 'ba-': Abafana bagijima = The boys run."
      },
      {
        id: "nd3",
        question: "Ubuningi bebizo elithi 'isihlahla' ngu: (What is the plural of 'isihlahla' — tree?)",
        options: ["A. amahlahla", "B. izihlahla", "C. imihlahla", "D. abahlahla"],
        answer: "B",
        explanation: "Class 7 nouns change isi- to izi- in the plural: isihlahla (tree) → izihlahla (trees)."
      },
      {
        id: "nd4",
        question: "Isaga esithi 'Isikhuni sibuya lomlotha' sitshoni? (What does this proverb mean?)",
        options: ["A. Umlilo uyatshisa", "B. Okubi okwenzileyo kuzabuyela kuwe", "C. Inkuni zinhle", "D. Umlotha uyasiza"],
        answer: "B",
        explanation: "Literally 'the firebrand returns with ashes' — your bad deeds come back to you. Option B says exactly that: the wrong you have done will return to you."
      },
      {
        id: "nd5",
        question: "Isaga esithi 'Indlela ibuzwa kwabaphambili' sifundisa ukuthi: (What does this proverb teach?)",
        options: ["A. Indlela inde kakhulu", "B. Asibuzeni kwabadala abalolwazi", "C. Abaphambili bayaphambanisa", "D. Indlela kayibuzwa"],
        answer: "B",
        explanation: "Literally 'the way is asked from those ahead' — learn from elders and those with experience. Option B: let us ask the knowledgeable elders."
      },
      {
        id: "nd6",
        question: "Isitsho esithi 'ukubamba inhliziyo' sitshoni? (What does the idiom 'to hold the heart' mean?)",
        options: ["A. Ukugula", "B. Ukubekezela", "C. Ukugijima", "D. Ukuthukuthela"],
        answer: "B",
        explanation: "'Ukubamba inhliziyo' means ukubekezela — to be patient and endure hardship (not to be sick, run, or get angry)."
      },
      {
        id: "nd7",
        question: "Khetha umtsho oqondileyo: (Choose the grammatically correct sentence — 'The cows are in the pasture.')",
        options: ["A. Izinkomo isedlelweni.", "B. Izinkomo zisedlelweni.", "C. Izinkomo lisedlelweni.", "D. Izinkomo usedlelweni."],
        answer: "B",
        explanation: "The plural class 9 prefix (izin-) takes the concord 'zi-': Izinkomo zisedlelweni = The cows are in the pasture."
      },
      {
        id: "nd8",
        question: "Ubuningi bebizo elithi 'ilizwe' ngu: (What is the plural of 'ilizwe' — country?)",
        options: ["A. amazwe", "B. izizwe", "C. imizwe", "D. ilizwana"],
        answer: "A",
        explanation: "Class 5 nouns change i(li)- to ama- in the plural: ilizwe (country) → amazwe (countries)."
      },
      {
        id: "nd9",
        question: "Nxa ubingelela umuntu omdala ekuseni uthi: (How do you respectfully greet an elder in the morning?)",
        options: ["A. Uphi?", "B. Hamba!", "C. Salibonani, livukile?", "D. Yebo wena."],
        answer: "C",
        explanation: "Respect (inhlonipho) requires the plural greeting 'Salibonani, livukile?' (Greetings, have you woken well?) when addressing an elder."
      },
      {
        id: "nd10",
        question: "Isaga esithi 'Akusoka lingelasici' sitshoni? (What does this proverb mean?)",
        options: ["A. Amasoka manengi", "B. Kakho umuntu opheleleyo", "C. Isici sihle", "D. Amasoka alezici wonke amabi"],
        answer: "B",
        explanation: "Literally 'there is no bachelor without a flaw' — nobody is perfect. Option B: there is no perfect person."
      },
      {
        id: "nd11",
        question: "Bala (read): 'Izinyanga zisebenzisa izimpande, amaxolo kanye lamahlamvu ukulungisa imithi.' Izinyanga zisebenzisa izingxenye ezingaki zezihlahla? (How many tree parts do the healers use?)",
        options: ["A. ezimbili", "B. ezintathu", "C. ezine", "D. eyodwa"],
        answer: "B",
        explanation: "Three parts are named: izimpande (roots), amaxolo (bark), lamahlamvu (leaves) — ezintathu. This counting style is used in the real ZIMSEC comprehension paper."
      },
      {
        id: "nd12",
        question: "Bala (read): 'Izinyoni zakhela izidleke zazo ezihlahleni.' Ibala elithi 'izidleke' litshoni? (What does 'izidleke' mean?)",
        options: ["A. nests", "B. branches", "C. feathers", "D. eggs"],
        answer: "A",
        explanation: "Izidleke = nests. The sentence says birds build their nests in trees. Vocabulary-in-context questions like this appear in the real paper."
      },
      {
        id: "nd13",
        question: "Kungani kufanele sihlanyele izihlahla ezintsha? (According to the reading passage, why must we plant new trees?)",
        options: ["A. Ukuthengisa inkuni", "B. Ukubuyisela lezo eziganyuliweyo", "C. Ukwakha izindlu", "D. Ukudlala kuzo"],
        answer: "B",
        explanation: "The passage says we plant new trees 'ukubuyisela lezo eziganyuliweyo' — to replace those that have been cut down."
      },
      {
        id: "nd14",
        question: "Ngubani owelapha imikhuhlane ngemithi yesiNtu? (Who heals diseases using traditional medicine?)",
        options: ["A. izinyoni", "B. izinyamazana", "C. izinyanga", "D. abafana"],
        answer: "C",
        explanation: "Izinyanga (traditional healers) prepare traditional medicines — not birds (izinyoni), animals (izinyamazana) or boys (abafana)."
      }
    ],
    paper2: [
      {
        id: "ndp2_1",
        question: "Chaza ukuthi litsho ukuthini leli saga: 'Inja yomoya ayibambi.' (Explain what this proverb means — 'A dog of the wind catches nothing.')",
        sampleAnswer: "Litho ukuthi umuntu oguquguqukayo noma ongenelisi ukuhlala endaweni eyodwa noma ukugxila entweni eyodwa kasoze aphumelele. (It means a person who keeps changing direction and cannot focus on one thing will never succeed.)",
        keywords: ["uguquguqukayo", "kasoze", "aphumelele", "gxila", "focus", "succeed"],
        explanation: "The proverb teaches focus: a dog chasing the wind catches nothing, just like a person who keeps switching goals achieves nothing. Stick to one thing to succeed."
      },
      {
        id: "ndp2_2",
        question: "Chaza isaga esithi 'Umntwana ongakhaliyo ufela embelekweni', unike isibonelo sempilo lapho esisebenza khona. (Explain the proverb 'The child who does not cry dies on its mother's back', and give a real-life example.)",
        sampleAnswer: "Litsho ukuthi umuntu ongaceli usizo noma ongakhulumiyo ngohlupho lwakhe kazukusizwa. Isibonelo: umfundi ongabuzi nxa engazwisisi esikolo uzasala emuva ezifundweni. (It means a person who does not speak up or ask for help will not be helped. Example: a learner who never asks questions when confused falls behind in class.)",
        keywords: ["usizo", "ongakhulumiyo", "cela", "buza", "kazukusizwa", "khuluma", "help", "speak"],
        explanation: "A mother only knows the baby needs something when it cries. The proverb encourages speaking up and asking for help — those who stay silent are not helped."
      },
      {
        id: "ndp2_3",
        question: "Bhala imitsho le ebuningini (Rewrite these sentences in the plural): (a) Umfana udlala ebaleni. (The boy plays outside.) (b) Isihlahla sikhulile. (The tree has grown.) (c) Inkomo isedlelweni. (The cow is in the pasture.)",
        sampleAnswer: "(a) Abafana badlala ebaleni. (b) Izihlahla zikhulile. (c) Izinkomo zisedlelweni. (The boys play outside. The trees have grown. The cows are in the pasture.)",
        keywords: ["abafana", "badlala", "izihlahla", "zikhulile", "izinkomo", "zisedlelweni"],
        explanation: "Change the noun to its plural form, then change the verb concord to match: u- → ba- (class 1), si- → zi- (class 7), i- → zi- (class 9)."
      },
      {
        id: "ndp2_4",
        question: "Chaza umehluko phakathi kwencwadi yobungane lencwadi esemthethweni. (Explain the difference between a friendly letter and a formal letter.)",
        sampleAnswer: "Incwadi yobungane ilekheli elilodwa, ukubingelela okukhululekileyo, lolimi olukhululekileyo. Incwadi esemthethweni ilamakheli amabili, isihloko, ulimi oluhloniphayo, lesiphetho esisemthethweni. (A friendly letter has one address, a relaxed greeting and casual language. A formal letter has two addresses, a subject line, respectful language and a formal closing.)",
        keywords: ["ikheli", "amakheli amabili", "isihloko", "hlonipha", "khululekile", "address", "subject"],
        explanation: "The difference lies in the addresses (one vs two), the language (casual vs respectful), and the subject line (only formal letters have one)."
      }
    ]
  },
  "Family & Religious Studies (FRS)": {
    readingMaterial: `
### FAMILY & RELIGIOUS STUDIES (FRS) GRADE 7 SUMMARY

Please see the Paper 1 and Paper 2 guides for full exam preparation.
    `,
    readingMaterialPaper1: `
### FAMILY & RELIGIOUS STUDIES (FRS) GRADE 7: PAPER 1 (MULTIPLE CHOICE PREP)

**Syllabus note**: the FAREME syllabus also covers Judaism and Hinduism basics, conflict resolution and peace-making, and health/decision-making (including HIV and AIDS awareness). Religion questions also appear inside the Social Science paper (e.g. baptism, rainmaking ceremonies).

#### 1. Ubuntu / Unhu (Humanity & Ethics)
- **Unhu/Ubuntu** is an indigenous ethical framework emphasising community solidarity, respect for elders, moral uprightness, and kindness. Core philosophy: **"I am because we are."**
- Values under Unhu: honesty, hospitality, hard work, sharing, respect, empathy, and responsibility.

#### 2. The Family
- **Nuclear family**: parents and their children.
- **Extended family**: includes grandparents, aunts, uncles and cousins — the traditional African family model that provides support and passes on values.
- **Roles**: parents provide, protect and guide; children respect, learn and help with chores; grandparents pass on wisdom, history and culture.

#### 3. Major Religions in Zimbabwe
- **Indigenous Religion (ATR)**: Belief in God (**Mwari/Musikavanhu/uNkulunkulu**), respect for ancestors (**Vadzimu/Amadlozi**) as intermediaries, sacred places (Matobo Hills, Great Zimbabwe), and ceremonies like rainmaking (mukwerera).
- **Christianity**: Belief in Jesus Christ; holy book is the **Bible**; worship on Sunday in church; key teachings include the Ten Commandments and loving your neighbour.
- **Islam**: Belief in **Allah** and His Prophet **Muhammad**; holy book is the **Qur'an**; worship in a **mosque** on Friday; guided by the **Five Pillars** (faith, prayer 5 times daily, charity/zakat, fasting in Ramadan, pilgrimage to Mecca).
- **Judaism**: Belief in one God; holy book is the **Torah**; worship in a **synagogue** on the Sabbath (Saturday).

#### 4. Rites of Passage
Stages that mark a person's journey through life in many cultures:
1. **Birth** — naming ceremonies welcome the child into the family.
2. **Initiation/adolescence** — teaching of adult responsibilities and values.
3. **Marriage** — joins two families, involving lobola/roora (bride wealth) in Zimbabwean culture.
4. **Death** — funeral and memorial rites honour the departed and comfort the family.

#### 5. Moral Values & Good Citizenship
- Tolerance and respect for people of **different religions** keep communities peaceful.
- Honesty, faithfulness, kindness, and obedience to just laws are taught by ALL major religions.
- **Gender equality**: boys and girls deserve equal opportunities in education, work and leadership.
- Children's rights (education, protection, health) come with duties (respect, helping at home, studying).
    `,
    readingMaterialPaper2: `
### FAMILY & RELIGIOUS STUDIES (FRS) GRADE 7: PAPER 2 (STRUCTURED PREP)

Answer in full sentences. Where a question says "explain", give the point PLUS a reason or example.

#### 1. The Importance of Unhu/Ubuntu (Common Question)
- It teaches **respect** for others and for elders.
- It promotes **sharing and helping the needy** (e.g. Zunde raMambo / isiphala senkosi — the chief's granary for orphans and the poor).
- It builds **community solidarity and peace** — "I am because we are."
- It guides good behaviour: an individual's actions reflect on the whole family and village.

#### 2. Comparing Religions (Common Question)
Be able to complete a comparison like this:
| Feature | Indigenous Religion | Christianity | Islam |
|---|---|---|---|
| Name of God | Mwari / uNkulunkulu | God / Trinity | Allah |
| Holy book | (oral traditions) | Bible | Qur'an |
| Place of worship | sacred shrines/hills | church | mosque |
| Day of worship | ceremonies as needed | Sunday | Friday |
- **Similarities**: belief in a Supreme Being, prayer, moral codes (honesty, no stealing), care for the needy.

#### 3. Why We Respect Other Religions
1. The Constitution gives everyone **freedom of worship**.
2. Tolerance prevents **conflict** and builds peace in the community.
3. All religions teach **good morals**, so they deserve equal respect.

#### 4. Roles of Family Members (Common Question)
- **Parents**: provide food, shelter, clothing, school fees; guide and discipline children with love.
- **Children**: respect and obey parents, help with chores, study hard.
- **Grandparents/elders**: teach culture, history, values and folktales (ngano/inganekwane).
- The extended family supports orphans and members in difficulty — an expression of Unhu.

#### 5. Rites of Passage Explained
- **Naming ceremony**: the child receives a name with meaning, welcoming them into the family and community.
- **Marriage (lobola/roora)**: not "buying a wife" — it is a token of appreciation that joins TWO FAMILIES and shows commitment.
- **Funerals**: the community gathers to comfort the bereaved, share food and remember the departed — nobody mourns alone where Unhu lives.
    `,
    flashcards: [
      { front: "What does the concept 'Unhu' or 'Ubuntu' teach?", back: "Humanity, respect, community sharing, and moral values ('I am because we are').", topic: "Indigenous Religion" },
      { front: "What is the sacred writing of Christianity?", back: "The Bible.", topic: "Christianity" },
      { front: "What is the sacred writing of Islam?", back: "The Qur'an.", topic: "Islam" },
      { front: "Name the Five Pillars of Islam.", back: "Faith (Shahada), Prayer 5 times daily, Charity (Zakat), Fasting in Ramadan, Pilgrimage to Mecca (Hajj).", topic: "Islam" },
      { front: "What is the difference between a nuclear and an extended family?", back: "Nuclear = parents and children only; extended includes grandparents, aunts, uncles and cousins.", topic: "Family" },
      { front: "Name the four main rites of passage.", back: "Birth (naming), initiation/adolescence, marriage, and death (funeral rites).", topic: "Rites of Passage" },
      { front: "What is 'Zunde raMambo' / 'isiphala senkosi'?", back: "The chief's communal granary used to feed orphans and the needy — an example of Ubuntu in action.", topic: "Indigenous Religion" },
    ],
    quiz: [
      {
        id: "fr1",
        question: "Which of the following is a core moral value in FAREME/FRS?",
        options: ["A. Selfishness", "B. Dishonesty", "C. Tolerance and respect", "D. Greed"],
        answer: "C",
        explanation: "Tolerance and respect are basic moral values taught in FRS to foster peaceful co-existence."
      },
      {
        id: "fr2",
        question: "The philosophy 'I am because we are' belongs to:",
        options: ["A. Unhu/Ubuntu", "B. Mathematics", "C. Capitalism", "D. Tourism"],
        answer: "A",
        explanation: "Unhu/Ubuntu teaches that a person exists through their community — 'I am because we are.'"
      },
      {
        id: "fr3",
        question: "What is the holy book of Islam?",
        options: ["A. The Bible", "B. The Torah", "C. The Qur'an", "D. The Vedas"],
        answer: "C",
        explanation: "Muslims follow the Qur'an, revealed to the Prophet Muhammad."
      },
      {
        id: "fr4",
        question: "In Indigenous Religion, ancestors (Vadzimu/Amadlozi) are believed to:",
        options: ["A. Be forgotten after burial", "B. Act as intermediaries between the living and God", "C. Live in the mosque", "D. Write holy books"],
        answer: "B",
        explanation: "Ancestors are respected as go-betweens linking the family to Mwari/uNkulunkulu."
      },
      {
        id: "fr5",
        question: "Muslims worship in a ___ and Christians worship in a ___.",
        options: ["A. church / mosque", "B. synagogue / shrine", "C. mosque / church", "D. temple / synagogue"],
        answer: "C",
        explanation: "Muslims gather in a mosque (especially on Friday); Christians worship in a church (mainly on Sunday)."
      },
      {
        id: "fr6",
        question: "A family made up of parents, children, grandparents, aunts and cousins is called:",
        options: ["A. A nuclear family", "B. An extended family", "C. A single-parent family", "D. A foster family"],
        answer: "B",
        explanation: "The extended family includes relatives beyond parents and children — the traditional African family model."
      },
      {
        id: "fr7",
        question: "Lobola/roora in Zimbabwean culture is best described as:",
        options: ["A. Buying a wife", "B. A token of appreciation that joins two families", "C. A government tax", "D. A church offering"],
        answer: "B",
        explanation: "Lobola is a token of appreciation and commitment that creates a bond between two families — not a purchase."
      },
      {
        id: "fr8",
        question: "Which rite of passage welcomes a new baby into the family?",
        options: ["A. Marriage", "B. Initiation", "C. The naming ceremony", "D. Graduation"],
        answer: "C",
        explanation: "A naming ceremony gives the child a meaningful name and welcomes them into the family and community."
      },
      {
        id: "fr9",
        question: "Why should we respect people of other religions?",
        options: ["A. Because all religions teach good morals and the Constitution allows freedom of worship", "B. Because they will pay us", "C. Because their religions are wrong", "D. We should not respect them"],
        answer: "A",
        explanation: "Freedom of worship is a constitutional right, and tolerance keeps communities peaceful."
      },
      {
        id: "fr10",
        question: "'Zunde raMambo' (isiphala senkosi) is an example of:",
        options: ["A. Selfishness", "B. Ubuntu — caring for orphans and the needy as a community", "C. A sport", "D. A type of dance"],
        answer: "B",
        explanation: "The chief's granary fed orphans and the poor — community care in action, showing Ubuntu/Unhu."
      }
    ],
    paper2: [
      {
        id: "frp2_1",
        question: "Explain the importance of the concept of 'Unhu' or 'Ubuntu' in Zimbabwean communities.",
        sampleAnswer: "It teaches respect for others, community sharing, solidarity, good morals, and helping the needy. It promotes peaceful living.",
        keywords: ["respect", "community", "sharing", "morals", "peaceful", "unhu", "ubuntu", "solidarity"],
        explanation: "Unhu promotes communal cohesion, moral responsibility, and mutual respect among community members."
      },
      {
        id: "frp2_2",
        question: "State two similarities between Indigenous Religion, Christianity and Islam.",
        sampleAnswer: "1. All believe in a Supreme Being (Mwari/God/Allah). 2. All teach good morals such as honesty and helping the needy, and all practise prayer.",
        keywords: ["supreme being", "god", "prayer", "morals", "honesty", "helping"],
        explanation: "Despite different practices, the three religions share belief in a Supreme Being, prayer, and moral teachings."
      },
      {
        id: "frp2_3",
        question: "Describe the role of parents and the role of children in a family.",
        sampleAnswer: "Parents provide food, shelter, clothing and school fees, and guide and protect their children. Children respect and obey their parents, help with chores, and work hard at school.",
        keywords: ["provide", "protect", "guide", "respect", "obey", "chores", "school"],
        explanation: "Parents are providers and guides; children owe respect, obedience and help — each role supports the family."
      },
      {
        id: "frp2_4",
        question: "Explain what lobola/roora is and why it is NOT the same as buying a wife.",
        sampleAnswer: "Lobola is a token of appreciation given by the groom's family to the bride's family. It joins the two families together and shows commitment and respect — it is not a payment for property, because a wife remains a person with full rights.",
        keywords: ["token", "appreciation", "families", "commitment", "respect", "not buying"],
        explanation: "Lobola creates a relationship between two families and honours the bride's family; it does not transfer ownership."
      },
      {
        id: "frp2_5",
        question: "Give two reasons why funerals are important rites of passage in Zimbabwean culture.",
        sampleAnswer: "1. They allow the community to comfort and support the bereaved family — nobody mourns alone. 2. They honour and remember the departed person and mark their passage from the living to the ancestors.",
        keywords: ["comfort", "support", "community", "honour", "remember", "ancestors", "bereaved"],
        explanation: "Funeral rites express Ubuntu by supporting the bereaved and honouring the departed."
      }
    ]
  }
};
