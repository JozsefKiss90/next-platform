import { fetchSession } from "../../../hooks/sessionUtils"
import VisualMemoryTask from "./visualMemoryTask"
import withSessionTask from '../../../hocs/Hoc'
import visualMemoryPlugin from '../../../plugins/visualMemoryPlugin';
import { TaskProps } from '../../../types/types';

function VisualMemoryPage(props:TaskProps) {
  return <VisualMemoryTask {...props} />
}

export async function getServerSideProps(context: { req: any; }) {
  return await fetchSession(context.req) 
}

export default withSessionTask(visualMemoryPlugin, VisualMemoryPage);

