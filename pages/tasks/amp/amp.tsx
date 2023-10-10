import { fetchSession } from "../../../hooks/sessionUtils"
import Amp from "./ampTask"
import withSessionTask from '../hocs/hocTest'
import ampPlugin from '../../../plugins/ampPlugin';
import { Dispatch, MutableRefObject, SetStateAction } from "react";

interface TaskProps {
  email?: string
  taskRef?:  MutableRefObject<null>
  setDisplayInstruction?:Dispatch<SetStateAction<boolean>>
}

function AmpPage(props:TaskProps) {
  return <Amp {...props} />
}

export async function getServerSideProps(context:any) {
  return await fetchSession(context.req) 
}

export default withSessionTask(ampPlugin, AmpPage);

