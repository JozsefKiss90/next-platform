import { fetchSession } from "../../../hooks/sessionUtils"
import ReactionTimeTask from "./reactionTimeTask"
import withSessionTask from '../../../hocs/Hoc'
import reactionTimePlugin from '../../../plugins/reactionTimePlugin';
import { TaskProps } from '../../../types/types';

function ReactionTimePage(props:TaskProps) {
  return <ReactionTimeTask {...props} />
}

export async function getServerSideProps(context: { req: any; }) {
  return await fetchSession(context.req) 
}

export default withSessionTask(reactionTimePlugin, ReactionTimePage);

