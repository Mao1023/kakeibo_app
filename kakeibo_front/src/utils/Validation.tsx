/**
 * 半角英数字・記号のパターン（正規表現）
 */
export const validPattern = /^[a-zA-Z0-9!-/:-@[-`{-~]+$/;

/**
 * 入力値が指定された桁数および文字種（半角英数字記号）を満たしているか判定する
 * @param value 入力された文字列
 * @param min 最小桁数
 * @param max 最大桁数
 * @returns エラーがなければ true、エラー（条件違反）なら false
 */
export const isValidInput = (value: string, min: number, max: number): boolean => {
    // 1. 桁数チェック
    if (value.length < min || value.length > max) {
        return false;
    }
    // 2. 文字種チェック（半角英数字記号か）
    if (!validPattern.test(value)) {
        return false;
    }

    return true; // 両方クリアしたらOK
};