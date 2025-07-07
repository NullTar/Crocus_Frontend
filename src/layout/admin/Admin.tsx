import "@@/css/a-admin.css"
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useState, useEffect} from 'react';

import ArticleIcon from "@@/assets/icons/admin/article.svg"
import BookIcon from "@@/assets/icons/admin/book.svg"
import DashboardIcon from "@@/assets/icons/admin/dashboard.svg"
import SystemIcon from "@@/assets/icons/admin/system.svg"
import AdminIcon from "@@/assets/icons/admin/admin.svg"
import QuestionIcon from "@@/assets/icons/admin/question.svg"
import QuizIcon from "@@/assets/icons/admin/quizz.svg"
import React, {Suspense} from "react";
import {Pop} from "@@/layout/system/components/GlobalPop.tsx";
import ArticleForm from "@@/layout/admin/form/ArticleForm.tsx";
import BookForm from "@@/layout/admin/form/BookForm.tsx";
import QuizForm from "@@/layout/admin/form/QuizForm.tsx";
import RoleForm from "@@/layout/admin/form/RoleForm.tsx";
import QuestionForm from "@@/layout/admin/form/QuestionForm.tsx";

type LinkItem = {
    icon: string,
    itemName: string,
    linkTo: string,
}

enum Management {
    Dashboard = "Dashboard",
    Article = "Article",
    Book = "Book",
    Question = "Question",
    Quiz = "Quiz",
    Role = "Role",
    System = "System"
}

const LinkItem: React.FC<LinkItem> = ({icon, itemName, linkTo}) => {
    return (
        <div className="link-item" key={itemName}>
            <svg height="20" width="20" key={itemName + 'item'}>
                <image href={icon} height="20" width="20"/>
            </svg>
            <Link to={linkTo} className="linkItem">{itemName}</Link>
        </div>
    )
}

export default function Admin() {

    const navigate = useNavigate();
    const [operation, setOperation] = useState('')
    const [showPop, setShowPop] = useState(false)

    useEffect(() => {
        // 刷新后保持不变
        const path = window.location.pathname.toLowerCase();
        if (path.includes("article")) setOperation(Management.Article);
        else if (path.includes("book")) setOperation(Management.Book);
        else if (path.includes("question")) setOperation(Management.Question);
        else if (path.includes("quiz")) setOperation(Management.Quiz);
        else if (path.includes("role")) setOperation(Management.Role);
        else if (path.includes("system")) setOperation(Management.System);
        else {
            setOperation(Management.Dashboard);
            navigate(Management.Dashboard.toLowerCase());
        }
    }, []);

    const renderPopupContent = () => {
        switch (operation) {
            case Management.Article:
                return <ArticleForm handle={setShowPop}/>;
            case Management.Book:
                return <BookForm handle={setShowPop}/>;
            case Management.Question:
                return <QuestionForm handle={setShowPop}/>;
            case Management.Quiz:
                return <QuizForm/>
            case Management.Role:
                return <RoleForm/>
            default:
                return <div>未知操作</div>;
        }
    };


    return (
        <Suspense>
            <div className="admin">
                <nav className="sidebar">
                    <div className="title">Crocus</div>
                    <div className="link">
                        <div onClick={() => setOperation(Management.Dashboard)}>
                            <LinkItem icon={DashboardIcon}
                                      itemName="面板"
                                      linkTo={Management.Dashboard.toLowerCase()}></LinkItem>
                        </div>
                        <div onClick={() => setOperation(Management.Article)}>
                            <LinkItem icon={ArticleIcon}
                                      itemName="文章"
                                      linkTo={Management.Article.toLowerCase()}></LinkItem>
                        </div>
                        <div onClick={() => setOperation(Management.Book)}>
                            <LinkItem icon={BookIcon}
                                      itemName="图书"
                                      linkTo={Management.Book.toLowerCase()}></LinkItem>
                        </div>
                        <div onClick={() => setOperation(Management.Question)}>
                            <LinkItem icon={QuestionIcon}
                                      itemName="问题"
                                      linkTo={Management.Question.toLowerCase()}></LinkItem>
                        </div>
                        <div onClick={() => setOperation(Management.Quiz)}>
                            <LinkItem icon={QuizIcon}
                                      itemName="题目"
                                      linkTo={Management.Quiz.toLowerCase()}></LinkItem>
                        </div>
                        <div onClick={() => setOperation(Management.Role)}>
                            <LinkItem icon={AdminIcon}
                                      itemName="角色"
                                      linkTo={Management.Role.toLowerCase()}></LinkItem>
                        </div>
                        <div onClick={() => setOperation(Management.System)}>
                            <LinkItem icon={SystemIcon}
                                      itemName="系统"
                                      linkTo={Management.System.toLowerCase()}></LinkItem>
                        </div>
                    </div>
                    <button className="button">登出</button>
                </nav>
                <div className="content">
                    {operation !== Management.Dashboard && operation !== Management.System &&
                        <div className="search-input" style={{height: "auto"}}>
                            <input type='text' placeholder={"search " + operation.toLowerCase()} className="input"/>
                            <button className="button"
                                    style={{marginLeft: "1rem"}}
                            >搜索
                            </button>
                            <button className="button"
                                    style={{marginLeft: "1rem"}}
                                    onClick={() => {
                                        setShowPop(!showPop)
                                    }}>新建
                            </button>
                        </div>
                    }
                    <Outlet/>
                </div>
                <Pop isOpen={showPop}
                     title={"New    " + operation}
                     onClose={() => setShowPop(false)}>
                    {renderPopupContent()}
                </Pop>
            </div>
        </Suspense>
    )
}




