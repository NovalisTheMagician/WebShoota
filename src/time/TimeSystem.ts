namespace WebGame {
    export class Timer {
        private startTime: number;
        private currentTime: number;
        private lastTime: number;
        private totalTime: number;
        private deltaTime: number;

        constructor() {
            this.startTime = window.performance.now();
            this.currentTime = this.startTime;
            this.lastTime = this.currentTime;
            this.totalTime = 0;
            this.deltaTime = 0;
        }

        public update(): void {
            this.currentTime = window.performance.now();
            this.deltaTime = this.currentTime - this.lastTime;
            this.lastTime = this.currentTime;
            this.totalTime = this.currentTime - this.startTime;
        }

        public getDeltaTime(): number {
            return this.deltaTime / 1000;
        }

        public getTotalTime(): number {
            return this.totalTime / 1000;
        }
    }
}
