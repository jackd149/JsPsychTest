// Initialize jsPsych with offline storage (existing project provides jsPsychOfflineStorage)
const jsPsych = jsPsychOfflineStorage.initJsPsychOffline({
  display_element: 'jspsych-target'
})

const beeHtml = `<img src="img/Bee.png" alt="Bee" style="width:120px; height:120px; object-fit:contain;">`;
const grassHtml = `<img src="img/Grass.png" alt="Grass" style="width:120px; height:120px; object-fit:contain;">`;
const oakTreeHtml = `<img src="img/OakTree.png" alt="Oak Tree" style="width:120px; height:120px; object-fit:contain;">`;
const kangarooHtml = `<img src="img/Kangaroo.png" alt="Kangaroo" style="width:120px; height:120px; object-fit:contain;">`;
const NatureFarHtml = `<img src="img/NatureFar.png" alt="Nature Far" style="width:200px; height:120px; object-fit:contain;">`;
const NatureMiddleHtml = `<img src="img/NatureMiddle.png" alt="Nature Middle" style="width:200px; height:120px; object-fit:contain;">`;
const NatureCloseHtml = `<img src="img/NatureClose.png" alt="Nature Close" style="width:200px; height:120px; object-fit:contain;">`;

var timeline = [];

//warmup 1 trial
// things that change for square left vs right
const square_left = {
    stimulus: "https://raw.githubusercontent.com/efosterhanson/CHS_stims/main/ProjectSprouts/warmup_intro_trial1_c1.m4v",
    id_left: "triangle",
    id_right: "square"
};
const square_right = {
    stimulus: "https://raw.githubusercontent.com/efosterhanson/CHS_stims/main/ProjectSprouts/warmup_intro_trial1_c2.m4v",
    id_left: "square",
    id_right: "triangle"
};

// randomly select square left vs right
const rand_square_selection = jsPsych.randomization.sampleWithoutReplacement([square_left, square_right], 1)[0];

// print the selection for easier testing!
console.log('left: ', rand_square_selection.id_left);

// use your variable wherever things are randomly selected
const warmup_trial_intro = {
    type: jsPsychVideoHotspots,
    stimulus: rand_square_selection.stimulus,
    hotspots: [{
            id: rand_square_selection.id_left,
            x: 100,
            y: 150,
            width: 325,
            height: 325,
        },
        {
            id: rand_square_selection.id_right,
            x: 600,
            y: 150,
            width: 325,
            height: 325,
        }
    ],
    hotspot_highlight_css: 'background-color: rgba(255, 0, 0, 0.3); border: 2px solid red;'
};

//https://github.com/efosterhanson/CHS_stims/blob/main/ProjectSprouts/warm_up_1_redo.mp4

const square_left_redo = {
    // stimulus: "https://raw.githubusercontent.com/efosterhanson/CHS_stims/main/ProjectSprouts/warm_up_1_redo.m4v",
    stimulus: "https://raw.githubusercontent.com/efosterhanson/CHS_stims/main/ProjectSprouts/Adobe%20Express%20-%20ProjectSprouts_warm_up_1_redo.mp4",
    
    id_left: "triangle",
    id_right: "square"
};
const square_right_redo = {
    stimulus: "https://raw.githubusercontent.com/efosterhanson/CHS_stims/main/Adobe%20Express%20-%20ProjectSprouts_warm_up_2_redo.mp4",
    id_left: "square",
    id_right: "triangle"
};

const rand_square_redo_selection = jsPsych.randomization.sampleWithoutReplacement([square_left_redo, square_right_redo], 1)[0];


const warmup_trial_intro_redo = {
    type: jsPsychVideoHotspots,
    stimulus: rand_square_redo_selection.stimulus,
    hotspots: [{
            id: rand_square_redo_selection.id_left,
            x: 100,
            y: 150,
            width: 325,
            height: 325,
        },
        {
            id: rand_square_redo_selection.id_right,
            x: 600,
            y: 150,
            width: 325,
            height: 325,
        }
    ],
    hotspot_highlight_css: 'background-color: rgba(255, 0, 0, 0.3); border: 2px solid red;'
};

