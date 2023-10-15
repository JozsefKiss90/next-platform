import { fetchSession } from "../../../hooks/sessionUtils"
import VisualMemoryTask from "./visualMemoryTask"
import withSessionTask from '../hocs/hocTest'
import visualMemoryPlugin from '../../../plugins/visualMemoryPlugin';
import { Dispatch, MutableRefObject, SetStateAction } from "react";

interface TaskProps {
  email?: string
  taskRef?: any
  setDisplayInstruction?:Dispatch<SetStateAction<boolean>>
}

function VisualMemoryPage(props:TaskProps) {
  return <VisualMemoryTask {...props} />
}

export async function getServerSideProps(context:any) {
  return await fetchSession(context.req) 
}

export default withSessionTask(visualMemoryPlugin, VisualMemoryPage);

