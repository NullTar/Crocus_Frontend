import {MdEditor, config, XSSPlugin} from 'md-editor-rt';
import {lineNumbers} from '@codemirror/view';
import {foldGutter} from '@codemirror/language';
import 'md-editor-rt/lib/style.css';
import {MarkDownProps} from "@@/ts/props.ts";

config({
    markdownItPlugins(plugins) {
        return [
            ...plugins,
            {
                type: 'xss',
                plugin: XSSPlugin,
                options: {}, // 可选：传递给 xss 插件的配置项
            },
        ];
    },
    codeMirrorExtensions(_theme, extensions) {
        return [...extensions, lineNumbers(), foldGutter()];
    },
});

export const MarkDown: React.FC<MarkDownProps> = (prop) => {
    const {value, previewTheme, onChange, onUploadImg, saveEditContent} = prop
    return (
        <MdEditor value={value}
                  onChange={onChange}
                  previewTheme={previewTheme}
                  onUploadImg={onUploadImg}
                  showCodeRowNumber={true}
                  codeTheme={"atom"}
                  htmlPreview={false}
                  toolbarsExclude={["github", "previewOnly", "htmlPreview"]}
                  catalogLayout='flat'
                  onSave={saveEditContent}
        />
    );
};