const warmup_trial_intro_conditional = {
    timeline: [warmup_trial_intro_redo],
    conditional_function: function() {
        const last_response = jsPsych.data.get().last(1).values()[0].response;

        if (last_response === "triangle") {
            return false; // correct, skip repeat
        } else {
            return true; // wrong, play it one more time
        }
    }
};

timeline.push(warmup_trial_intro);
timeline.push(warmup_trial_intro_conditional);

const howOld = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <h1>How old are you?</h1>
    <p>Please select your age from the options below:</p>
  `,
  choices: ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
}
timeline.push(howOld);

const welcome = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <h1>Let's Play a Guessing Game!</h1>
  `,
  choices: ['Start']
};
timeline.push(welcome);


const sarca = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <p>There's this Stuff called <b>sarca</b>, lots of things have <b>sarca</b> inside.</p>
    <img src="img/Rose.png" alt="Rose" />
    <p>Some roses have <b>sarca</b> inside.</p>
    <p>Which other thing do you think also has <b>sarca</b> inside?</p>
  `,
  choices: [beeHtml, grassHtml],
  button_html: function(choice) {
    return `<button class="jspsych-btn" style="width:140px;height:140px;border:none;background:transparent;padding:0">${choice}</button>`;
  }
};
timeline.push(sarca);

const glorp = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <h1>Glorp</h1>
    <p>There's a disease called <b>glorp</b>. Lots of things can get <b>glorp</b>.</p>
    <img src="img/Squirrel.png" alt="Squirrel" />
    <p>Right now some squirrels have <b>glorp</b>.</p>
    <p>Which other thing do you think might also have <b>glorp</b>?</p>
  `,
  choices: [oakTreeHtml, kangarooHtml],
  button_html: function(choice) {
    return `<button class="jspsych-btn" style="width:140px;height:140px;border:none;background:transparent;padding:0">${choice}</button>`;
  }
};
timeline.push(glorp);

const feelAboutNature = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <p>Which Picture shows how you feel about nature?</p>
  `,
  choices: [NatureFarHtml, NatureMiddleHtml, NatureCloseHtml],
  button_html: function(choice) {
    return `<button class="jspsych-btn" style="width:220px;height:140px;border:none;background:transparent;padding:0">${choice}</button>`;
  }
};
timeline.push(feelAboutNature);

const treeQuestions = {
  type: jsPsychHtmlButtonResponse,

  stimulus: `
    <h1>Tree Questions</h1>
    <p>Answer the following questions about trees:</p>
  `,
  choices: ['Next']
}
timeline.push(treeQuestions);

const neverHtml = `
  <svg width="60" height="60" viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="25" fill="white" stroke="black" stroke-width="3"/>
  </svg>
  <p style="margin:5px 0 0 0;">Never</p>`;

const sometimesHtml = `
  <svg width="60" height="60" viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="25" fill="white" stroke="black" stroke-width="3"/>
    <path d="M30,5 A25,25 0 0,0 30,55 Z" fill="black"/>
  </svg>
  <p style="margin:5px 0 0 0;">Sometimes</p>`;

const alotHtml = `
  <svg width="60" height="60" viewBox="0 0 60 60">
    <circle cx="30" cy="30" r="25" fill="black" stroke="black" stroke-width="3"/>
  </svg>
  <p style="margin:5px 0 0 0;">A lot</p>`;

const questions = [
  "Do trees have thoughts?",
  "Do trees have feelings?",
  "Can trees be grateful?",
  "Do trees listen?",
  "Do trees talk to people?",
  "Do trees move all by themselves?",
  "Should people protect trees so there are more of them on Earth?",
  "Are trees more important than people?",
  "How much do you spend time in nature?",
  "How much do you read books or watch shows about nature?"
];

const questionTrials = jsPsych.randomization.shuffle(questions).map(q => ({
  type: jsPsychHtmlButtonResponse,
  stimulus: `<p>${q}</p>`,
  choices: [neverHtml, sometimesHtml, alotHtml],
  button_html: function(choice) {
    return `<button class="jspsych-btn" style="width:100px;height:100px;border:none;background:transparent;padding:0;text-align:center;">${choice}</button>`;
  },
  data: { question: q }
}));

questionTrials.forEach(t => timeline.push(t));

const completion = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <h1>Thank You!</h1>
  `,
  choices: ['Finish']
};
timeline.push(completion);

jsPsych.run(timeline);