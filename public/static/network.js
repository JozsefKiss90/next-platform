import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import htmlButtonResponse from '@jspsych/plugin-html-button-response';
import surveyText from '@jspsych/plugin-survey-text';
import jsPsychFullscreen from '@jspsych/plugin-fullscreen';
import jsPsychInstructions from '@jspsych/plugin-instructions';
import jsPsychSurveyHtmlForm from '@jspsych/plugin-survey-html-form';
import jsPsychPreload from '@jspsych/plugin-preload';
import {initJsPsych} from 'jspsych';

export default function runTask (email) {

var timeline = []; 
var resparr = []
var networks = []
var perf = []
var valarr=[]
var locations = ['up', 'down']
var cues = ['nocue', 'center', 'double', 'spatial']
var current_trial = 0
var test_stimuli = []
var choices = [37, 39]
var jsPsych = initJsPsych( {
    on_finish: async function() {

        console.log(err)
    }
});


for (l = 0; l < locations.length; l++) {
	var loc = locations[l]
	for (ci = 0; ci < cues.length; ci++) {
		var c = cues[ci]
		stims = [{
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[2] + '></img></div></div>',
			data: {
				correct_response: 37,
				flanker_middle_direction: 'left',
				flanker_type: 'neutral',
				flanker_location: loc,
				cue: c,
				trial_id: 'stim'
			}
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img></div></div>',
			data: {
				correct_response: 37,
				flanker_middle_direction: 'left',
				flanker_type: 'congruent',
				flanker_location: loc,
				cue: c,
				trial_id: 'stim'
			}
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img></div></div>',
			data: {
				correct_response: 37,
				flanker_middle_direction: 'left',
				flanker_type: 'incongruent',
				flanker_location: loc,
				cue: c,
				trial_id: 'stim'
			}
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[2] + '></img></div></div>',
			data: {
				correct_response: 39,
				flanker_middle_direction: 'right',
				flanker_type: 'neutral',
				flanker_location: loc,
				cue: c,
				trial_id: 'stim'
			}
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img></div></div>',
			data: {
				correct_response: 39,
				flanker_middle_direction: 'right',
				flanker_type: 'congruent',
				flanker_location: loc,
				cue: c,
				trial_id: 'stim'
			}
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img></div></div>',
			data: {
				correct_response: 39,
				flanker_middle_direction: 'right',
				flanker_type: 'incongruent',
				flanker_location: loc,
				cue: c,
				trial_id: 'stim'
			}
		}]
		for (i = 0; i < stims.length; i++) {
			test_stimuli.push(stims[i]) 
		}
	}
}

var preload = {
  type: jsPsychPreload,
  images: ['/img/right_arrow.png', '/img/left_arrow.png',  '/img/no_arrow.png']
};

timeline.push(preload);

var enter_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true
  }
  
timeline.push(enter_fullscreen);

var welcome = {
  type: htmlKeyboardResponse,
  stimulus: "Welcome to the experiment. Press any key to begin."
};
timeline.push(welcome);

var instructions = {
  type: htmlKeyboardResponse,
  stimulus: `
    <p>In this experiment, a circle will appear in the center 
    of the screen.</p><p>If the circle is <strong>blue</strong>, 
    press the letter F on the keyboard as fast as you can.</p>
    <p>If the circle is <strong>orange</strong>, press the letter J 
    as fast as you can.</p>
    <div style='width: 700px;'>
    <div style='float: left;'><img src='/img/blue.png'></img>
    <p class='small'><strong>Press the F key</strong></p></div>
    <div style='float: right;'><img src='/img/orange.png'></img>
    <p class='small'><strong>Press the J key</strong></p></div>
    </div>
    <p>Press any key to begin.</p>
  `,
  post_trial_gap: 2000
};

timeline.push(instructions);

var fixation = {
  type: htmlKeyboardResponse,
  stimulus: '<div class = centerbox><div class = ANT_text>+</div></div>',
  choices: "NO_KEYS",
  trial_duration: function(){
    return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
  },
  data: {
    task: 'fixation'
  }, 
};

var practiceTrial = {
    type: htmlKeyboardResponse,
    stimulus: `
      <div style='position:relative; height:300px; display: flex; align-items: center; justify-content: center; flex-direction: column;'>
        <p>Most néhány gyakorló feladat fog következni.</p>
        <p>Nyomj meg egy gombot a folytatáshoz.</p>
      </div>
    `,
    post_trial_gap: 2000
  };
  

