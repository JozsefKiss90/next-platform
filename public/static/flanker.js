import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import htmlButtonResponse from '@jspsych/plugin-html-button-response';
import surveyText from '@jspsych/plugin-survey-text';
import jsPsychFullscreen from '@jspsych/plugin-fullscreen';
import jsPsychInstructions from '@jspsych/plugin-instructions';
import jsPsychSurveyHtmlForm from '@jspsych/plugin-survey-html-form';
import jsPsychPreload from '@jspsych/plugin-preload';
import {initJsPsych} from 'jspsych';

export default async function runTask() {
  
  async function getStimuli() {
    const response = await fetch('../static/flanker/stimuli.svg')
    const text = await response.text();
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(text, 'image/svg+xml');
    return svgDoc.documentElement;
  }
  
  async function getFixation() {
    const response = await fetch('../static/flanker/fixation.svg');
    const text = await response.text();
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(text, 'image/svg+xml');
    return svgDoc.documentElement;
  }
    
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  var sub_id = generateString(6);
  
  var jsPsych =  initJsPsych({
    on_finish: function() {
      var trials = jsPsych.data.get().filter({task: 'response'});
      var name = jsPsych.data.get().filter({trial_type: 'survey-html-form'});
      var correct_trials = trials.filter({correct: true});
      var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
      var rt = Math.round(correct_trials.select('rt').mean());
      var survey = jsPsych.data.get().filter({trial_type :'survey-text'}).trials[0].response.Q0;
      let allData = getData(respArr)
      let loads = calculateRt(allData)

      var data = {
        rTime : rt, 
        acc : accuracy,
        //name : name.trials[0].response[0].value,
        name : '',
        loads : loads,
        survey : survey,
      }
      console.log(data)
      const endpoint = 'https://esport-metrics.herokuapp.com/api/flanker'
      //jsPsych.data.displayData(),
      fetch(endpoint, {
              method: "POST",
              body: JSON.stringify(data),
              headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => console.log(json))
            .catch(err => console.log(err))
            }
          }
      );
  
  var timeline = [];

  async function loadStimuli() {
    try {
      const stimuli = await getStimuli()
      return stimuli
    }
    catch(error) {
      console.log(error)
      return null
    }
  }

  const stimuli = await loadStimuli();

  var preload = {
    type: jsPsychPreload,
    message: [loadStimuli()]
    };
    
  timeline.push(preload);
  
  var enter_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: true
  }
  
  timeline.push(enter_fullscreen);
  
  var trial_in_fullscreen = {
    type: htmlButtonResponse,
    stimulus: 'A kísérlet teljes képernyős módban fog futni, amint az alábbi gombra kattintasz.',
    choices: ['Kezdés.']
  }
  
  var form_trial = {
    type: jsPsychSurveyHtmlForm,
    preamble: '<p> Kérlek add meg a neved</b> </p>',
    html: '<p> Név: <input name="first_name" type="text"/></p>',
    dataAsArray : true
  };
  
  //timeline.push(form_trial);
  
  var instructions = {
    type: jsPsychInstructions,
    pages: ["Üdvözöllek a kísérletben.", 
    ` 
      <div style='position : relative; height:500px; '>
        <p>Ebben a kísérletben a képernyőn különböző betűk jelennek meg.</p><p>A feladatod jelezni, hogy a  körökön <strong>belül</strong>  
        egy N vagy egy X található-e <br> (mindig csak egyféle célinger jelenik meg, azaz vagy csak N-t vagy X-t fogsz látni).</p>
        <p>Ha  N, nyomd meg a billentyűzeten az <strong>N</strong>-t, ha X akkor pedig nyomd meg a <strong>X</strong>-t.</p>
        <div style='float: left; margin-left:60px;'><img style='width:50%; height=50%;' src='../static/flanker/img/betuN.png'></img>
        <p style='margin-left:60px;' class='small'><strong> N gomb</strong></p></div>
        <div style='float: right; margin-right:60px;'><img style='width:50%; height=50%;' src='../static/flanker/img/betuX.png'></img>
        <p style='margin-right:60px;' class='small'><strong>X gomb</strong></p></div>
        </div>
    `,
    ` 
      <div style='position:relative; height:460px; display: flex; align-items: center; justify-content: center; flex-direction: column;'>
        <p style="line-height=20px; width:750px">
          A körökön <strong>belül</strong>  a célingerek melett különböző zavaró ingerek (S,Z,M,W,H) jelenhetnek meg, mennyiségük szerint 1, 3 vagy 5. <br> 
          A körökön <strong>kívül</strong>  a jobb vagy bal oldalon mindig megjelenik egy zavaró inger. <br> Ez lehet a célingerrel azonos (pl. célinger: N, zavaró: N) vagy ellentétes (pl. célinger: X, zavaró: N).
        </p> 
        <div style='display: flex; justify-content: center;'>
          <div style='width:250px; height:225px; padding-right:50px;'><img style='width:250px; height:225px;' src='../static/flanker/img/betu62.png'></img></div>
          <div style='width:250px; height:225px; padding-left:50px;'><img style='width:250px; height:225px;' src='../static/flanker/img/betuI.png'></img></div>
        </div>  
      </div>
    `,
    ` 
      <div style='position:relative; height:300px; display: flex; align-items: center; justify-content: center; flex-direction: column;'>
        <p>A próbák nagyon rövid ideig (100ms) lesznek láthatók.</p>
        <p>A felvillanásukat követően nincs a válaszra kiszabott időkorlát.</p>
        <p>Ennek ellenére próbálj a lehető leggyorsabban válaszolni válaszolni!</p>
      </div>
    `,
  
  ],
    button_html: ['<button class="jspsych-btn" style = "position:relative; left:284.5px; top: 270px">%choice%</button>', '<button class="jspsych-btn" style = "position:relative; right:284.5px; top: 270px">%choice%</button>'],
    show_clickable_nav: true,
    button_label_previous: 'Vissza',
    button_label_next: 'Következő' 
  };
  
  timeline.push(instructions);
  
  var praticeTrial = {
    type: htmlKeyboardResponse,
    stimulus: `
      <div style='position:relative; height:300px; display: flex; align-items: center; justify-content: center; flex-direction: column;'>
        <p>Most néhány gyakorló feladat fog következni.</p>
        <p>Nyomj meg egy gombot a folytatáshoz.</p>
      </div>
    `,
    post_trial_gap: 2000
  };
  
  timeline.push(praticeTrial);
  
  
  async function loadFixation() {
    try {
      const fixationData = await getFixation();
      return fixationData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  
  const fixation = await loadFixation()
  console.log(fixation.innerHTML)
  var rotations = [["rotate(0 300 150)", "rotate(0 170 225)", "rotate(0 170 375)", "rotate(0 300 450)", "rotate(0 430 375)", "rotate(0 430 225)"], ["rotate(45 300 150)", "rotate(45 170 225)", "rotate(45 170 375)", "rotate(45 300 450)", "rotate(45 430 375)", "rotate(45 430 225)"]]
  
  var distractors = ["N", "X"]

  var locations = [['550', '318'], ['550', '318'], ['550', '318'], ['20', '318'], ['20', '318'], ['20', '318'], ['550', '318'], ['550', '318'], ['550', '318'], ['20', '318'], ['20', '318'], ['20', '318']]
  
  var targets =['N', 'N', 'N', 'N', 'N', 'N', 'X', 'X', 'X', 'X', 'X', 'X']
  
  var nonTargets = ['W', 'M', 'O', 'S', 'Z', 'H']
  const locAttributes = [['300', '168'], ['300', '468'], ['170', '242'], ['430', '392'], ['170', '392'], ['430', '242'], ['300', '168'], ['300', '468'], ['170', '242'], ['430', '392'], ['170', '392'], ['430', '242']]

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
  }
  
 var test_stimuli = []
  
  for (let r = 0; r < distractors.length; r++) {
   let dist = distractors[r]
      for (let i = 0; i < targets.length; i++) {   
  
        let target = targets[i]
        let congruency
  
         if(dist == 'N' && target == 'N') {
          congruency = 'congruent'
        } else if(dist == 'N' && target == 'X') {
          congruency = 'incongruent'
        } else if(dist == 'X' && target == 'N') {
          congruency = 'incongruent'
        } else {
          congruency = 'congruent'
        }
  
        let response 
        if(target == 'N') {
          response = 'n'
        } else {
          response = 'x'
        }
        
        
        var svg = stimuli.getElementsByTagName('svg')[0];
  
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'text'); 
        newElement.textContent =  targets[i]
        newElement.setAttributeNS(null, 'x', locAttributes[i][0]); 
        newElement.setAttributeNS(null, 'y', locAttributes[i][1]);
        newElement.setAttributeNS(null, 'style', 'font-size:50px;');
        newElement.setAttributeNS(null, 'text-anchor', "middle");
        svg.appendChild(newElement);
  
        var dis = document.createElementNS("http://www.w3.org/2000/svg", 'text'); 
        dis.textContent = dist;
        dis.setAttributeNS(null, 'x', locations[i][0]); 
        dis.setAttributeNS(null, 'y', locations[i][1]);  
        dis.setAttributeNS(null, 'style', 'font-size:60px; text-anchor=middle');   
        svg.appendChild(dis);
  
        var svg = '<div>' + svg.outerHTML + '</div>'
  
        while(dis.attributes.length > 0)
          dis.removeAttribute(dis.attributes[0].name);
      
        while(newElement.attributes.length > 0)
          newElement.removeAttribute(newElement.attributes[0].name);
      
       const stims = [{
          stimulus:svg,
          correct_response: response,
          flanker_type: congruency,
          load: 1,
          trial_id : 'stim'
        }]
          for (let j = 0; j < stims.length; j++) {
            test_stimuli.push(stims[j])
          }
        }
  
      for (let i = 0; i < targets.length; i++) {   
  
          let target = targets[i]
        let congruency
  
         if(dist == 'N' && target == 'N') {
          congruency = 'congruent'
        } else if(dist == 'N' && target == 'X') {
          congruency = 'incongruent'
        } else if(dist == 'X' && target == 'N') {
          congruency = 'incongruent'
        } else {
          congruency = 'congruent'
        }
  
        let response 
        if(target == 'N') {
          response = 'n'
        } else {
          response = 'x'
        }
  
        var svg = stimuli.getElementsByTagName('svg')[0]
        
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        var newElement2 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
  
        newElement.textContent =  targets[i]
        newElement.setAttributeNS(null, 'x', locAttributes[i][0]); 
        newElement.setAttributeNS(null, 'y', locAttributes[i][1]);
        newElement.setAttributeNS(null, 'style', 'font-size:50px;');
        newElement.setAttributeNS(null, 'text-anchor', "middle");
        svg.appendChild(newElement);
  
        var pos1 = locAttributes[i]
      
        function checkPos(p1) {
          shuffleArray(locAttributes)
        let  p2 = locAttributes[i] 
          if (p1.join('') != p2.join('')) {
            return p2
          }
          return checkPos(p1)
        } 
  
        shuffleArray(nonTargets)
  
        var locAttribute2 = checkPos(pos1)
  
        var newElement2 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        newElement2.textContent =  nonTargets[i]
        newElement2.setAttributeNS(null, 'x', locAttribute2[0]); 
        newElement2.setAttributeNS(null, 'y', locAttribute2[1]);
        newElement2.setAttributeNS(null, 'style', 'font-size:50px;');
        newElement2.setAttributeNS(null, 'text-anchor', "middle");
        svg.appendChild(newElement2);
  
        var dis = document.createElementNS("http://www.w3.org/2000/svg", 'text'); 
        dis.textContent = dist;
        dis.setAttributeNS(null, 'x', locations[i][0]); 
        dis.setAttributeNS(null, 'y', locations[i][1]); 
        dis.setAttributeNS(null, 'style', 'font-size:60px; text-anchor=middle')  
        svg.appendChild(dis)
  
        var svg = '<div>' + svg.outerHTML + '</div>' 
  
        while(dis.attributes.length > 0)
          dis.removeAttribute(dis.attributes[0].name);
  
        while(newElement.attributes.length > 0)
          newElement.removeAttribute(newElement.attributes[0].name);
  
        while(newElement2.attributes.length > 0)
          newElement2.removeAttribute(newElement2.attributes[0].name);
      
       let stims = [{
        stimulus:svg,
        correct_response: response,
        flanker_type: congruency,
        load: 2,
        trial_id : "stim"
        }]
  
        for (let j = 0; j < stims.length; j++) {
          test_stimuli.push(stims[j])
          }
      }
  
      for (let i = 0; i < targets.length; i++) {   
  
          let target = targets[i]
        let congruency
  
         if(dist == 'N' && target == 'N') {
          congruency = 'congruent'
        } else if(dist == 'N' && target == 'X') {
          congruency = 'incongruent'
        } else if(dist == 'X' && target == 'N') {
          congruency = 'incongruent'
        } else {
          congruency = 'congruent'
        }
  
        let response 
        if(target == 'N') {
          response = 'n'
        } else {
          response = 'x'
        }
  
        var svg = stimuli.getElementsByTagName('svg')[0]
  
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        var newElement2 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        var newElement3 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        var newElement4 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
   
        newElement.textContent =  targets[i]
        newElement.setAttributeNS(null, 'x', locAttributes[i][0]); 
        newElement.setAttributeNS(null, 'y', locAttributes[i][1]);
        newElement.setAttributeNS(null, 'style', 'font-size:50px;');
        newElement.setAttributeNS(null, 'text-anchor', "middle");
  
        var pos1 = locAttributes[i]
  
        function checkPos(p1) {
          shuffleArray(locAttributes)
        let  p2 = locAttributes[i]  
          shuffleArray(locAttributes)
        let p3 = locAttributes[i] 
          shuffleArray(locAttributes)
        let p4 = locAttributes[i] 
          if ((p1.join('') != p2.join('')) && (p1.join('') != p3.join('')) && (p2.join('') != p3.join('')) && (p2.join('') != p4.join('')) && (p1.join('') != p4.join('')) && (p3.join('') != p4.join(''))) {
            return [p2, p3, p4]
          }
          return checkPos(p1)
        }
                
      let arr = checkPos(pos1)
        shuffleArray(nonTargets)
      let selectedNonTargets = [nonTargets[0], nonTargets[1], nonTargets[2]]
        var locAttribute3 = checkPos(pos1)
  
        var newElement2 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        newElement2.textContent =  selectedNonTargets[0]
        newElement2.setAttributeNS(null, 'x', locAttribute3[0][0]); 
        newElement2.setAttributeNS(null, 'y', locAttribute3[0][1]);
        newElement2.setAttributeNS(null, 'style', 'font-size:50px;');
        newElement2.setAttributeNS(null, 'text-anchor', "middle");
  
        var newElement3 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        newElement3.textContent =  selectedNonTargets[1]
        newElement3.setAttributeNS(null, 'x', locAttribute3[1][0]); 
        newElement3.setAttributeNS(null, 'y', locAttribute3[1][1]);
        newElement3.setAttributeNS(null, 'style', 'font-size:50px;');
        newElement3.setAttributeNS(null, 'text-anchor', "middle");
  
        var newElement4 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        newElement4.textContent =  selectedNonTargets[2]
        newElement4.setAttributeNS(null, 'x', locAttribute3[2][0]); 
        newElement4.setAttributeNS(null, 'y', locAttribute3[2][1]);
        newElement4.setAttributeNS(null, 'style', 'font-size:50px;');
        newElement4.setAttributeNS(null, 'text-anchor', "middle");
  
        svg.appendChild(newElement)
        svg.appendChild(newElement2)
        svg.appendChild(newElement3)
        svg.appendChild(newElement4)
  
        var dis = document.createElementNS("http://www.w3.org/2000/svg", 'text'); 
        dis.textContent = dist;
        dis.setAttributeNS(null, 'x', locations[i][0]); 
        dis.setAttributeNS(null, 'y', locations[i][1]); 
        dis.setAttributeNS(null, 'style', 'font-size:60px; text-anchor=middle')  
        svg.appendChild(dis)
   
        var svg = '<div>' + svg.outerHTML + '</div>'
  
        while(dis.attributes.length > 0)
          dis.removeAttribute(dis.attributes[0].name);
  
        while(newElement.attributes.length > 0)
          newElement.removeAttribute(newElement.attributes[0].name);
  
        while(newElement2.attributes.length > 0)
          newElement2.removeAttribute(newElement2.attributes[0].name);
        
        while(newElement3.attributes.length > 0)
          newElement3.removeAttribute(newElement3.attributes[0].name);
  
        while(newElement4.attributes.length > 0)
          newElement4.removeAttribute(newElement4.attributes[0].name);
  
        
       let stims = [{
          stimulus:svg,
          correct_response: response,
          flanker_type: congruency,
          load: 4,
          trial_id :  "stim"
        }]
          for (let j = 0; j < stims.length; j++) {
            test_stimuli.push(stims[j])
        }
      }
  
      for (let i = 0; i < targets.length; i++) {   
  
        let target = targets[i]
        let congruency
  
         if(dist == 'N' && target == 'N') {
          congruency = 'congruent'
        } else if(dist == 'N' && target == 'X') {
          congruency = 'incongruent'
        } else if(dist == 'X' && target == 'N') {
          congruency = 'incongruent'
        } else {
          congruency = 'congruent'
        }
  
        let response 
        if(target == 'N') {
          response = 'n'
        } else {
          response = 'x'
        }
  
        var svg = stimuli.getElementsByTagName('svg')[0]
  
        var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        var newElement2 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        var newElement3 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        var newElement4 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        var newElement5 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        var newElement6 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
  
        newElement.textContent =  targets[i]
        newElement.setAttributeNS(null, 'x', locAttributes[i][0]); 
        newElement.setAttributeNS(null, 'y', locAttributes[i][1]);
        newElement.setAttributeNS(null, 'style', 'font-size:50px;');
        newElement.setAttributeNS(null, 'text-anchor', "middle");
  
        var pos1 = locAttributes[i]
  
        function checkPos(p1) {
          shuffleArray(locAttributes)
        let p2 = locAttributes[i]  
          shuffleArray(locAttributes)
        let p3 = locAttributes[i] 
          shuffleArray(locAttributes)
        let p4 = locAttributes[i] 
          shuffleArray(locAttributes)
        let p5 = locAttributes[i]
          shuffleArray(locAttributes)
        let  p6 = locAttributes[i]
          if ((p1.join('') != p2.join('')) && (p1.join('') != p3.join('')) && (p2.join('') != p3.join('')) && (p2.join('') != p4.join('')) && (p1.join('') != p4.join('')) && (p3.join('') != p4.join('')) && (p3.join('') != p5.join('')) && (p3.join('') != p6.join(''))
                && (p5.join('') != p4.join('')) && (p5.join('') != p6.join('')) && (p1.join('') != p5.join('')) && (p1.join('') != p6.join('')) && (p2.join('') != p5.join('')) && (p2.join('') != p6.join('')) && (p4.join('') != p6.join(''))) {
                  return [p2, p3, p4, p5, p6]
              }   
          return checkPos(p1)
        }
                
        let arr = checkPos(pos1)
        shuffleArray(nonTargets)
        let selectedNonTargets = [nonTargets[0], nonTargets[1], nonTargets[2], nonTargets[3], nonTargets[4]]
        var locAttribute3 = checkPos(pos1)
  
        var newElement2 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        newElement2.textContent =  selectedNonTargets[0]
        newElement2.setAttributeNS(null, 'x', locAttribute3[0][0]); 
        newElement2.setAttributeNS(null, 'y', locAttribute3[0][1]);
        newElement2.setAttributeNS(null, 'style', 'font-size:50px;');
        newElement2.setAttributeNS(null, 'text-anchor', "middle");
  
        var newElement3 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        newElement3.textContent =  selectedNonTargets[1]
        newElement3.setAttributeNS(null, 'x', locAttribute3[1][0]); 
        newElement3.setAttributeNS(null, 'y', locAttribute3[1][1]);
        newElement3.setAttributeNS(null, 'style', 'font-size:50px;');
        newElement3.setAttributeNS(null, 'text-anchor', "middle");
  
        var newElement4 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        newElement4.textContent =  selectedNonTargets[2]
        newElement4.setAttributeNS(null, 'x', locAttribute3[2][0]); 
        newElement4.setAttributeNS(null, 'y', locAttribute3[2][1]);
        newElement4.setAttributeNS(null, 'style', 'font-size:50px;');
        newElement4.setAttributeNS(null, 'text-anchor', "middle");
  
        var newElement5 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        newElement5.textContent =  selectedNonTargets[3]
        newElement5.setAttributeNS(null, 'x', locAttribute3[3][0]); 
        newElement5.setAttributeNS(null, 'y', locAttribute3[3][1]);
        newElement5.setAttributeNS(null, 'style', 'font-size:50px;');
        newElement5.setAttributeNS(null, 'text-anchor', "middle");
  
        var newElement6 = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        newElement6.textContent =  selectedNonTargets[4]
        newElement6.setAttributeNS(null, 'x', locAttribute3[4][0]); 
        newElement6.setAttributeNS(null, 'y', locAttribute3[4][1]);
        newElement6.setAttributeNS(null, 'style', 'font-size:50px;');
        newElement6.setAttributeNS(null, 'text-anchor', "middle");
  
        svg.appendChild(newElement)
        svg.appendChild(newElement2)
        svg.appendChild(newElement3)
        svg.appendChild(newElement4)
        svg.appendChild(newElement5)
        svg.appendChild(newElement6)
  
        var dis = document.createElementNS("http://www.w3.org/2000/svg", 'text'); 
        dis.textContent = dist;
        dis.setAttributeNS(null, 'x', locations[i][0]); 
        dis.setAttributeNS(null, 'y', locations[i][1]); 
        dis.setAttributeNS(null, 'style', 'font-size:60px; text-anchor=middle')  
        svg.appendChild(dis)
  
        var svg = '<div>' + svg.outerHTML + '</div>'
  
        while(dis.attributes.length > 0)
          dis.removeAttribute(dis.attributes[0].name);
  
        while(newElement.attributes.length > 0)
          newElement.removeAttribute(newElement.attributes[0].name);
  
        while(newElement2.attributes.length > 0)
          newElement2.removeAttribute(newElement2.attributes[0].name);
  
        while(newElement3.attributes.length > 0)
          newElement3.removeAttribute(newElement3.attributes[0].name);
  
        while(newElement4.attributes.length > 0)
          newElement4.removeAttribute(newElement4.attributes[0].name);
  
        while(newElement5.attributes.length > 0)
          newElement5.removeAttribute(newElement5.attributes[0].name);
  
        while(newElement6.attributes.length > 0)
          newElement6.removeAttribute(newElement6.attributes[0].name);     
  
        let stims = [{
          stimulus:svg,
          correct_response: response,
          flanker_type: congruency,
          load: 6,
          trial_id :  "stim"
        }]
  
      for (let j = 0; j < stims.length; j++) {
        test_stimuli.push(stims[j])
        }
      } 
  }
  
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
 
  var respArr = []
  
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
        choices: ['x', 'n'],
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
    var pratice_procedure = {
        timeline: [prac_fixation, prac_display, pratice_display, feedback],
        timeline_variables: practice_block[i],
      };
  
    timeline.push(pratice_procedure);
  
    var end_block = {
      type: htmlKeyboardResponse,
      stimulus: '<div class = centerbox><p class = block-text>Most következik a kísérleti rész. A továbbiakban már nem fogsz visszajelzést kapni a válaszaidról</p><p>Nyomj meg egy gombot a folytatáshoz.</p></div>',
      trial_duration: 180000,
      data: {
        trial_id: "end block"
      },
      post_trial_gap: 1000
      };
  
    }
  
    timeline.push(end_block);
  
    let fix
    for (let i = 0; i < blocks.length; i++) {
      fix = {
          type: htmlKeyboardResponse,
          stimulus:  fixation.innerHTML,
          choices: "NO_KEYS",
          trial_duration: 1000,
          data: {
            task: 'fixation'
          }
        };
    
        var display = {
          type: htmlKeyboardResponse,
          stimulus: jsPsych.timelineVariable('stimulus'),
          choices: "NO_KEYS",
          trial_duration: 200
        };
    
        var test = {
          type: htmlKeyboardResponse,
          stimulus: "",
          choices: ['x', 'n'],
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
            var lasttrialdata = jsPsych.data.getLastTrialData();
            var respObj = {
              correct: lasttrialdata.trials[0].correct,
              rt : lasttrialdata.trials[0].rt,
              flanker_type: lasttrialdata.trials[0].flanker_type,
              load : lasttrialdata.trials[0].load
            }
            if(respObj.correct == true) respArr.push(respObj)
          }
        };
    
    var test_procedure = {
          timeline: [fix, display, test],
          timeline_variables: blocks[i],
        };
    
    timeline.push(test_procedure);
    
      var rest_block = {
        type: htmlKeyboardResponse,
        stimulus: '<div class = centerbox><p class = block-text>Most tarts egy rövid szünetet! Nyomj meg egy gombot a folytatáshoz.</p></div>',
        trial_duration: 180000,
        data: {
          trial_id: "rest block"
        },
        post_trial_gap: 1000
        };
      if(i != blocks.length-1) {
        timeline.push(rest_block);
      }
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
      var trials = jsPsych.data.get().filter({task:'response'});
      var correct_trials = trials.filter({correct: true});
      var incongruents = respArr.filter(arr=>arr.flanker_type=='incongruent')
      let allData = getData(respArr)
      let loads = calculateRt(allData)
      var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
      var rt = Math.round(correct_trials.select('rt').mean());
  
      return `<p>Válaszaid ${accuracy}%-a volt helyes.</p>
        <p>Átlagos válaszidőd: ${rt}ms.</p>
        <p>Nyomj meg egy gombot a kísérlet befejezéséhez. Köszönöm!</p>`;
  
    }
  };
  timeline.push(debrief_block);
  
  var exit_fullscreen = {
    type: jsPsychFullscreen,
    fullscreen_mode: false,
    delay_after: 0
  }
  
  timeline.push(exit_fullscreen);
  
    /*function saveData(name, data) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'write_data.php'); 
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({filename: name, filedata: data}));
    }*/
  
  /* start the experiment */
  jsPsych.run(timeline);
}