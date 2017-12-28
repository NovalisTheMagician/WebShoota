/// <reference path="entities/Entity.ts" />

namespace WebGame {
    export interface ISystem {
        addEntity(id: number, entity: IEntity);
        removeEntity(id: number);
    }
}
