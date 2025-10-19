class Program {
  readonly args;
  readonly cmdMap = new Map<string, () => void>();

  constructor() {
    this.args = process.argv.slice(2);
  }

  add(key: string, cb: () => void) {
    this.cmdMap.set(key, cb);
  }

  parse() {
    for (const arg of this.args) {
      if (!this.cmdMap.has(arg)) break;

      const cb = this.cmdMap.get(arg)!;
      cb();

      return;
    }

    this.cmdMap.get("-h")!();
  }
}

export default Program;
