import * as hljs from "highlight.js";
import * as MarkdownIt from "markdown-it";

const md = new MarkdownIt({
    html: true,
    highlight: (str: any, lang: any): any => {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (e) {
                // console.info('hightlight');
                // console.info(e);
            }

        } else {
            console.info("找不到目标语言或语言对应的高亮：" + lang);
        }

        return ''; // use external default escaping
    },
});

export default md;