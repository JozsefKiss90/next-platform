import { fetchSession } from "../../../hooks/sessionUtils"
import Simon from "./simonTask"
import withSessionTask from '../hocs/hocTest'
import simonPlugin from '../../../plugins/simonPlugin';
import { Dispatch, MutableRefObject, SetStateAction } from "react";

interface TaskProps {
  email?: string
  taskRef?: any
  setDisplayInstruction?:Dispatch<SetStateAction<boolean>>
}

function SimonPage(props:TaskProps) {
  return <Simon {...props} />
}

export async function getServerSideProps(context:any) {
  return await fetchSession(context.req) 
}

export default withSessionTask(simonPlugin, SimonPage);

