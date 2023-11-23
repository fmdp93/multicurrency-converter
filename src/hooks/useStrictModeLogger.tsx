import { useEffect, useState } from "react";

const useStrictModeLogger = () => {
    const [isStrictMode, setIsStrictMode]=useState(false);
    useEffect(()=>{
        if(isStrictMode){
            console.log('+++Non-Strict Mode+++');
        }else{
            console.log('+++Strict Mode+++');
        }
        
        return ()=>{
            setIsStrictMode(true);
        }
    })
}
 
export default useStrictModeLogger;