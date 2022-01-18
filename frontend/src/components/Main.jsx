import React from 'react'
import { ToastContainer } from "react-toastify";

const MainSection = ({ children }) => {
    return (
        <main>
            <ToastContainer />
            {children}
        </main>
    )
}

export default MainSection
