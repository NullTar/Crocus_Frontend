import {useState} from "react";
import {useTranslation} from "@@/layout/system/language/useTranslation.tsx";
import {searchLike} from "@@/ts/request/search.ts";
import {BookData, QuestionData, SearchContent, SearchList, SearchType} from "@@/ts/model.ts";
import {Pop} from "@@/layout/system/components/GlobalPop.tsx";
import {keywordKey, searchDataKey} from "@@/function/localStorage.ts";
import {queryByUUID} from "@@/ts/request/common.ts";
import {Common_Api} from "@@/ts/api.ts";
import {BookDetail} from "@@/layout/system/components/BookDetail.tsx";
import {renderMultilineText} from "@@/layout/system/components/renderMultilineText.tsx";

export default function Search() {

    const [key, setKey] = useState("");
    const [tipText, setTipText] = useState("");
    const [searchResult, setSearchResult] = useState<SearchList | undefined>(undefined);
    const [showFirstPop, setShowFirstPop] = useState(false);
    const [showSecondPop, setShowSecondPop] = useState(false);
    const [showTip, setShowTip] = useState(false);
    const translations = useTranslation();
    const [currentDetail, setCurrentDetail] = useState<BookData | QuestionData | null>(null);

    const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const keyword = localStorage.getItem(keywordKey);
        const value = key.trim();
        if (value.length == 0) {
            setShowTip(true);
            setTipText("你想搜什么？")
            return
        }
        if (keyword == value) {
            const data = localStorage.getItem(searchDataKey);
            if (data) {
                setSearchResult(JSON.parse(data));
                setShowFirstPop(true)
                return
            }
        }
        const result: SearchList = await searchLike(value);
        const allEmpty = Object.values(result).every(list => list.length == 0);
        if (allEmpty) {
            setShowTip(true);
            setTipText("没有检索到数据");
        } else {
            setShowTip(false);
            setSearchResult(result)
            setShowFirstPop(true)
            localStorage.setItem(keywordKey, value)
            localStorage.setItem(searchDataKey, JSON.stringify(result));
        }
    }

    const onSelect = async (item: SearchContent) => {
        if (item.type == SearchType.Article) {
            const url = `/article-detail?uuid=${item.uuid}`;
            window.open(url, "_blank");
        }
        if (item.type == SearchType.Book) {
            const data = await queryByUUID<BookData>(item.uuid, Common_Api.queryBook);
            if (data.data) {
                setShowSecondPop(true);
                console.log(data)
                setCurrentDetail(data.data)
            }
        }
        if (item.type == SearchType.Question) {
            const data = await queryByUUID<QuestionData>(item.uuid, Common_Api.queryQuestion);
            if (data.data) {
                setShowSecondPop(true);
                console.log(data)
                setCurrentDetail(data.data)
            }
        }

    }

    return (
        <>
            <div className="search-container" id="search-container">
                <form onSubmit={handleSearch} className="search">
                    <input
                        type="text"
                        className="search-input"
                        placeholder={translations.search.placeholder}
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                    />
                    <div>
                        <button type="submit" className="subButton">
                            {translations.search.button}
                        </button>
                    </div>
                </form>
                {showTip &&
                    <p className="tip">{tipText}</p>
                }
            </div>
            {searchResult &&
                <Pop isOpen={showFirstPop} title={"检索结果"} onClose={() => setShowFirstPop(false)}>
                    <div className="search-results">
                        {Object.entries(searchResult).map(([category, list]) =>
                                list.length > 0 && (
                                    <div key={category} className='search-result-title'>
                                        <div>{category}</div>
                                        {list.map((item, i) => (
                                            <div
                                                key={item.uuid}
                                                className='search-result-item'
                                                style={{padding: "6px 0", cursor: "pointer"}}
                                                onClick={() => onSelect(item)}
                                            >
                                                {(i + 1) + ". " + item.key}
                                            </div>
                                        ))}
                                    </div>
                                )
                        )}
                    </div>
                </Pop>
            }
            {currentDetail &&
                <Pop isOpen={showSecondPop} title={''} onClose={() => setShowSecondPop(false)}>
                    {"name" in currentDetail && "author" in currentDetail ? (
                        <div className='search-results-detail'><BookDetail book={currentDetail}/></div>
                    ) : (
                        // TODO
                        <div className='pop-content'
                             style={{width: '40vw', fontSize: "1.2rem", textIndent: "2em", overflow: 'hidden'}}>
                            {renderMultilineText(currentDetail.answer)}
                        </div>
                    )}
                </Pop>
            }
        </>
    )
}