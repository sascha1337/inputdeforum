import { GlobalConfig } from "./types/interfaces";

export class LocalStorage {
  public static namespace: string = "input-deforum";

  public static saveConfig(name: string, config: GlobalConfig): void {
    let configs = this.getConfigsFromStorage();

    if (configs === null) {
      configs = {};
    }

    configs[name] = config;
    localStorage.setItem(this.namespace, JSON.stringify(configs));
  }

  public static getConfig(name: string): GlobalConfig | null {
    const configs = this.getConfigsFromStorage();

    if (configs === null) {
      return null;
    }

    return configs[name];
  }

  private static getConfigsFromStorage(): {
    [key: string]: GlobalConfig;
  } | null {
    const configs = JSON.parse(localStorage.getItem(this.namespace) || "{}");
    return configs;
  }

  public static getConfigNames(): string[] {
    const names: string[] = [];
    const configs = this.getConfigsFromStorage();

    for (const key in configs) {
      if (Object.prototype.hasOwnProperty.call(configs, key)) {
        names.push(key);
      }
    }
    return names.sort();
  }
}
