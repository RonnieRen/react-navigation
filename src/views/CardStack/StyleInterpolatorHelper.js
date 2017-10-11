
/* @flow */

function getPreviousAndNextSceneIndexForScene(scene, scenes) {
    let {index} = scene;
    let previousIndex = index -1;
    let nextIndex = index + 1;
    let currentSceneIndex = scenes.findIndex((sceneItem) => sceneItem === scene)
    let activeSceneIndex = scenes.findIndex((sceneItem) => sceneItem.isActive);
    let isBack = activeSceneIndex < scenes.length -1;
    if(isBack){
        if(currentSceneIndex === activeSceneIndex){
            nextIndex = scenes.length - 1;
        }
        else if(currentSceneIndex === scenes.length - 1) {
            previousIndex = activeSceneIndex;
        }
        else {
            return [];
        }
    }
    return [previousIndex, nextIndex];
};


export default {
     getPreviousAndNextSceneIndexForScene
};