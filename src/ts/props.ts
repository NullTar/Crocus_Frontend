import {ReactNode} from "react";
import {ArticleData, BookData, Operation, UserRegisterFormData} from "@@/ts/model.ts";

export type ListContent = {
    title: string,
    context: React.ReactNode,
    subContent?: React.ReactNode
}

export type Hlight = {
    label: string,
    text: string
    
}

export type FileProp = {
    multiple?: boolean
    type: string,
    onFileSelect: (files: FileList | null) => void;
};

export interface BookDetailProps {
    book: BookData;
}

export interface ArticleDetailProps {
    article: ArticleData;
}

export interface WithLoadingProps {
    children: ReactNode;
}

export interface ModalProps {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void
}

export interface VerifyCodeProps {
    operation: Operation;
    value: UserRegisterFormData;
    placeholder: string;
    onVerify: (result: boolean) => void;
}

export interface MarkDownProps {
    value: string;
    onChange: (val: string) => void;
    saveEditContent: () => void
    onSave?: () => void;
    onUploadImg: (files: File[], callback: (urls: string[]) => void) => void;
    previewTheme: string;
}

export type animationProps = {
    title: string,
    info: string
}