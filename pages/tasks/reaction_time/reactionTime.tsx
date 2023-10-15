import { fetchSession } from "../../../hooks/sessionUtils"
import ReactionTimeTask from "./reactionTimeTask"
import withSessionTask from '../hocs/hocTest'
import reactionTimePlugin from '../../../plugins/reactionTimePlugin';
import { Dispatch, MutableRefObject, SetStateAction } from "react";

interface TaskProps {
  email?: string
  taskRef?: any
  setDisplayInstruction?:Dispatch<SetStateAction<boolean>>
}

function ReactionTimePage(props:TaskProps) {
  return <ReactionTimeTask {...props} />
}

export async function getServerSideProps(context:any) {
  return await fetchSession(context.req) 
}

export default withSessionTask(reactionTimePlugin, ReactionTimePage);

