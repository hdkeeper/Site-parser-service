import { JSDOM } from 'jsdom';


export function download(url: string): Promise<JSDOM> {
    return JSDOM.fromURL(url);
}

const IGNORED_ELEMENTS = new Set(['script', 'style', 'svg']);
const PUNCTUATION = `,.;:"!?()-`;

export function parse(doc: JSDOM, maxWords = 10): string[] {
    const { document, NodeFilter } = doc.window;
    
    const iterator = document.createNodeIterator(
        document.querySelector('body'),
        NodeFilter.SHOW_TEXT,
        node => IGNORED_ELEMENTS.has(node.parentElement.tagName.toLowerCase()) ?
            NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    );

    let curNode: Node;
    const words = new Set<string>();
    const rePunct = new RegExp(`(^[${PUNCTUATION}])|([${PUNCTUATION}]$)`, 'gi');
    
    while (curNode = iterator.nextNode()) {
        const nodeText = curNode.textContent.trim();
        if (nodeText) {
            for (let word of nodeText.split(/\s+/i)) {
                word = word.toLowerCase().replaceAll(rePunct, '');
                if (word) words.add(word);
            }
        }
    }

    return [...words].sort((a, b) => b.length - a.length).slice(0, maxWords);
}
