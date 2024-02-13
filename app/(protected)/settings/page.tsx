import { auth, signOut } from "@/auth"
import { cookies } from "next/dist/client/components/headers"

const SettingsPage = async () => {

   const session = await auth()

   // GET THE TOKEN FROM COOKIES
   
  //  const cook = cookies()
  //  const allCookies = cook.getAll()
  //  allCookies.forEach((cookie) => {
  //    console.log(cookie.name)
  //    console.log(cookie.value)
  //  })

  return (
    <div>
      {JSON.stringify(session)}
      <form action={async () => {
        "use server";

        await signOut()
      }}>
        <button type="submit">
           Sign Out
           
        </button>
      </form>
    </div>
  )
}

export default SettingsPage