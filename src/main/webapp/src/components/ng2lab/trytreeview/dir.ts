export class Dir {
    name: string;
    dirs: Array<Dir> = [];

    constructor(name: string) {
        this.name = name;
    }
}
