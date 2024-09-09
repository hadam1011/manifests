import { Menu } from "antd";
import { useHistory } from 'react-router-dom'
import { useState } from "react";
import { navItems } from "../../const";

const SideBar = () => {
    const [currentKey, setCurrentKey] = useState('1');
    const navigate = useHistory();
  
    const handleClickMenuItem = (e) => {
      setCurrentKey(e.key);
      switch (e.key) {
        case '1': 
          navigate.push("/home");
          break;
        case '2':
          navigate.push("/databases");
          break;
        case '3':
          navigate.push("/metrics");
          break;
        case '4':
          navigate.push("/queries");
          break;
        case '5':
          navigate.push("/users");
          break;
        default:
          break;
      }
    }

    return (
        <>
            <div style={{padding: '2rem'}} />
            <Menu
                theme="dark"
                mode="vertical"
                selectedKeys={currentKey}
                items={navItems}
                onClick={handleClickMenuItem}
            />
        </>
    )
}

export default SideBar;