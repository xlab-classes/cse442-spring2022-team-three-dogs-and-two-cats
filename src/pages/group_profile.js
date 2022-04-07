
import React, { useEffect } from 'react'
import {useLocation} from 'react-router-dom'



const GroupProfile= () => {
    let location = useLocation();
    useEffect(() => {
        console.log(location.pathname); // result: '/secondpage'
        console.log(location.state.code); // result: 'some_value'
     }, [location]);
    

    return(
        <div> ClassCode:{location.state.code} </div>
    )
}
export default GroupProfile
