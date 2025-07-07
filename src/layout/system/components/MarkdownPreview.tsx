import React, {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import {scrollToLocation} from "@@/function/scrollToTop.ts";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

function generateTOC(markdown: string): TocItem[] {
    const lines = markdown.split('\n');
    const toc: TocItem[] = [];
    for (const line of lines) {
        const match = line.match(/^(#{1,6})\s+(.*)/);
        if (match) {
            const level = match[1].length;
            const text = match[2].trim();
            // Match rehype-slug's behavior: convert to lowercase, trim, and replace spaces with dashes
            const id = text
                .toLowerCase()
                .trim()
                .replace(/[^\w\u4e00-\u9fa5\s-]/g, '') // Remove non-word characters except Chinese, space, and dash
                .replace(/\s+/g, '-'); // Replace whitespace with dash
            toc.push({level, text, id});
        }
    }
    return toc;
}

const MarkdownPreview: React.FC<{ markdown: string, show: boolean }> = ({markdown, show}) => {
    const [toc, setToc] = useState<TocItem[]>([]);

    useEffect(() => {
        setToc(generateTOC(markdown));
    }, [markdown]);

    return (
        <div className='preview-container'>
            {toc &&
                <aside className='preview-sidebar' style={show ? {display: 'none'} : {display: 'block'}}>
                    <h1>目录</h1>
                    <ul className='preview-menu'>
                        {toc.map((item) => (
                            <li className='preview-menu-item' key={item.id} style={{marginLeft: (item.level - 1) * 24}}>
                                <a onClick={() => scrollToLocation(item.id)}>{item.text}</a>
                            </li>
                        ))}
                    </ul>
                </aside>
            }
            <main className='preview-content' style={show ? {paddingLeft: "6rem"} : {paddingLeft: '1.6rem'}}>
                <ReactMarkdown
                    children={markdown}
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeSlug, rehypeHighlight]}
                    components={{
                        h1: ({node, ...props}) => <h1 id={String(props.children)} {...props} />,
                        h2: ({node, ...props}) => <h2 id={String(props.children)} {...props} />,
                        h3: ({node, ...props}) => <h3 id={String(props.children)} {...props} />,
                    }}
                />
            </main>
        </div>
    );
};

export default MarkdownPreview;