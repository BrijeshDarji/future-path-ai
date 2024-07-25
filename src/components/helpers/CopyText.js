// clipboard.js
export const CopyText = (text) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(
            () => {},
            (err) => {
                console.error("Failed to copy text to clipboard: ", err);
            }
        );
    }
    else {
        // Fallback for browsers that do not support the Clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // Avoid scrolling to bottom
        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        try {
            document.execCommand("copy");
        } catch (err) {
            console.error("Failed to copy text to clipboard: ", err);
        }
        document.body.removeChild(textArea);
    }
};
