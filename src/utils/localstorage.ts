class Localstorage {
  // 存储storage
  setStore(key: string, val: any) {
    if (!key) return;
    window.localStorage.setItem(key, JSON.stringify(val));
  }

  // 获取storage
  getStore(key: string) {
    if (!key) return;
    const value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  // 删除storage
  removeStore(key: string) {
    if (!key) return;
    window.localStorage.removeItem(key);
  }

  // 清空storage
  clearStore() {
    window.localStorage.clear();
  }
}

export default new Localstorage();
