import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';

import surveyText from '@jspsych/plugin-survey-text';
import jsPsychFullscreen from '@jspsych/plugin-fullscreen';
import instructions from '@jspsych/plugin-instructions';
import jsPsychPreload from '@jspsych/plugin-preload';
import {initJsPsych} from 'jspsych';
import { create, all } from 'mathjs' 

export default function runTask (email) {

const config = { }
const math = create(all, config)

var timeline = []; 
var experiment_data = []
var networks = []
var perf = []
var valarr=[]
var locations = ['up', 'down']
var cues = ['nocue', 'center', 'double', 'spatial']
var current_trial = 0
var test_stimuli = []
var choices = ["ArrowLeft", "ArrowRight"]
var path = '/img/'
var images = [path + 'right_arrow.png', path + 'left_arrow.png', path + 'no_arrow.png']

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  }

var jsPsych = initJsPsych( {
    on_finish: function() {
      assessPerformance()
      var trials = jsPsych.data.get().filter({task: 'test'});
      var correct_trials = trials.filter({correct: true});
      var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
      var rt = Math.round(correct_trials.select('rt').mean());  

      var data = {
        rt : rt, 
        accuracy : accuracy,
        performance: perf,
        email : email 
      }
      const endpoint = "/api/network"
      fetch(endpoint, {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body: JSON.stringify(data)
      })
      .then(response => response.json()) 
      .then(json => console.log(json))
      .catch(err => console.log(err))  
    }
});

var no_cue = '<div class = centerbox><div class = ANT_text>+</div></div>'

var center_cue =  '<div class = centerbox><div class = ANT_centercue_text>*</div></div>'

var double_cue = '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_down><div class = ANT_text>*</div></div><div class = ANT_up><div class = ANT_text>*</div><div></div>'

