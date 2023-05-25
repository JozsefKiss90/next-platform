useEffect(() => {
    async function runTask(sessionEmail: string, redirectCallback: () => void) {
      const module = await import('../../public/static/hexagon/modules/hexagon');
      const hexagonModule = module.default; 
      let canvas = document.getElementById('canvas');
      let appendTens = document.getElementById('tens');
      let appendSeconds = document.getElementById('seconds');
      let appendMins = document.getElementById('mins');
      let props = {
        canvas: canvas,
        tens: appendTens,
        seconds: appendSeconds,
        mins: appendMins,
      };
      if (!props.canvas || !props.mins || !props.tens || !props.seconds) {
        setTimeout(() => {
          canvas = document.getElementById('canvas');
          appendTens = document.getElementById('tens');
          appendSeconds = document.getElementById('seconds');
          appendMins = document.getElementById('mins');
          props = {
            canvas: canvas,
            tens: appendTens,
            seconds: appendSeconds,
            mins: appendMins,
          };
          if (props.canvas && props.mins && props.tens && props.seconds) {
            hexagonModule(sessionEmail, redirectCallback, props);
          }
        }, 100);
      } else {
        hexagonModule(sessionEmail, redirectCallback, props);
      }
    }
    runTask(email!, handleRedirect);
  }, []);