import filesystem from "fs";
import path from "path";

const fs = filesystem.promises;

export default async function getPathInfo(targetPath) {
    const _path = path.resolve(targetPath);
    const statObj = new Object();
    statObj.path = _path;
    try {
        const stats = await fs.stat(_path);

        if (stats.isDirectory()) {
            statObj.target = 'directory';
        }else if (stats.isFile()) {
            statObj.target = 'file';
        }

        else {

        }

        statObj.size = `${stats.size} bytes`;
        statObj.lastModified = stats.mtime.toUTCString();
        statObj.lastAccess = stats.atime.toUTCString();
        statObj.createdAt = stats.birthtime.toUTCString();

        return statObj;
    } catch (err) {
        statObj.code = err.code;
        if (err.code === 'ENOENT') {
            statObj.target = null;
            statObj.message = 'No File or Directory';
            return statObj;
        } else {
            statObj.target = 'error';
            statObj.message = err.message;
            return statObj;
        }

    }

}