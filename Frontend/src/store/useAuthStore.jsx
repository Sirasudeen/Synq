import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import { io } from "socket.io-client"
import toast from 'react-hot-toast'
export const useAuthStore = create((set,get) => ({ 
    authUser: null,
    isSigningUp : false,
    isLoggingIn: false,
    isCheckingAuth: true,
    isUpdatingProfile: false,
    socket : null,
    onlineUsers: [],
    checkAuth: async() => {
        try{
            const res = await axiosInstance.get("/auth/check-auth");
            set({authUser:res.data})
            get().connectSocket();
        }   
        catch(err)
        {
            set({authUser:null});
            console.log("Error in auth",err)
        }
        finally{
            set({isCheckingAuth: false});
        }
    },

    signup : async(data) => {
            set({isSigningUp : true});
            try{
                const res = await axiosInstance.post("/auth/signup",data);
                toast.success("Account created Successfully");
                set({authUser: res.data});
                get().connectSocket();

            }
            catch(err)
            {
                toast.error(err.response.data.message)
            }
            finally{
                set({isSigningUp: false});
            }
    },
     logout: async() => {
    try{
            await axiosInstance.post("/auth/logout");
            toast.success("Account Logged out successfully");
            set({authUser:null})
            get().disconnectSocket();
    }
    catch(err){
                toast.error(err.response.data.message)
    }

},

login : async(data) => {
    set({isLoggingIn : true});
    try{
        const res = await axiosInstance.post('/auth/login',data);
        set({authUser : res.data});
        toast.success("Logged in successfully");
        get().connectSocket();
    }
    catch(err)
    {
                        toast.error(err.response.data.message)

    }
    finally{
        set({isLoggingIn:false});
    }
},
updateProfile: async (data) => {
    set({isUpdatingProfile: true});
    try{
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({authUser: res.data});
            toast.success("Profile updated successfully");
    }   
    catch(err)
    {
            toast.error(err.response.message);
    }
    finally
    {
        set({isUpdatingProfile: false});
    }
},
connectSocket : () => {
    const {authUser} = get();
    if(!authUser || get().socket?.connected) return;
    const socket = io("http://localhost:5001",{
        query:{
            userId: authUser._id,
        }
    })
    socket.connect();
    set({socket: socket});
    socket.on("getOnlineUsers",(userIds) => {
        set({onlineUsers: userIds});
    })
},
disconnectSocket : ()=> {
    if(get().socket?.connected) get().socket.disconnect();
}
}))

       