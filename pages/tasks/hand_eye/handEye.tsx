import { fetchSession } from "../../../hooks/sessionUtils"
import HandEye from "./handEyeTask2"
import handEyePlugin from '../../../plugins/handEyePlugin';
import withSessionTask from '../../../hocs/Hoc'
import { TaskProps } from '../../../types/types';

function HandEyePage(props:TaskProps) {
  return <HandEye {...props} />
}

export async function getServerSideProps(context:any) {
  return await fetchSession(context.req)
}

export default withSessionTask(handEyePlugin, HandEyePage);