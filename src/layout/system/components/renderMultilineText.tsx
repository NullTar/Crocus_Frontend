

export const renderMultilineText = (text: string) => {
    return text.split('\n').map((line, index) => (
        <p key={index} style={{margin: 0, lineHeight: 1.8, letterSpacing: '0.08em'}}>{line}</p>
    ));
};