timeline.push(practiceTrial);

test_stimuli = shuffleArray(test_stimuli)

var block1_trials = test_stimuli.slice(0, 31)
var block2_trials = test_stimuli.slice(32, 50)
var block3_trials = test_stimuli.slice(51, 60)
var block4_trials = test_stimuli.slice(8, 10)
var block5_trials = test_stimuli.slice(128, 160)
var block6_trials = test_stimuli.slice(160, 192)
  
//block2_trials, block3_trials, block4_trials, block5_trials, block6_trials
//blocks = [block1_trials, block2_trials]
let blocks = [block1_trials, block2_trials]
let practice_block = [block3_trials]

for (let i = 0; i < practice_block.length; i++) {
    var prac_fixation = {
        type: htmlKeyboardResponse,
        stimulus: '<div>' + fixation.innerHTML + '</div>',
        choices: "NO_KEYS",
        trial_duration: 1000,
        data: {
          task: 'fixation'
        }
      };
  
      var prac_display = {
        type: htmlKeyboardResponse,
        stimulus: jsPsych.timelineVariable('stimulus'),
        choices: "NO_KEYS",
        trial_duration: 200,
      };
  
      var pratice_display = {
        type: htmlKeyboardResponse,
        stimulus: "",
        choices: [37, 39],
        trial_duration: null,
        data: {
          task: 'response',
          correct_response: jsPsych.timelineVariable('correct_response'),
          flanker_type: jsPsych.timelineVariable('flanker_type'),
          load: jsPsych.timelineVariable('load')
        },
        post_trial_gap: 1000,
        on_finish: function(data){
          data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
          data.rt = jsPsych.data.getLastTrialData().trials[0].rt;
          console.log(data.flanker_type)
        }
      };
  
    var feedback = {
      type: htmlKeyboardResponse,
      stimulus: function(){
        var last_trial_correct = jsPsych.data.getLastTrialData().trials[0].correct 
        var last_trial_rt = jsPsych.data.getLastTrialData().trials[0].rt
          if(last_trial_rt>1800 && last_trial_correct) {
              return "<p style='font-size: 1.4rem;'>Lassú válasz!</p> <p style='font-size: 1.4rem; color:green';>Helyes válasz!</p>";
            }
          else if(last_trial_rt>1800){
            return "<p style='font-size: 1.4rem;'>Lassú válasz!</p> <p style='font-size: 1.4rem; color:red;'>Rossz válasz.</p>"; 
          }  
          else if(last_trial_correct){
            return "<p style='font-size: 1.4rem; color:green;'>Helyes válasz!</p>"; 
          } else {
            return "<p style='font-size: 1.4rem; color:red;'>Rossz válasz.</p>"; 
          }
        },
      trial_duration: 1000,
      post_trial_gap: 500,
    }


var practice_procedure = {
    timeline: [prac_fixation, prac_display, pratice_display, feedback],
    timeline_variables: practice_block[i],
  };

timeline.push(practice_procedure);

var end_block = {
    type: htmlKeyboardResponse,
    stimulus: '<div class = centerbox><p class = block-text>Most következik a kísérleti rész. A továbbiakban már nem fogsz visszajelzést kapni a válaszaidról</p><p>Nyomj meg egy gombot a folytatáshoz.</p></div>',
    trial_duration: 180000,
    data: {
      trial_id: "end block"
    },
    post_trial_gap: 1000
};

timeline.push(end_block);

var test_procedure = {
  timeline: [fixation, test],
  timeline_variables: test_stimuli,
  repetitions: 0,
  randomize_order: true
};
timeline.push(test_procedure);

/* define debrief */
var debrief_block = {
  type: htmlKeyboardResponse,
  stimulus: function() {

    var trials = jsPsych.data.get().filter({task: 'response'});
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    var rt = Math.round(correct_trials.select('rt').mean());

    return `<p>You responded correctly on ${accuracy}% of the trials.</p>
      <p>Your average response time was ${rt}ms.</p>
      <p>Press any key to complete the experiment. Thank you!</p>`;

  }
};
timeline.push(debrief_block);

/* start the experiment */
jsPsych.run(timeline);

} 
}
