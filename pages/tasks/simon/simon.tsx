import { fetchSession } from "../../../hooks/sessionUtils"
import SimonTask from "./simonTask"
import withSessionTask from '../../../hocs/Hoc'
import simonPlugin from '../../../plugins/simonPlugin';
import { TaskProps } from '../../../types/types';

function SimonPage(props:TaskProps) {
  return <SimonTask {...props} />
}

export async function getServerSideProps(context: { req: any; }) {
  return await fetchSession(context.req) 
}

export default withSessionTask(simonPlugin, SimonPage); 

