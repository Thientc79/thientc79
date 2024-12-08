import { Outlet } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";

export const LayoutComponent=()=>{
    return (
        <>
          <NavbarComponent />
          <main style={{ padding: '1rem' }}>
            <Outlet />
          </main>
        </>
      );
}