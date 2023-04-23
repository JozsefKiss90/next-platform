import Head from 'next/head';
import { useEffect } from 'react';
import Script from "next/script";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#&@$ß*!?%";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const sub_id = generateString(6);
const sub_id2 = sub_id.concat("_2");
const sub_id3 = sub_id.concat("_3");

function saveData(name, data) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "write_data.php");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ filename: name, filedata: data }));
}

function savePerf(name, data) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "write_perf.php");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ filename: name, filedata: data }));
}

function saveVals(name, data) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "write_vals.php");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({ filename: name, filedata: data }));
}

function collectData() {
  return JSON.stringify(resparr);
}

function collectPerf() {
  return JSON.stringify(perf);
}

function collectVals() {
  return JSON.stringify(valarr);
}


export default function NetworkTask(){
  useEffect(() => {
    console.log('wtf')
        jsPsych.init({
          timeline: attention_network_task_experiment,
          exclusions: {
            min_width: 5000,
            min_height: 5000,
            audio: true,
          },
          display_element: "getDisplayElement",
          fullscreen: true,
          on_trial_finish: function (data) {
            addID("attention-network-task");
          },
          on_finish: function () {
            saveData("experiment_data_".concat(sub_id), collectPerf()),
              savePerf("experiment_data_".concat(sub_id2), collectData()),
              saveVals("experiment_data_".concat(sub_id3), collectVals());
          },
        });
      }, [0]);
    

  return ( 
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='robots' content='noindex' />
        <title>Esport Metrics</title>
        <link rel='stylesheet' type='text/css' href='/static/networks/jspsych.css' />
        <link rel='stylesheet' type='text/css' href='/static/networks/default_style.css' />
        <link rel='stylesheet' type='text/css' href='/static/networks/style.css' />
      </Head>
     
        <Script src='/static/networks/js/jquery.min.js' strategy="beforeInteractive"/>
        <Script src='/static/networks/js/math.min.js'strategy="beforeInteractive"/>
        <Script src='/static/networks/js/jspsych/jspsych.js'strategy="beforeInteractive"/>
        <Script src='/static/networks/js/jspsych/plugins/jspsych-text.js'strategy="beforeInteractive"/>
        <Script src='/static/networks/js/jspsych/poldrack_plugins/jspsych-poldrack-text.js'strategy="beforeInteractive"/>
        <Script src='/static/networks/js/jspsych/poldrack_plugins/jspsych-poldrack-categorize.js'strategy="beforeInteractive"/>
        <Script src='/static/networks/js/jspsych/poldrack_plugins/jspsych-poldrack-instructions.js'strategy="beforeInteractive"/>
        <Script src='/static/networks/js/jspsych/plugins/jspsych-call-function.js'strategy="beforeInteractive"/>
        <Script src='/static/networks/js/jspsych/poldrack_plugins/jspsych-attention-check.js'strategy="beforeInteractive"/>
        <Script src='/static/networks/js/jspsych/poldrack_plugins/jspsych-poldrack-single-stim.js'strategy="beforeInteractive"/>
        <Script src='/static/networks/js/jspsych/plugins/jspsych-survey-text.js'strategy="beforeInteractive"/>
        <Script src='/static/networks/js/jspsych/plugins/jspsych-html.js'strategy="beforeInteractive"/>
        <Script src='/static/networks/js/jspsych/poldrack_plugins/jspsych-single-stim-button.js'strategy="beforeInteractive"/>
        <Script src='/static/networks/js/jspsych/poldrack_plugins/poldrack_utils.js'strategy="beforeInteractive"/>
        <Script src='/static/networks/experiment_test_4.js'strategy="beforeInteractive"/>    
      </>
      )
  }
 