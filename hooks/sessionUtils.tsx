import { getSession } from "next-auth/react";

export async function fetchSession(req:any) {
  const session = await getSession({ req });
  const email = session?.user?.email || null;

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { email },
  };
}
