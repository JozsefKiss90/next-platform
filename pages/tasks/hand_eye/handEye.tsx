import { fetchSession } from "../../../hooks/sessionUtils"
import HandEye from "./handEyeTask2"
import handEyePlugin from '../../../plugins/handEyePlugin';
import withSessionTask from '../hocs/hocTest'

interface TaskProps {
  email?: string;
  taskRef?: any;
}

function HandEyePage(props:TaskProps) {
  return <HandEye {...props} />
}

export async function getServerSideProps(context:any) {
  return await fetchSession(context.req)
}

export default withSessionTask(handEyePlugin, HandEyePage);