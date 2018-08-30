
interface IFile { isDir: boolean, filepath: string }





export function captilize(key: string): string {
    console.log(key)
    let keyArr = key.split("");
    keyArr[0] = keyArr[0].toLocaleUpperCase();
    return keyArr.join("")

}