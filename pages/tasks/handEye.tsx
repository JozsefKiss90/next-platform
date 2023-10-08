import { fetchSession } from "../../hooks/sessionUtils";
import HandEye from "./handEyeTask2";
import { withSessionTask } from './hocTest'

function HandEyePage(props:any) {
  return <HandEye {...props} />;
}

export async function getServerSideProps(context:any) {
  return await fetchSession(context.req);
}

export default withSessionTask(HandEyePage);