import { create } from "zustand";

import toast from 'react-hot-toast'

import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
    messages : [],
    users : [],
    selectedUser: null,
    isUsersLoading : false,
    isMessageLoading: false,

    getUsers: async () => {
        set({isUsersLoading: true});
        try{
                const res = await axiosInstance.get('/message/users');
                set({users: res.data});
                toast.success("Users loaded Successfully");
            }
        catch(err)
        {
            toast.error(err.response.data.message)
        }
        finally
        {
            set({isUsersLoading: false});
        }
    },

    getMessages: async (userId) => {
        set({isMessageLoading: true});
        try{
                const res = await axiosInstance.get(`/message/${userId}`);
                set({messages : res.data});
                toast.success("Messages Loaded successfully!");
        }
        catch(err)
        {
            toast.error(err.response.data.message)
        }
        finally
        {
            set({isMessageLoading: false});
        }
    },
    sendMessage : async (msgData) => {
        const {selectedUser, messages} = get();
        try{
                const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,msgData);
                set({ messages: [...messages, res.data] }); 
        }
        catch(err)
        {
            toast.error(err.response.data.message)
        }
    },
    
    setSelectedUser: (selectedUser) => {
        set({selectedUser})
    },
    subscribeToMessages: () => {
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;
        socket.on("newMessage",(newMessage) => {
            const isMsgfromSelUser = newMessage.senderId === selectedUser._id;
            if(!isMsgfromSelUser) return;
            set({messages : [...get().messages,newMessage]});
        });
    },

    unsubscribeFromMessages : () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    }
}))