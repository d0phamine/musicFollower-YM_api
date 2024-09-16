import { FC } from "react";
import { Button} from "antd";
import { StarOutlined } from "@ant-design/icons";

import "./index.scss"

export interface ComponentProps  { 
    children: React.ReactNode
 }

export const ImageCard:FC<ComponentProps> = ({children}) => {
    return(
        <div className="image-card">
            {children}
            <div className="image-card__footer">
                <Button><StarOutlined style={{color:"#7f6bce"}}/></Button>
            </div>
        </div>
    )
}