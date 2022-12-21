import Script from 'next/script'
import Head from 'next/head'

export default function Page() {
  return (
  <div>
    <Head>
      <link href="https://unpkg.com/jspsych@7.3.1/css/jspsych.css" rel="stylesheet" type="text/css" />
    </Head>
    <Script src="https://unpkg.com/jspsych@7.3.1" strategy="beforeInteractive"></Script>
    <Script src="https://unpkg.com/@jspsych/plugin-html-keyboard-response@1.1.2" strategy="beforeInteractive"></Script>
    <Script src="https://unpkg.com/@jspsych/plugin-image-keyboard-response@1.1.2" strategy="beforeInteractive"></Script>
    <Script src="https://unpkg.com/@jspsych/plugin-preload@1.1.2" strategy="beforeInteractive"></Script>
    <Script src='/static/task.js'></Script>
  </div>
  )
}
