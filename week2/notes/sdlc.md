# SDLC = Software Development LifeCycle

Process for plannning, creating, testing, and displaying information systems.

## General Steps
1. Requirements Phase
    - Existing system is evaluated so that the existing flaws can be determined
    - Performed by Business Analysts (BAs)
    - Could be as simple as saying "The current flaw is that it doesn't exist"
        - Move on to outline what is needed
2. Analysis Phase
    - The new system requirements are defined. In particular, deficiencies are addressed with proposal for improvement
    - BAs + Senior members of the dev team
3. Design Phase
    - The proposed system is actually designed
    - No coding is done yet, the product features are planned out
    - Architects and Senior Devs
4. Development Phase
    - Software is built
    - Code for the product is actually written
    - Junior & Senior Devs, etc
5. Testing Phase
    - Software is tested to ensure it functions as intended
    - Devs & Testers
6. Deployment and Maintenance Phase
    - Product is delivered/deployed to the customer
    - Maintenance is rigorously kept up
    - Operations Team / DevOps Engineers / SREs

This is a high-level description of what steps we take during the SDLC. The specific details will often vary, depending on which implementation you use to follow the SDLC.

## Waterfall Method

The idea is the you completely finish one phase of the SDLC before moving onto the next.
It is a traditional way of following the SDLC.
You do not return to any previous phase at any point (until the cycle is complete)

- Progress is seen as only going "downwards"
- Best suited for smaller, short term projects or where project requirements do not change
    - Such as Government Projects
- Generally considered not as efficient money-wise
    - If you do have changes in requirements, due to the long delay before restarting the cycle
        it results in large inefficienies
    - Requirements DO change all the time, it is basically impossible to stop
- Cannot go back up the waterfall
    - Considered inflexible
- The benefits are that you get a full outline of the plan before you start
    - This can really help in terms of organization

## Agile Method

- Another method for following the SDLC
- An approach to software development based on iterative development where requirements and solutions evolve through the collaboration of cross-functional teams
- Agile is more of a mentalitty or a philosophy
    - It is not "a thing that you do", but more of a mindset or an approach to software development
    - You follow certain core principles, but many implementation details are very flexible
- Four core values to Agile (From Agile Manifesto)
    1. Individuals and Interactions over processes and tools
    2. Working software over comprehensive documentation
        - We are not "abandoning documentation"
        - Documentation is still incredibly important
    3. Customer Collaboration over contract negotiation
        - Involve customer throughout the development process
        - Remember, requirements will constantly change
        - Sometimes, requirements may not even be fully considered
    4. Responding to change over following a plan
        - Requirements will change, inevitably

- There are Agile methods (often called Agile frameworks), which are comprehensive approaches to the SDLC
    - "Scrum" is the most common/popular Agile framework
        - Not the only one
        - (SAFe = Scaled Agile Framework)
- Agile practices that are closely tied to the concept of DevOps
    - AKA DevOps practices
    - CI/CD/CD or abbreviated as just CI/CD
    - Continuous Integration (CI)
        - The idea or process (or practice) of continuously merging multiple developer's code (usually in a repository) *frequently*
        - This should be MULTIPLE times a day. It is meant to prevent large errors from accumulating
            - The sooner you find them, the sooner they will be fixed
        - Does this just mean to push your code frequently?
            - No
            - You need to MERGE your code with other's code FREQUENTLY
            - Make Pull Requests, review them, and merge them in, and have others pull those updates (or rebase)
            - MULTIPLE TIMES A DAY
            - A key factor here is communication
    - Continuous Delivery (CD)
        - We want to automate several steps of our workflow process so that they occur every time you push to a repository
        - Each push results in testing, building, code quality analysis, further testing (like performance)
        - But it is not released to the customer
        - Instead, it is "prepared" to be released, so that it can be released at "the push of a button"
            - The biggest reason is consistency
        - Generally, we have a big "release day"
    - Continuous Deployment (CD)
        - Every change that passes all stages of the product "pipeline" (various tests, quality checks, etc) is released to the customer immediately
        - There is no "release day"
        - In particular, there is no downtime of the application as the new version is released
        - This is particularly valuable because it speeds up feedback from the customer
        - Think of Continuous Deployment as an extension of Continuous Delivery
            -  We are still performing all of what we did for Continuous Delivery
            - We further automate that "button press"
        - Generally, this requires a fair bit of monitoring and automation around what the versions the server will be running, etc
        - Every time you merge code into the main branch, that change will be released to the customer as soon as it finishes
            going through the pipeline

## Agile Scrum Methodology
- In a "Scrum", the project is divided into what are called "sprints"
- Sprint
    - A specified timeline (generally 2 weeks, but could be 1 - 4 weeks)
    - Timeline is agreed upon during a "Sprint Planning Meeting"
- User Story
    - Informal, natural language sentence/description of one or more features
    - It is usually written from the perspective a user
        - "As a User, when on the login page, I can enter a valid username and password, and be redirected to my profile page"
    - These are agreed upon and split during the Sprint Planning Meeting
- Epic
    - A large body or collection of user stories that can be broken down further

### Roles
- Scrum Master
    - Facilitator for the Scrum dev team
    - Clarifies questions and organize the team and focuses on the return on investment
- Product Owner
    - Usually it is the client and they will act as the point contact for their client company
    - Prioritize the product backlog and when the scrum team should finish and release
- Scrum Dev Team: Devs & Testers & QA
    - This is the team that decides "effort estimation" to complete a product backlog item
        - How much time or just general effort a certain task will take
        - Defined in some measurable fashion, like with numbers
    - Often uses "User Story Points" or just "Story Points" to describe the amount of effort for a user story
        - Many systems follow the Fibonacci Sequence for Story Point values
- Scrum Team
    - Product Owner + BAs + Devs + QA + Scrum Master
    - Recommended size is 5 - 9

### Artifacts
- Product Backlog
    - This is a repository where all of the items that product owner wants to accomplish are kept
    - Trello, Asana, JIRA, GitHub Projects, etc
        - Some Kanban Board
- Sprint Backlog
    - A subset of the product backlog that contains the items to be completed during the current sprint
- Burndown Chart (Burnup Chart)
    - Graph/Chart that shows how many user stories (or story points) that are left to be completed during the sprint
        - Burnup chart would be how many are completed so far
    - Often these are used to calculate what we call "velocity" for a sprint
        - Number of story points completed per day/sprint on average

### Meetings
- Sprint Planning Meeting
    - Plan for what you will accomplish during that sprint
    - Can be several hours in some cases
- Daily Standup Meeting
    - Short meeting (like 15 minutes at most) that happens once a day
    - You talk about what you did yesterday, what you plan to do today, and if you have any "blockers"
        - A particular person or group who you are waiting on
    - Generally led by the Scrum Master
    - Called "Standup meeting" because generally you stand up for it
- Sprint Review Meeting
    - Happens at the end of a sprint
    - You basically showcase the features/tasks that were accomplished during the sprint
    - Decide if the product is complete or if it needs more work
    - Your Project 3 Showcase will effectively be a Sprint Review Meeting
- Sprint Retrospective Meeting
    - Discuss Lessons learned
    - The Scrum team mets and talks about what went well, and what went poorly
    - What can be done to improve?
    - What did you learn?
    - etc

Note: We try to keep meetings as short as we possibly can
But often consistent and frequent communication is very valuable