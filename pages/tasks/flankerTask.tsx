import Script from 'next/script'
import Head from 'next/head'
import { useEffect } from 'react';

export default function Flanker() {

  useEffect(() => {
    async function runTask() {
      const module = await import('../../public/static/flanker.js');
      module.default();
    }
    runTask();
  }, []);

  return (
  <div>
    <Head>
    <link href="/static/flanker/jspsych-7.1/jspsych.css" rel="stylesheet" type="text/css"/>
    </Head>
    <Script src="/static/flanker/jspsych-7.1/jspsych.js" strategy="beforeInteractive"></Script>
    <Script src="/static/flanker/jspsych-7.1/plugin-html-keyboard-response.js" strategy="beforeInteractive"></Script>
    <Script src="/static/flanker/jspsych-7.1/plugin-image-keyboard-response.js" strategy="beforeInteractive"></Script>
    <Script src="/static/flanker/jspsych-7.1/plugin-preload.js" strategy="beforeInteractive"></Script>
    <Script src="/static/flanker/jspsych-7.1/plugin-survey-html-form.js" strategy="beforeInteractive"></Script>
    <Script src="/static/flanker/jspsych-7.1/plugin-call-function.js" strategy="beforeInteractive"></Script>
    <Script src="/static/flanker/jspsych-7.1/plugin-instructions.js" strategy="beforeInteractive"></Script>
    <Script src="/static/flanker/jspsych-7.1/plugin-fullscreen.js" strategy="beforeInteractive"></Script>
    <Script src="/static/flanker/jspsych-7.1/plugin-html-button-response.js" strategy="beforeInteractive"></Script>
    <Script src="/static/flanker/jspsych-7.1/plugin-survey-text.js" strategy="beforeInteractive"></Script>
    <Script src='/static/flanker.js'></Script>
  </div>
  )
}
