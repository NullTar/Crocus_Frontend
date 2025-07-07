import {lazy} from "react";
import {createBrowserRouter} from "react-router-dom";
import {Navigate} from "react-router-dom";

import App from "@@/layout/index/App.tsx"
import Home from "@@/layout/index/main/Home.tsx";
import {LanguageProvider} from "@@/layout/system/language/LanguageProvider.tsx";
import WithLoading from "@@/layout/system/Loading.tsx";
import {ErrorBoundary, ErrorPage} from "@@/layout/system/Error.tsx";

const Help = lazy(() => import('@@/layout/index/other/Help.tsx'));
const FAQ = lazy(() => import('@@/layout/index/other/FAQ.tsx'));
const Privacy = lazy(() => import('@@/layout/index/other/Privacy.tsx'));

const Login = lazy(() => import('@@/layout/system/Login'));
const Admin = lazy(() => import('@@/layout/admin/Admin.tsx'))
const Article = lazy(() => import('@@/layout/admin/page/Article.tsx'))
const Book = lazy(() => import('@@/layout/admin/page/Book.tsx'));
const Question = lazy(() => import('@@/layout/admin/page/Question.tsx'))
const Role = lazy(() => import('@@/layout/admin/page/Role.tsx'));
const Dashboard = lazy(() => import('@@/layout/admin/page/Dashboard.tsx'));
const Quiz = lazy(() => import('@@/layout/admin/page/Quiz.tsx'));
const System = lazy(() => import('@@/layout/admin/page/System.tsx'));
const ArticleDetail = lazy(() => import('@@/layout/system/components/ArticleDetail.tsx'))
const PersonalDetail = lazy(() => import('@@/layout/system/components/PersonalDetail.tsx'))

const Router = createBrowserRouter([

    {
        path: "*",
        element: <LanguageProvider><ErrorPage/></LanguageProvider>,
    },
    {
        path: "/", element: <App/>, children: [
            {index: true, element: <Navigate to="/home"/>},
            {path: "home", element: <Home/>},
            {path: "help", element: <Help/>},
            {path: "FAQ", element: <FAQ/>},
            {path: "privacy", element: <Privacy/>},
            {path: "profile", element: <PersonalDetail/>},
        ]
    },
    {
        path: "/article-detail", element: <ArticleDetail/>,
    },
    {
        path: "login",
        element: <WithLoading>
            <ErrorBoundary>
                <LanguageProvider>
                    <Login/>
                </LanguageProvider>
            </ErrorBoundary>
        </WithLoading>,
    },
    {
        path: "crocus/admin", element: <Admin/>, children: [
            {path: "dashboard", element: <Dashboard/>,},
            {path: "article", element: <Article/>,},
            {path: "book", element: <Book/>,},
            {path: "question", element: <Question/>,},
            {path: "quiz", element: <Quiz/>,},
            {path: "role", element: <Role/>,},
            {path: "system", element: <System/>}
        ]
    }
]);

export default Router;