import React, {Component, ErrorInfo, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useTranslation} from '@@/layout/system/language/useTranslation.tsx';
import {LanguageProvider} from "@@/layout/system/language/LanguageProvider.tsx";
import {checkLanguage} from "@@/function/response.ts";

// 布局处理
export class ErrorBoundary extends Component<{ children: React.ReactNode }, {
    hasError: boolean;
    error: Error;
    info?: ErrorInfo;
}> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
            error: new Error(checkLanguage() ? "网页内部错误" : "ErrorBoundary Activated"),
            info: undefined
        };
    }

    static getDerivedStateFromError(_: Error) {
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            hasError: true,
            error: error,
            info: errorInfo
        });
    }

    render() {
        if (this.state.hasError) {
            return <LanguageProvider>
                <ErrorPage
                    error={this.state.error}
                    info={this.state.info}
                />
            </LanguageProvider>;
        }
        return this.props.children;
    }
}

// 请求处理
export const navigateToErrorPage = (code: string, message: string, path?: string) => {
    const navigatePath = path || null
    if (navigatePath) {
        window.location.href = `/error?code=${code}&message=${encodeURIComponent(message)}&path=${navigatePath}`;
    } else {
        window.location.href = `/error?code=${code}&message=${encodeURIComponent(message)}`;
    }
};

// 错误页面
export function ErrorPage({error, info}: { error?: Error, info?: ErrorInfo }) {
    const navigate = useNavigate();
    const translations = useTranslation();

    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code') || error?.name || '404';
    const defaultMessage = checkLanguage() ? "网页内部错误" : "Website Internal Error"
    const message = searchParams.get('message') || error?.message || defaultMessage;
    const path = searchParams.get('path') || '';
    
    const [timeLeft, setTimeLeft] = useState(10);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    navigate(path != undefined && path != 'undefined' && path != null && path != 'null' ? path : '/home');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="error">
            <h1>{code}</h1>
            <p className="message">{message}</p>
            <div className="timer">
                <p>{timeLeft}</p>
                <p className="fixd">{translations.error.info}</p>
                {path &&
                    <p className="home" onClick={() => navigate(path)}>{path}</p>
                }
                <p className="home" onClick={() => navigate('/home')}>Crocus</p>
            </div>
            {error?.stack && (
                <pre className="stack">{error.stack}</pre>
            )}
            {info?.digest && (
                <p className="message">{info.digest}</p>
            )}
            {info?.componentStack && (
                <pre className="stack">{info.componentStack}</pre>
            )}
        </div>
    );
}
