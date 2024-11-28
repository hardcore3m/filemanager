import filesystem from "fs";
import path from "path";
import getPathInfo from "./pathInfo.mjs";
const fs = filesystem.promises;

export default class StorageHandler {
  constructor(basePath) {
    if (!basePath) throw new Error("O diretório pai (basePath) é obrigatório.");
    this.basePath = path.resolve(basePath);

    // Verificar se o diretório base existe
    this.checkBasePath();
  }

  async checkBasePath() {
    try {
      const directoryInfo = await getPathInfo(this.basePath);
      if (directoryInfo.target=='directory') {
        console.log('Connected to base directory',directoryInfo);
      }else{
        throw new Error("Path does not exist or is not a Directory");
      }
      
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.error(`Erro: O diretório base ${this.basePath} não existe.`);
        throw new Error("Diretório base inexistente.");
      }
      throw err;
    }
  }

  // Método interno para resolver e validar caminhos
  resolvePath(relativePath) {
    const fullPath = path.resolve(this.basePath, relativePath);
    if (!fullPath.startsWith(this.basePath)) {
      throw new Error("Operação fora do diretório permitido.");
    }
    return fullPath;
  }

  // Retorna uma instância de FileOperations
  getFileOperations() {

  }

  // Retorna uma instância de DirectoryOperations
  getDirectoryOperations() {

  }

  // Retorna uma instância de Utilities
  getUtilities() {

  }
}
