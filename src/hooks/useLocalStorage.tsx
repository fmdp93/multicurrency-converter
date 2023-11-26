export const useLocalStorage = () => {
    const setItem = (key: string, value: string | Array<unknown> | object) => {
        try{
            value = JSON.stringify(value);
            window.localStorage.setItem(key, value);
        }catch(error) {
            console.log(error);
        }
    }

    const removeItem = (key: string) => {
        try{
            window.localStorage.removeItem(key);
        }catch(error) {
            console.log(error);
        }
    }

    const getItem = (key: string): string | null => {
        let item: string | null = "";
        try{
            item = window.localStorage.getItem(key);
        }catch(error) {            
            console.log(error);
        }         
        return item;
    }
    return {
        setItem, removeItem, getItem
    };
}