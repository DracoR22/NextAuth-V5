import { useCurrentUser } from "@/hooks/use-current-user";

const ServerPage = async () => {
  const user = await useCurrentUser();

  return ( 
    <></>
    // <UserInfo label="💻 Server component" user={user}/>
   );
}
 
export default ServerPage;