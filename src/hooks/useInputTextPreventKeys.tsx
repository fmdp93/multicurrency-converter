import { useEffect } from "react";

const useInputTextPreventKeys = (inputRef, allowedKeys) => {    
    useEffect(()=>{
        inputRef.current.addEventListener("keydown", function(e){
            // console.log(e.ctrlKey);
            // console.log(e.metaKey);
            // console.log(e.code);
            // Ctrl / Cmd A, C, V
            let allowedCtrlKeys = ['KeyC', 'KeyV', 'KeyA', 'KeyR', 'KeyX'];

            if((e.ctrlKey || e.metaKey) && allowedCtrlKeys.includes(e.code)){
                console.log(true);
                return;
            }

            console.log(e.key)
            if(!(allowedKeys.includes(e.key))){
                e.preventDefault();
            }
        })
    },[])
}
 
export default useInputTextPreventKeys;