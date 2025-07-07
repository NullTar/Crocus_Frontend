import {FileProp} from "@@/ts/props.ts";
import {useState} from 'react';

export const FileForm: React.FC<FileProp> = (props) => {
    const {multiple = false, type, onFileSelect} = props
    const [isUploaded, setIsUploaded] = useState(false)

    return (
        <>
            {!isUploaded &&
                <div className="file-form"
                     onDrop={e => {
                         e.preventDefault()
                         onFileSelect(e.dataTransfer.files);
                         setIsUploaded(true);
                     }}
                     onDragOver={(e) => e.preventDefault()}
                >
                    <input style={{opacity: "0"}}
                           accept={type}
                           multiple={multiple}
                           type="file" id="file" name="file"
                           onChange={(e) => {
                               onFileSelect(e.target.files)
                               setIsUploaded(true);
                           }}/>
                </div>
            }

            {isUploaded &&
                <button className="clear-file" style={{width: "8rem"}} type="button" onClick={() => {
                    onFileSelect(null)
                    setIsUploaded(false);
                }}>移除文件 &times;</button>
            }
        </>
    )
}