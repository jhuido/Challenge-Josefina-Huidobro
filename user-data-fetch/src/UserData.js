import { useEffect, useState } from 'react';
import { IoAdd,IoRemove } from "react-icons/io5";
import { motion } from 'framer-motion';
import Data from './Data';

function UserData() {

    const [id, setId]=useState(1)
    const [loading,setLoading]=useState(false)
    const [message, setMessage]=useState("")
    const [user, setUser]=useState({})

    useEffect(()=> {
        const fetchUserData = async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
                const data = await response.json();
                setUser(data);
                setLoading(false)
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
        setMessage("")
    },[id])

    

    const increment=()=>{
        id < 10 ? setId(id+1)  : setMessage("The counter cannot go over of 10")
    }

    const decrement=()=>{
        id > 1 ? setId(id-1) : setMessage("The counter cannot go below 1")
    }
    
  return (
    <motion.div className=" bg-neutral-300 m-5 p-4 rounded-md w-full md:w-3/4 lg:w-2/5 flex flex-col sm:flex-row justify-around items-center  "
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}>
        <div className='w-full sm:w-2/5 flex justify-center flex-col items-center'>
            <h1 className='text-center text-xl font-semibold p-2 bg-teal-600 rounded-md text-white w-full sm:w-4/5'>USER DATA</h1>
            <div className='flex flex-col lg:flex-row px-5 pt-5 pb-2 justify-around items-center w-full'>
                <h2 className='text-lg font-bold py-3 sm:py-0'>User ID</h2>
                <div className='flex w-2/3 max-w-40 sm:w-3/4 lg:w-1/2 mx-0  lg:mx-2 bg-white px-4 lg:px-2  py-1  justify-around items-center rounded-xl'>
                    <IoRemove  onClick={decrement} className='text-xl font-bold  text-neutral-950 hover:text-neutral-600'/>
                    <motion.p className='text-xl font-bold  text-neutral-950 ' 
                    key={id}
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}>{id}</motion.p>
                    <IoAdd onClick={increment}  className='text-xl  font-bold text-neutral-950 hover:text-neutral-600'/>
                </div>
            </div>
            {message && <motion.p className='text-red-700 font-bold text-md sm:text-sm w-2/3 lg:w-4/5 text-center'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{opacity: 0, y: 20}}
            transition={{ duration: 0.3 }}>*{message}</motion.p>}
        </div>
        <div className='w-full sm:w-3/5 py-5 sm:py-0'>
            <div className="flex items-center justufy-start flex-row ">
                <h2 className='text-teal-800 font-bold text-xl sm:text-lg py-2 '>User information</h2>
                {loading && <p className='bg-cyan-900 px-2 sm:px-4 py-1 mx-2 sm:mx-5 rounded-xl text-white font-bold w-1/3 sm:w-full'>Loading...</p>}
            </div>
            <div>
                <Data label="Username" info={user.username} />
                <Data label="Website" info={user.website} />
                <Data label="Email" info={user.email} />
                <Data label="Phone" info={user.phone} />
            </div>
        </div>
    </motion.div>
  );
}

export default UserData;