/// <reference path="../../../../typings/tsd.d.ts"/>

import {Component, View, Pipe, PipeTransform } from 'angular2/angular2';

// We use the @Pipe decorator to register the name of the pipe
@Pipe({
    name: 'tempConvert'
})
// The work of the pipe is handled in the tranform method with our pipe's class
class TempConvertPipe implements PipeTransform {
    transform(value: number, args: any[]) {
        if (value && !isNaN(value) && args[0] === 'celsius') {
            var temp = (value - 32) * 5 / 9;
            var places = args[1];
            return temp.toFixed(places) + ' C';
        }

        return;
    }
}

@Component({
    selector: 'trypipe',
    templateUrl: 'components/ng2lab/trypipe/trypipe.html',
    pipes: [TempConvertPipe]
})
export class TryPipeCom {

    rate: number;
    num: number;
    date: Date;
    temp: number;

    promise: Promise<number>;

    constructor() {
        this.rate = 0.9234;
        this.num = 1232.324234;
        this.date = new Date();
        this.temp = 85;

        this.promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Hey, I'm from a promise.");
            }, 2000)
        });
    }
}
