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

        return last_response === "triangle";
    }
};

timeline.push(warmup_trial_intro);
timeline.push(warmup_trial_intro_conditional);

const warmup_trial_correct = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div class="great-job-screen">
      <div class="fireworks-placeholder">🎆</div>
    </div>

    <audio id="great-job-audio" src="https://raw.githubusercontent.com/efosterhanson/CHS_stims/main/ProjectSprouts/warmup_trial_correct_audio.mp3"></audio>
  `,
  choices: [],
  trial_duration: null,

  on_load: function() {
    const audio = document.getElementById("great-job-audio");

    audio.play();

    audio.addEventListener("ended", function() {
      jsPsych.finishTrial();
    });
  }
};
timeline.push(warmup_trial_correct);

const eco_reason_trans = {
  type: jsPsychVideoButtonResponse,
  stimulus: ["https://raw.githubusercontent.com/efosterhanson/CHS_stims/main/ProjectSprouts/eco_reason_trans_video.mp4"],
  choices: [],
  trial_ends_after_video: true,
};
timeline.push(eco_reason_trans);

const howOld = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <h1>First, how old are you?</h1>
    <p>Click on your age!</p>
  `,
  choices: ['3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
}
timeline.push(howOld);

const sarca_rose_ant_1 = {
    stimulus: "https://raw.githubusercontent.com/efosterhanson/CHS_stims/main/ProjectSprouts/ind_sarca_vb_c1_ver_f.mp4",
    id_left: "ant",
    id_right: "grass"
};
const sarca_rose_ant_2 = {
    stimulus: "https://raw.githubusercontent.com/efosterhanson/CHS_stims/main/ProjectSprouts/ind_sarca_vb_c2_ver_f.mp4",
    id_left: "grass",
    id_right: "ant"
};

// randomly select ant to be on left or right
const rand_sarca_rose_ant_selection = jsPsych.randomization.sampleWithoutReplacement([sarca_rose_ant_1, sarca_rose_ant_2], 1)[0];

const sarca_rose_bee_1 = {
    stimulus: "https://raw.githubusercontent.com/efosterhanson/CHS_stims/main/ProjectSprouts/ind_sarca_vb_c1.m4v",
    id_left: "bee",
    id_right: "grass"
};
const sarca_rose_bee_2 = {
    stimulus: "https://raw.githubusercontent.com/efosterhanson/CHS_stims/main/ProjectSprouts/ind_sarca_vb_c2.m4v",
    id_left: "grass",
    id_right: "bee"
};

// randomly select ant to be on left or right
const rand_sarca_rose_bee_selection = jsPsych.randomization.sampleWithoutReplacement([sarca_rose_bee_1, sarca_rose_bee_2], 1)[0];

// randomly select ant or bee
const rand_sarca_rose_selection = jsPsych.randomization.sampleWithoutReplacement([rand_sarca_rose_ant_selection, rand_sarca_rose_bee_selection], 1)[0];

// Using rose_bee for now, need ant assets still
// use your variable wherever things are randomly selected
const sarca = {
    type: jsPsychVideoHotspots,
    stimulus: rand_sarca_rose_bee_selection.stimulus,
    hotspots: [{
            id: rand_sarca_rose_bee_selection.id_left,
            x: 80,
            y: 200,
            width: 325,
            height: 325,
        },
        {
            id: rand_sarca_rose_bee_selection.id_right,
            x: 600,
            y: 200,
            width: 325,
            height: 325,
        }
    ],
    hotspot_highlight_css: 'background-color: rgba(255, 0, 0, 0.3); border: 2px solid red;'
};
timeline.push(sarca);

// Need to change video to use glorp instead of kaki
const glorp_squirrel_1 = {
    stimulus: "https://raw.githubusercontent.com/efosterhanson/CHS_stims/main/ProjectSprouts/ind_kaki_vb_c1_video.m4v",
    id_left: "oak tree",
    id_right: "kangaroo"
};
const glorp_squirrel_2 = {
    stimulus: "https://raw.githubusercontent.com/efosterhanson/CHS_stims/main/ProjectSprouts/ind_kaki_vb_c2_video.m4v",
    id_left: "kangaroo",
    id_right: "oak tree"
};

const rand_glorp_squirrel_selection = jsPsych.randomization.sampleWithoutReplacement([glorp_squirrel_1, glorp_squirrel_2], 1)[0];

const glorp = {
    type: jsPsychVideoHotspots,
    stimulus: rand_glorp_squirrel_selection.stimulus,
    hotspots: [{
            id: rand_glorp_squirrel_selection.id_left,
            x: 80,
            y: 200,
            width: 325,
            height: 325,
        },
        {
            id: rand_glorp_squirrel_selection.id_right,
            x: 600,
            y: 200,
            width: 325,
            height: 325,
        }
    ],
    hotspot_highlight_css: 'background-color: rgba(255, 0, 0, 0.3); border: 2px solid red;'
};
timeline.push(glorp);

// Still need assets for this
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

// Need intro video/audio and audio for questions
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