var spatial_cue 
//var cues = [no_cue, center_cue, double_cue, spatial_cue]
//'nocue', 'center', 'double', 'spatial'
for (let l = 0; l < locations.length; l++) {
	var loc = locations[l]
	for (let ci = 0; ci < cues.length; ci++) {
		var c = cues[ci]
    var cueToDisplay
    if(c === 'nocue') {
      cueToDisplay = no_cue
    } else if(c === 'center') {
      cueToDisplay = center_cue
    } else if(c === 'double') {
      cueToDisplay = double_cue
    } else {
      spatial_cue = '<div class = centerbox><div class = ANT_text>+</div></div><div class = centerbox><div class = ANT_' + loc +
      '><div class = ANT_text>*</p></div></div>'
      cueToDisplay = spatial_cue
    }
		var stims = [{
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[2] + '></img></div></div>',
      correct_response: "ArrowLeft",
      flanker_middle_direction: 'left',
      flanker_type: 'neutral',
      flanker_location: loc,
      cue_type: c,
      cue: cueToDisplay,
      trial_id: 'stim'
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img></div></div>',
      correct_response: "ArrowLeft",
      flanker_middle_direction: 'left',
      flanker_type: 'congruent',
      flanker_location: loc,
      cue_type: c,
      cue: cueToDisplay,
      trial_id: 'stim'
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img></div></div>',
      correct_response: "ArrowLeft",
      flanker_middle_direction: 'left',
      flanker_type: 'incongruent',
      flanker_location: loc,
      cue_type: c,
      cue: cueToDisplay,
      trial_id: 'stim'
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[2] + '></img><img class = ANT_img src = ' + images[2] + '></img></div></div>',
      correct_response: "ArrowRight",
      flanker_middle_direction: 'right',
      flanker_type: 'neutral',
      flanker_location: loc,
      cue_type: c,
      cue: cueToDisplay,
      trial_id: 'stim'
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[0] + '></img></div></div>',
      correct_response: "ArrowRight",
      flanker_middle_direction: 'right',
      flanker_type: 'congruent',
      flanker_location: loc,
      cue_type: c,
      cue: cueToDisplay,
      trial_id: 'stim'
		}, {
			stimulus: '<div class = centerbox><div class = ANT_text>+</div></div><div class = ANT_' + loc +
				'><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[0] + '></img><img class = ANT_img src = ' + images[1] + '></img><img class = ANT_img src = ' + images[1] + '></img></div></div>',
      correct_response: "ArrowRight",
      flanker_middle_direction: 'right',
      flanker_type: 'incongruent',
      flanker_location: loc,
      cue_type: c,
      cue: cueToDisplay,
      trial_id: 'stim'
		}]
		for (let i = 0; i < stims.length; i++) {
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
  
//timeline.push(enter_fullscreen);

var welcome = {
  type: htmlKeyboardResponse,
  stimulus: "Üdvözöllek a kísérletben. Nyomj meg egy gombot a folytatáshoz."
};
timeline.push(welcome);

var instructionOne = {
  type: htmlKeyboardResponse,
  stimulus: "A kísérlet kb. 15 percet fog igénybe venni. Nyomj meg egy gombot a folytatáshoz."
};
timeline.push(instructionOne);

var instructionTwo = {
  type: instructions ,
  pages: [
  '<p style="text-align: justify; margin: 0 100px;">Ebben a kísérletben öt nyilat fogsz egymás mellett látni, amelyek jobbra vagy balra mutatnak (pl. &larr; &larr; &larr; &larr; &larr;, vagy &mdash; &mdash; &rarr; &mdash; &mdash;) <br> és a képernyő tetején vagy alján jelenhetnek meg.</p>',
  '<p style="text-align: justify;  margin: 0 100px;">A feladatod jelezni, hogy a középen lévő nyíl melyik irányba mutat az ennek megefelelő irányú gombok lenyomásával.</p><p style="font-size: 60px;">&larr; &larr; <span style="color: rgba(0, 162, 232, 1);">&rarr;</span> &larr; &larr;</p>' +
  '<br>' + 
  '<img style=" margin: 20px; width:200px;" class="center-img" src="/img/buttons.png"></img>'
  ],
  show_clickable_nav: true,
  button_label_previous: "Vissza",
  button_label_next: "Tovább"
}

timeline.push(instructionTwo);
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
let blocks = [block1_trials]
let practice_block = [block1_trials]

for (let i = 0; i < practice_block.length; i++) {
    var practice_fixation = {
        type: htmlKeyboardResponse,
        stimulus: '<div>' + fixation.stimulus + '</div>',
        choices: "f",
        trial_duration: 500,
        data: {
          task: 'fixation'
        }
      };
    var practice_cue = {
        type: htmlKeyboardResponse,
        stimulus: jsPsych.timelineVariable('cue'),
        choices: "f",
        trial_duration: 500,
        data: {
          task: 'cue'
        }
      }
    var practice_stim_display = {
      type: htmlKeyboardResponse,
      stimulus: jsPsych.timelineVariable('stimulus'),
      choices: "f",
      trial_duration: 500,
      trial_id: jsPsych.timelineVariable('trial_id'),
    };
    var pratice_response_display = {
      type: htmlKeyboardResponse,
      stimulus: "",
      choices: ["ArrowLeft", "ArrowRight"],
      trial_duration: 500,
      data: {
        task: 'practice',
        correct_response: jsPsych.timelineVariable('correct_response'),
        flanker_middle_direction: jsPsych.timelineVariable('flanker_middle_direction'),
        flanker_type: jsPsych.timelineVariable('flanker_type'),
        flanker_location: jsPsych.timelineVariable('flanker_location'),
        cue: jsPsych.timelineVariable('cue'),
        cue_type: jsPsych.timelineVariable('cue_type')
      },
      post_trial_gap: 0,
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
      trial_duration: 0,
      post_trial_gap: 0,
    }


  var practice_procedure = {
      timeline: [practice_fixation, practice_cue, practice_stim_display, pratice_response_display, feedback],
      timeline_variables: practice_block[i],
    };

//  timeline.push(practice_procedure);

  } 
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

for (let i = 0; i < blocks.length; i++) {
  var test_fixation = {
      type: htmlKeyboardResponse,
      stimulus: '<div>' + fixation.stimulus + '</div>',
      choices: "f",
      trial_duration: 0,
      data: {
        task: 'fixation'
      }
    };
  var test_cue = {
      type: htmlKeyboardResponse,
      stimulus: jsPsych.timelineVariable('cue'),
      choices: "f",
      trial_duration: 0,
      data: {
        task: 'cue'
      }
    }
  var test_stim_display = {
    type: htmlKeyboardResponse,
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: null,
    trial_duration: 0,
    trial_id: jsPsych.timelineVariable('trial_id'),
  };

  var test_response_display = {
    type: htmlKeyboardResponse,
    stimulus: "",
    choices: ["ArrowLeft", "ArrowRight"],
    trial_duration: 0,
    data: {
      task: 'test',
      correct_response: jsPsych.timelineVariable('correct_response'),
      flanker_middle_direction: jsPsych.timelineVariable('flanker_middle_direction'),
      flanker_type: jsPsych.timelineVariable('flanker_type'),
      flanker_location: jsPsych.timelineVariable('flanker_location'),
      cue: jsPsych.timelineVariable('cue'),
      cue_type: jsPsych.timelineVariable('cue_type')
    },
    post_trial_gap: 0,
    on_finish: function(data){
        data.correct = jsPsych.pluginAPI.compareKeys(data.response, data.correct_response);
        data.rt = jsPsych.data.getLastTrialData().trials[0].rt;
      }
  };

  var test_procedure = {
      timeline: [test_fixation, test_cue, test_stim_display, test_response_display],
      timeline_variables: blocks[i],
    };

  timeline.push(test_procedure);

} 

async function assessPerformance() {

	var experiment_data = jsPsych.data.get().filter({task: 'test'});
	var missed_count = 0
	var trial_count = 0
	var rt_array = []
	var rt = 0
  const responseArray = experiment_data.trials
	console.log(experiment_data)
	var choice_counts = {}
	choice_counts[-1] = 0
	for (var k = 0; k < choices.length; k++) {
		choice_counts[choices[k]] = 0
	}
	for (var i = 0; i < experiment_data.length; i++) {
		trial_count += 1
			rt = experiment_data[i].rt
			key = experiment_data[i].key_press
			choice_counts[key] += 1
			if (rt == -1) {
				missed_count += 1
			} else {
				rt_array.push(rt)
			}
	}
	var avg_rt = -1
	if (rt_array.length !== 0) {
		avg_rt = math.median(rt_array)
	}

	var responses_ok = true
	Object.keys(choice_counts).forEach(function(key, index) {
		if (choice_counts[key] > trial_count * 0.85) {
			responses_ok = false
		}
	})


	 var rtarr = []
		for (i=0; i<experiment_data.length; i++) {
		if (experiment_data[i].rt < 1000) {
			  rtarr.push(experiment_data[i].rt)
			}
			}
	var avrt = rtarr.reduce((a, b) => a + b, 0) / rtarr.length
	var corrarr = []
		for (i=0; i<experiment_data.length; i++) {
		  if (experiment_data[i].correct == true || experiment_data[i].correct == false) {
			  rtarr.push(experiment_data[i].rt)
			  }
			}

			var nocue_cong = []
			var center_cong = []
			var double_cong = []
			var spatial_cong = []
			var nocue_incong = []
			var center_incong = []
			var double_incong = []
			var spatial_incong = []
			var nocue_neutral = []
			var center_neutral = []
			var double_neutral = []
			var spatial_neutral = []
      

			for (let i=0; i < experiment_data.trials.length; i++) {
        responseArray[i].rt = 100
				if (responseArray[i].correct == true || responseArray[i].correct == false && responseArray[i].cue == "nocue" && responseArray[i].flanker_type == "congruent") {
					nocue_cong.push(responseArray[i].rt)
					}
				else if (responseArray[i].correct = true && responseArray[i].cue == "center" && responseArray[i].flanker_type == "congruent") {
					center_cong.push(responseArray[i].rt)
						}

				else if (responseArray[i].correct = true && responseArray[i].cue == "double" && responseArray[i].flanker_type == "congruent") {
					double_cong.push(responseArray[i].rt)
						}

				else if (responseArray[i].correct = true && responseArray[i].cue == "spatial" && responseArray[i].flanker_type == "congruent") {
					spatial_cong.push(responseArray[i].rt)
						}

				else if (responseArray[i].correct = true && responseArray[i].cue == "nocue" && responseArray[i].flanker_type == "incongruent") {
					nocue_incong.push(responseArray[i].rt)
						}

				else if (responseArray[i].correct = true && responseArray[i].cue_type == "center" && responseArray[i].flanker_type == "incongruent") {
					center_incong.push(responseArray[i].rt)
						}

				else if (responseArray[i].correct = true && responseArray[i].cue_type == "double" && responseArray[i].flanker_type == "incongruent") {
					double_incong.push(responseArray[i].rt)
								}

				else if (responseArray[i].correct = true && responseArray[i].cue_type == "spatial" && responseArray[i].flanker_type == "congruent") {
					spatial_cong.push(responseArray[i].rt)
						}

				else if (responseArray[i].correct = true && responseArray[i].cue_type == "nocue" && responseArray[i].flanker_type == "neutral") {
							nocue_neutral.push(responseArray[i].rt)
								}

				else if (responseArray[i].correct = true && responseArray[i].cue_type == "center" && responseArray[i].flanker_type == "neutral") {
							nocue_neutral.push(responseArray[i].rt)
								}

				else if (responseArray[i].correct = true && responseArray[i].cue_type == "double" && responseArray[i].flanker_type == "neutral") {
							double_neutral.push(responseArray[i].rt)
								}

				else if(responseArray[i].correct = true && responseArray[i].cue_type == "spatial" && responseArray[i].flanker_type == "neutral") {
							spatial_neutral.push(responseArray[i].rt)
								}
					}

      var nocue = [...nocue_cong, ...nocue_incong, ...nocue_neutral]
      var centralcue = [...center_cong, ...center_incong, ...center_neutral]
      var spatialcue= [...spatial_cong,...spatial_incong,...spatial_neutral]
      var doublecue =[...double_cong, ...double_incong, ...double_neutral]
      var congruent = [...nocue_cong, ...center_cong, ...double_cong, ...spatial_cong]
      var incongruent = [...nocue_incong, ...center_incong, ...double_incong, ...spatial_incong]

      var mean_nocue = math.mean(nocue)
      var mean_central = math.mean(centralcue)
      var mean_spatial = math.mean(spatialcue)
      var mean_double = math.mean(doublecue)
      var mean_congruent = math.mean(congruent)
      var mean_incongruent = math.mean(incongruent)

      var executive = mean_incongruent - mean_congruent
      var alerting = mean_nocue - mean_double
      var orienting = mean_central - mean_spatial

      var respObj = {exec:executive, alert: alerting, orient:orienting}

      networks.push(respObj)
      console.log(networks)
		
			var corr_nocue_cong =  100-(nocue_cong.length/12)*100
			var corr_center_cong = 100 - (center_cong.length/12)*100
			var corr_double_cong = 100 - (double_cong.length/12)*100
			var corr_spatial_cong = 100 - (spatial_cong.length/12)*100
			var corr_nocue_incong = 100 - (nocue_incong.length/12)*100
			var corr_center_incong = 100 - (center_incong.length/12)*100
			var corr_double_incong = 100 - (double_incong.length/12)*100
			var corr_spatial_incong = 100 - (spatial_incong.length/12)*100
			var corr_nocue_neutral = 100 - (nocue_neutral.length/12)*100
			var corr_center_neutral = 100 - (center_neutral.length/12)*100
			var corr_double_neutral = 100 - (double_neutral.length/12)*100
			var corr_spatial_neutral = 100 - (spatial_neutral.length/12)*100

			var correctObj = {congruent_nocue:corr_nocue_cong, congruent_center:corr_center_cong, congruent_double:corr_double_cong, congruent_spatial:corr_spatial_cong,
			incongruent_nocue:corr_nocue_incong, incongruent_center:corr_center_incong, incongruent_double:corr_double_incong, incongruent_spatial:corr_spatial_incong,
		neutral_nocue:corr_nocue_neutral, neutral_center:corr_center_neutral, neutral_double:corr_double_neutral, neutral_spatial:corr_spatial_neutral}

		perf.push(correctObj)
		console.log(perf)

}

var survey_trial = {
  type: surveyText,
  questions: [
    {prompt: 'Észrevétel, visszajelzés, hiba. Ha nincs hagyd üresen,', rows: 6}
  ]
}

timeline.push(survey_trial);

var debrief_block = {
  type: htmlKeyboardResponse,
  stimulus: function() {

    var trials = jsPsych.data.get().filter({task: 'test'});
    var correct_trials = trials.filter({correct: true});
    var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
    var rt = Math.round(correct_trials.select('rt').mean());
    console.log(trials)
    return `<p>You responded correctly on ${accuracy}% of the trials.</p>
      <p>Your average response time was ${rt}ms.</p>
      <p>Press any key to complete the experiment. Thank you!</p>`;

  }
};
timeline.push(debrief_block);

jsPsych.run(timeline);
    
}
