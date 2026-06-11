/**
 * 全角数字を半角数字に変換する
 */
export const toHalfWidth = (str: string): string => {
    return str.replace(/[０-９]/g, (s) => {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
};