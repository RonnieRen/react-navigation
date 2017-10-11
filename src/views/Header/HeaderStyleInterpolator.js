/* @flow */

import { I18nManager } from 'react-native';

import type {
  NavigationSceneRendererProps,
  AnimatedViewStyleProp,
} from '../../TypeDefinition';

import StyleInterpolatorHelper from './../CardStack/StyleInterpolatorHelper';

/**
 * Utility that builds the style for the navigation header.
 *
 * +-------------+-------------+-------------+
 * |             |             |             |
 * |    Left     |   Title     |   Right     |
 * |  Component  |  Component  | Component   |
 * |             |             |             |
 * +-------------+-------------+-------------+
 */

function forLeft(props: NavigationSceneRendererProps): AnimatedViewStyleProp {
  const { position, scene, scenes } = props;
  const { index } = scene;
  let previousAndNextSceneIndexs = StyleInterpolatorHelper.getPreviousAndNextSceneIndexForScene(scene, scenes);
  if(previousAndNextSceneIndexs.length !== 2){
      return {
           opacity: 0
    }
  }
  let previousIndex = previousAndNextSceneIndexs[0];
  let nextIndex = previousAndNextSceneIndexs[1];
  return {
    opacity: position.interpolate({
      inputRange: [index - 1, index - 0.5, index, index + 0.5, index + 1],
      outputRange: ([0, 0, 1, 0, 0]: Array<number>),
    }),
  };
}

function forCenter(props: NavigationSceneRendererProps): AnimatedViewStyleProp {
  const { position, scene, scenes } = props;
  const { index } = scene;
  let previousAndNextSceneIndexs = StyleInterpolatorHelper.getPreviousAndNextSceneIndexForScene(scene, scenes);
  if(previousAndNextSceneIndexs.length !== 2){
      return {
        opacity: 0
    }
  }
  let previousIndex = previousAndNextSceneIndexs[0];
  let nextIndex = previousAndNextSceneIndexs[1];
  return {
    opacity: position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: ([0, 1, 0]: Array<number>),
    }),
    transform: [
      {
        translateX: position.interpolate({
          inputRange: [index - 1, index + 1],
          outputRange: I18nManager.isRTL
            ? ([-200, 200]: Array<number>)
            : ([200, -200]: Array<number>),
        }),
      },
    ],
  };
}

function forRight(props: NavigationSceneRendererProps): AnimatedViewStyleProp {
  const { position, scene } = props;
  const { index } = scene;
  return {
    opacity: position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: ([0, 1, 0]: Array<number>),
    }),
  };
}

export default {
  forLeft,
  forCenter,
  forRight,
};
