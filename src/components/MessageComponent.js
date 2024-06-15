import { getLineProfile } from "@/_actions/getLineProfileAction"
import { useEffect, useState } from 'react'


export default function MessageComponent({ text, time, platform, userId }) {
  const [profile, setProfile] = useState({
    displayName: "Loading..",
    pictureUrl: "https://i.pravatar.cc/100"
  })
  const getProfile = async () => {
    let { displayName, pictureUrl } = await getLineProfile(userId)
    if(pictureUrl == null){
      pictureUrl='https://i.pravatar.cc/100?u=poc123'
    }
    setProfile({ displayName, pictureUrl })
  }

  useEffect(() => {
    if (platform == 'line') {
      getProfile()
    }
  }, [])

  return (
    <div class="flex items-center justify-between p-3 ">
      <div class="flex items-center gap-x-3">
        <img src={profile.pictureUrl} alt="Tania Andrew"
          class="relative inline-block h-9 w-9 rounded-full object-cover object-center" />
        <div>
          <h6
            class="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
            {profile.displayName}
          </h6>
          <p class="block max-h-10 overflow-hidden font-sans text-sm font-light leading-normal text-gray-700 antialiased">
            {text}
          </p>
        </div>
      </div>
      <div className="float-end">
        <h6 class="block font-sans text-xs font-light leading-normal text-end">
          {new Date(time).toLocaleDateString()}
        </h6>
        <h6 class="block font-sans text-xs font-light leading-normal text-end">
          {new Date(time).toLocaleTimeString()}
        </h6>
      </div>
    </div>
  )
}