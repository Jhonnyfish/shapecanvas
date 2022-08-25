import { createAlgorithm } from "./factory";

export function renderEl(graph){
    var model = createAlgorithm()
    model.addTo(graph)
}