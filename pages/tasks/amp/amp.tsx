import { fetchSession } from "../../../hooks/sessionUtils"
import Amp from "./ampTask"
import withSessionTask from '../../../hocs/Hoc'
import ampPlugin from '../../../plugins/ampPlugin';
import { TaskProps } from '../../../types/types';


function AmpPage(props:TaskProps) {
  return <Amp {...props} />
}

export async function getServerSideProps(context:any) {
  return await fetchSession(context.req) 
}

export default withSessionTask(ampPlugin, AmpPage);

