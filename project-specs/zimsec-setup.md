# ZIMSEC Grade 7 Gamified Exam Prep Vault

## Project Metadata
- **Project Name**: ZIMSEC Grade 7 Gamified Exam Prep Vault
- **Target Audience**:
  - **Student Profile**: Highly intelligent, easily distracted by digital screens, final year primary school
  - **Curriculum Target**: ZIMSEC Grade 7 Heritage-Based Curriculum
  - **Exam Horizon Months**: 3
- **Architecture Stack**:
  - **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion
  - **Backend & Database**: Convex (Reactive, Real-Time Mutation Engine)
  - **AI Inference**: Groq AI (Ultra-low latency LLaMA-3 Engine)

## Core Features Matrix

### Feature 1: Gamified Timetable Scheduler
- **Status**: Active
- **Mechanics**: Automated daily subject pairing to balance high-intensity problem solving with theory heavy reading.
- **Rotation Logic**:
  - **Monday**: Mathematics, Agriculture, Science & Technology
  - **Tuesday**: English Language, Social Science
  - **Wednesday**: Ndebele Language, Family & Religious Studies (FRS)
  - **Thursday**: Mathematics, Agriculture, Science & Technology
  - **Friday**: Rest/Reward Night (Conditional on perfect Mon-Thu tracking)
- **Daily Session Blocks**:
  - **Block 1**: 35 minutes
  - **Intermission**: 10 minutes
  - **Block 2**: 30 minutes
  - **Active Recall Teach-Back**: 15 minutes

### Feature 2: Verified Content Pipeline
- **Status**: Active
- **Data Sources**:
  - Official ZIMSEC Syllabi datasets
  - Historical ZIMSEC Grade 7 Green Books (2020-2025 past papers)
  - Verified Ndebele Literature matrices (Izaga leZitsho)
- **Groq AI Procedural Generation**:
  - **Low Mastery Threshold (< 60%)**: Interactive Flashcards for conceptual foundations
  - **High Mastery Threshold (>= 60%)**: Timed Multiple-Choice or Structured Past Paper Challenges
  - **Performance Target**: Sub-1-second token parsing response

### Feature 3: Anti-Cheat Time Verification
- **Status**: Active
- **Active Tab Monitoring**: Freezes countdown timers instantly if the student unfocuses the tab or navigates away.
- **Micro-Milestones**:
  - **Interval**: Every 10 minutes
  - **Action**: Triggers an unskippable single-question pop-up checkpoint based on active reading text to validate student attention.

### Feature 4: Token Economy and Rewards
- **Status**: Active
- **Currency Unit**: Screen Tokens (Convertible directly into digital screen time)
- **Reward Tier Rules**:
  - **Daily Quest Completion**: Mints 1 Token (Worth 60 minutes of validated phone activity)
  - **Weekly Perfect Streak**: Unlocks unconditional Friday night phone access + custom parent incentive
  - **Achievement Medals**:
    - `math_marauder`: Clear 5 consecutive math papers above 80%
    - `science_scholar`: Complete all Agri-Sci flashcard blocks flawlessly

### Feature 5: Parent Gated Verification
- **Status**: Active
- **UI Behavior**: Locks the student application console immediately upon quest completion.
- **Verification Actions**:
  - Displays real-time analytics, metrics, and earned medals to the guardian
  - Requires a secure 4-digit PIN bypass or remote database mutation via Convex to unlock phone privileges
  - Triggers remote webhook notification alerts via the real-time pipeline to the parent's device

## Database Schema Blueprint
### tables
1. `users`
   - `name`: string
   - `currentLevel`: number
   - `lifetimeMedals`: number
   - `screenTimeBalanceMinutes`: number
2. `verifiedMaterials`
   - `subject`: string
   - `topic`: string
   - `rawContent`: string
   - `difficulty`: string
3. `dailyQuests`
   - `userId`: id(users)
   - `date`: string
   - `subject`: string
   - `taskType`: string (FLASHCARDS | QUIZ)
   - `questions`: any (JSON array mapping fields dynamically parsed by Groq AI)
   - `isCompleted`: boolean
   - `isVerifiedByParent`: boolean

## System Design & UX Parameters
- **Visual Theme**: Gaming Dashboard (Dark mode background with highly saturated neon accent state transitions)
- **Motion Design**: Smooth progressive loading states, spinning 3D medals modeled with Framer Motion, micro-interactions for button actions to maintain high user dopamine engagement.
