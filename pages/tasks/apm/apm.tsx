import { fetchSession } from "../../../hooks/sessionUtils"
import Apm from "./ampTask"
import withSessionTask from '../../../hocs/Hoc'
import apmPlugin from '../../../plugins/apmPlugin';
import { TaskProps } from '../../../types/types';


function ApmPage(props:TaskProps) {
  return <Apm {...props}/>
}

export async function getServerSideProps(context:any) {
  return await fetchSession(context.req) 
}

export default withSessionTask(apmPlugin, ApmPage);

