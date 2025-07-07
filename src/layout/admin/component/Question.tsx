import {ListItem} from "@@/layout/admin/component/Article"

export default function Question() {

    const a = {
        title: "TitleQuestion",
        context: "QuestionContextContextContextContextContextContextContext",
    }

    return (
        <div className="question-container">
            <ul className="list">
                <ListItem title={a.title} context={a.context}/>
                <ListItem title={a.title} context={a.context}/>
                <ListItem title={a.title} context={a.context}/>
            </ul>
        </div>
    )

}