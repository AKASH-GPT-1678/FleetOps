import React from 'react'

export const ChatPage = () => {
    const chats = [
  { me: "Hooo how are you?" },
  { ramesh: "I'm good! What about you?" },
  { me: "Doing well, just working on a project." },
  { ramesh: "Sounds great! Need any help?" },
  { me: "Maybe later, thanks!" },
  { ramesh: "Cool, just let me know." },
  { me: "What are you up to today?" },
  { ramesh: "Just finished lunch. Thinking to watch a movie." },
  { me: "Oh nice! Which one?" },
  { ramesh: "Maybe 'Inception' again. I love that movie." },
  { me: "Haha, a classic! Never gets old." },
  { ramesh: "Exactly! The ending still blows my mind." },
  { me: "Totally. I still wonder if it was a dream or not." },
  { ramesh: "Nolan really knows how to confuse us 😄" },
  { me: "True! Anyway, are you free tomorrow?" },
  { ramesh: "Yeah, I think so. Why?" },
  { me: "Thinking of catching up over coffee." },
  { ramesh: "Sounds good. Let’s meet at CCD?" },
  { me: "Perfect! 5 PM works?" },
  { ramesh: "Done. See you there!" },
  { me: "Great! Don’t be late 😄" },
  { ramesh: "Haha, I’ll try my best!" }
];

  return (
    <div className='flex flex-col p-2 w-full h-full'>
        {
            chats.map((chat, index) => {
                return (
                    <div className='flex flex-row gap-2 items-center mb-2' key={index}>
                        <div className={`flex flex-row gap-2 items-center ${Object.keys(chat)[0] == "ramesh" ?'float-right' : "float-left"}`}>
                            <img src="https://res.cloudinary.com/dffepahvl/image/upload/v1751009225/r0lxzjpiemrkrwrcakbq.png" alt="logo" className='w-[30px] h-[30px]' />    
                            <p>{Object.keys(chat)[0]}</p>
                        </div>    
                        <p>{Object.values(chat)[0]}</p>
                    </div>
                )
            })
        }


    </div>
  )
}
