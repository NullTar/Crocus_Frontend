import "@@/css/i-index.css"
import {Suspense, useEffect} from "react";
import {Outlet} from "react-router-dom";

import TopBar from '@@/layout/index/Topbar.tsx';
import Foot from "@@/layout/index/Foot.tsx";
import {LanguageProvider} from "@@/layout/system/language/LanguageProvider.tsx";
import WithLoading from "@@/layout/system/Loading.tsx";
import {ErrorBoundary} from "@@/layout/system/Error.tsx";
import {initApplication} from "@@/ts/init.ts";

function App() {

    useEffect(() => {
        initApplication().finally()
    }, []);

    return (
        <Suspense>
            <WithLoading>
                <ErrorBoundary>
                    <LanguageProvider>
                        <TopBar/>
                        <Outlet/>
                        <Foot/>
                    </LanguageProvider>
                </ErrorBoundary>
            </WithLoading>
        </Suspense>
    );
}

export default App
