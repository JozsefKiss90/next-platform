import { fetchSession } from "../../../hooks/sessionUtils"
import Amp from "./ampTask"
import withSessionTask from '../hocs/hocTest'
import ampPlugin from '../../../plugins/ampPlugin';

function AmpPage(props:any) {
  console.log('AmpPage is rendering'); 
  return <Amp {...props} />
}

export async function getServerSideProps(context:any) {
  return await fetchSession(context.req) 
}

export default withSessionTask(ampPlugin)(AmpPage)
