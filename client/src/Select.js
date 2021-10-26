import { useState } from "react";

const Select = ({name, select}) => {
    return(
        <div className="select">
            {name.length ? name.map((item) => 
                <div className="select_item" onClick={()=>select(item.login)}>
                    {item.login}
                </div>) : <span>Didn`t find such login</span>}
        </div>
    )
}

export default Select;