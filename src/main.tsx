import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import Router from "@@/layout/system/Router.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <>
        <React.StrictMode>
            <RouterProvider router={Router}/>
        </React.StrictMode>
    </>
)




