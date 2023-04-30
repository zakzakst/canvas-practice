uniform mat4 projectionMatrix; // カメラが撮影する範囲
uniform mat4 viewMatrix; // カメラの位置と方向
uniform mat4 modelMatrix; // 物体の位置

attribute vec3 position;
attribute float aRandom;

// varyingでfragmentShaderに渡す
varying float vRandom;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  // modelPosition.x += 0.5;
  // modelPosition.z += sin(modelPosition.x * 20.0) * 0.1;
  modelPosition.z += aRandom * 0.1;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  vRandom = aRandom;
}