

export const getData = (myData) => {
   
    let data = JSON.parse(localStorage.getItem(myData));
 
     if (!data) {
         return [];
     }
     return data;
 }
 
 export const setData = (key,data) =>{
     localStorage.setItem(key,JSON.stringify(data));
 }