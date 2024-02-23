import React, { ReactNode } from "react";
import "./Layout.css";

interface Props {
    children: ReactNode;
}
const Layout: React.FC<Props> = ({ children }) => {
    return <div>{children}</div>;
};

export default Layout;
