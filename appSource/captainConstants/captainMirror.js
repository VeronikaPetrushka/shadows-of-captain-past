const captainMirror = [
    {
        topic: 'Harbor or Storm',
        situation: 'For the second night, the storm doesn’t subside. The sails are torn, the crew is exhausted. The map shows a safe harbor — a slow but secure route. The expedition’s goal will be delayed. Time is your enemy.',
        question: '👉 What kind of captain comes to your mind in this moment?',
        move: [
            {
                option: 'Strategist',
                meaning: 'thinks about long-term consequences'
            },
            {
                option: 'Empathetic Leader',
                meaning: 'cares about the well-being of the crew'
            },
            {
                option: 'Rebel',
                meaning: 'charges ahead through the storm, ignoring the risks'
            }
        ],
        image: require('../pastAssets/captainMirror/HarbororStorm.png'),
        finalQuestion: '📝 Describe how you would act in this situation and why.'
    },
    {
        topic: 'The Shadow of Mutiny',
        situation: 'One of the officers openly questions your decisions in front of the crew. He proposes an alternative route. Many of the crew members support him. The decision is to suppress the mutiny or attempt to negotiate.',
        question: '👉 What kind of captain do you see in the reflection?',
        move: [
            {
                option: 'Strategist',
                meaning: 'remains calm and collected'
            },
            {
                option: 'Empathetic Leader',
                meaning: 'seeks dialogue to keep the crew united'
            },
            {
                option: 'Rebel',
                meaning: 'demonstrates strength quickly and decisively'
            }
        ],
        image: require('../pastAssets/captainMirror/Mutiny.png'),
        finalQuestion: '📝 How would you handle this situation?'
    },
    {
        topic: 'The Price of Choice',
        situation: 'In an unfamiliar port, you are offered gold in exchange for some of your supplies. It will speed up the mission, but there is a risk of running out of food on the return journey',
        question: '👉 Who do you become in this moment?',
        move: [
            {
                option: 'Strategist',
                meaning: 'weighs every chance carefully'
            },
            {
                option: 'Empathetic Leader',
                meaning: ' thinks about the future of the crew'
            },
            {
                option: 'Rebel',
                meaning: 'takes a risk, relying on luck'
            }
        ],
        image: require('../pastAssets/captainMirror/PriceofChoice.png'),
        finalQuestion: '📝 Describe your decision and why you made it.'
    },
    {
        topic: 'The Cost of Salvation',
        situation: 'You receive a distress signal from another ship. If you turn to help, you risk losing everything — time, resources, and people. If you ignore it, those who called for help might perish.',
        question: '👉 Which type of captain emerges in you?',
        move: [
            {
                option: 'Strategist',
                meaning: 'acts based on the mission'
            },
            {
                option: 'Empathetic Leader',
                meaning: 'throws caution to the wind and rescues them'
            },
            {
                option: 'Rebel',
                meaning: 'breaks protocol in the name of justice'
            }
        ],
        image: require('../pastAssets/captainMirror/CostofSalvation.png'),
        finalQuestion: '📝 How would you act? What would drive your decision?'
    },
    {
        topic: 'The Burden of Secrets',
        situation: 'You’ve learned that the cargo you’re carrying isn’t what’s listed in the documents. It’s dangerous. The crew knows nothing. If you tell them, panic will likely ensue. If you keep it secret, you risk trust.',
        question: '👉 What kind of captain lies within you?',
        move: [
            {
                option: 'Strategist',
                meaning: 'looks for a solution between fear and order'
            },
            {
                option: 'Empathetic Leader',
                meaning: 'tells the truth, even if it hurts'
            },
            {
                option: 'Rebel',
                meaning: 'acts suddenly, going against the system'
            }
        ],
        image: require('../pastAssets/captainMirror/BurdenofSecrets.png'),
        finalQuestion: '📝 How would you act? What would your reflection in the mirror say?'
    }
];

export default captainMirror;