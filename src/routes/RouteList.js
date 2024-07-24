/**
 *  @description This file contains system's route list.
 */

import ChatScreen from "../components/pages/chat/ChatScreen.jsx"

import { URL_CHAT_SCREEN } from "../assets/constants/SitePath.js"

export const RouteList = [
    {
        path: URL_CHAT_SCREEN,
        exact: true,
        component: ChatScreen,
    },
]
