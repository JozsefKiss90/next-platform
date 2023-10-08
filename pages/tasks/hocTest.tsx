import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import handEyePlugin from "../../plugins/handEyePlugin";

export function withSessionTask(WrappedComponent:any) {
  return function SessionTaskComponent(props:any) {
    const trialsRef = useRef(null);
    const { data: session } = useSession();

    useEffect(() => {
      const trials = trialsRef.current;

      if (props.email && trials && session) {
        const cleanup = handEyePlugin.initialize(props.email, trials);
        return () => {
          cleanup && cleanup();
        };
      }
    }, [session, props.email]);

    if (session) {
      return <WrappedComponent {...props} trialsRef={trialsRef} />;
    }

    return null;
  };
}
