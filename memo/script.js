// エスケープする関数
function escapeSpecialChars(str) {
    return str.replace(/\|/g, '¥|');
}

// 元に戻す
function unescapeSpecialChars(str) {
    return str.replace(/¥\|/g, '|');
}

// '|'で分割
function split(str) {
    const result = [];
    let currentPart = '';
    let i = 0;

    while (i < str.length) {
        if (str[i] === '|' && (i === 0 || str[i - 1] !== '¥')) {
            result.push(currentPart);
            currentPart = '';
        } else {
            currentPart += str[i];
        }
        i++;
    }

    if (currentPart.length > 0) {
        result.push(currentPart);
    }

    return result.map(unescapeSpecialChars);
}

// ページが読み込まれた時に内容を読み込む処理
window.onload = function() {
    const hash = window.location.hash;
    if (hash) {
        const decodedHash = decodeURIComponent(hash.slice(1));
        
        const parts = split(decodedHash);
        
        const savedTitle = parts[0] || '';
        const savedMemo = parts.slice(1).join('|') || '';
        
        document.getElementById('title').value = savedTitle;
        document.getElementById('memo').value = savedMemo;
        
        document.title = savedTitle || 'メモ帳';
    }
};

// 内容をURLに保存する
document.getElementById('saveButton').addEventListener('click', function() {
    const title = document.getElementById('title').value;
    const memoContent = document.getElementById('memo').value;
    
    const contentToSave = `${escapeSpecialChars(title)}|${escapeSpecialChars(memoContent)}`;
    
    window.location.hash = encodeURIComponent(contentToSave);
    
    document.title = title || 'メモ帳';
});
