import { GlobalConfig } from "../types/interfaces";
import UserConfig from "../types/UserConfig";

export class LocalStorage {
  public static namespace: string = "input-deforum";
  public static userNamespace: string = "input-deforum-user";

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

  // save user config
  public static saveUserConfig(userConfig: UserConfig): void {
    localStorage.setItem(this.userNamespace, JSON.stringify(userConfig));
  }

  public static getUserConfig(): UserConfig | null {
    const userConfig = JSON.parse(
      localStorage.getItem(this.userNamespace) || "{}"
    );
    return userConfig;
  }
}
