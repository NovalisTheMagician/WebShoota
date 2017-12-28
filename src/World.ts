/// <reference path="render/RenderProperty.ts" />
/// <reference path="System.ts" />

namespace WebGame {
    export class World {
        private entities: Map<number, IEntity>;
        private systems: Set<ISystem>;

        private idCounter: number;

        public constructor() {
            this.entities = new Map<number, IEntity>();
            this.systems = new Set<ISystem>();
            this.idCounter = 1000;
        }

        public register(system: ISystem): void {
            this.systems.add(system);
        }

        public unregister(system: ISystem): void {
            this.systems.delete(system);
        }

        public addEntity(entity: IEntity): number {
            let reservedId = this.idCounter;

            this.entities.set(reservedId, entity);

            for(let system of this.systems) {
                system.addEntity(reservedId, entity);
            }

            this.idCounter++;
            return reservedId;
        }

        public removeEntity(id: number): void {
            let entity = this.entities.get(id);
            for(let system of this.systems) {
                system.addEntity(id, entity);
            }
            this.entities.delete(id);
        }
    }
}
