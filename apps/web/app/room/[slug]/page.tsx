// import { BACKEND_URL } from "./config";
// import axios from "axios";
// import ChatRoomClient from "../../../components/ChatRoomClient";
// async function getRoom(slug: string) {
//     const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
//     return response.data.id;
// }

import ChatRoom from "../../../components/ChatRoom"

// export default async function ChatRoom({params}: {params: Promise<{slug: string}>}) {
//     const slug = (await params).slug;
//     const roomId = await getRoom(slug);

//     return (
//         <div>
//             <ChatRoomClient id={roomId} messages={[]} />
//         </div>
//     )
// }

// import axios from "axios";
// import { BACKEND_URL } from "../../config";

// async function getRoomId(slug: string) {
//     const response = await axios.get(`${BACKEND_URL}/room/${slug}`)
//     console.log(response.data);
//     return response.data.room.id;
// }

export default async function({
    params
}: {
    params: {
        slug: string
    }
}) {
    // const slug = (await params).slug;
    // const roomId = await getRoomId(slug);
    
    // return <ChatRoom id={roomId}></ChatRoom>
    return <div>
        <ChatRoom id={"123"}></ChatRoom>
    </div>

}