"use strict";

var _vueEsmBrowserProd = require("https://unpkg.com/vue@3.0.11/dist/vue.esm-browser.prod.js");

var _troisModuleCdnMin = require("https://unpkg.com/troisjs@0.3.0-beta.4/build/trois.module.cdn.min.js");

var _threeModule = require("https://unpkg.com/three@0.127.0/build/three.module.js");

// Made with TroisJS : https://github.com/troisjs/trois
var rnd = _threeModule.MathUtils.randFloat,
    randInt = _threeModule.MathUtils.randInt,
    rndFS = _threeModule.MathUtils.randFloatSpread;
var vertexShader = "\n  uniform float uTime;\n  attribute vec3 color;\n  attribute float size;\n  attribute float velocity;\n  varying vec4 vColor;\n  void main(){\n    vColor = vec4(color, 1.0);\n    vec3 p = vec3(position);\n    p.z = -150. + mod(position.z + uTime, 300.);\n    vec4 mvPosition = modelViewMatrix * vec4( p, 1.0 );\n    gl_PointSize = size * (-50.0 / mvPosition.z);\n    gl_Position = projectionMatrix * mvPosition;\n  }\n";
var fragmentShader = "\n  uniform sampler2D uTexture;\n  varying vec4 vColor;\n  void main() {\n    gl_FragColor = vColor * texture2D(uTexture, gl_PointCoord);\n  }\n";
(0, _vueEsmBrowserProd.createApp)({
  template: "\n    <Renderer ref=\"renderer\" pointer resize=\"window\">\n      <Camera :position=\"{ z: 0 }\" :fov=\"50\" />\n      <Scene>\n        <Points ref=\"points\" :position=\"{ z: -150 }\">\n          <BufferGeometry :attributes=\"attributes\" />\n          <ShaderMaterial :blending=\"2\" :depth-test=\"false\" :uniforms=\"uniforms\" :vertex-shader=\"vertexShader\" :fragment-shader=\"fragmentShader\">\n            <Texture src=\"https://assets.codepen.io/33787/sprite.png\" uniform=\"uTexture\" />\n          </ShaderMaterial>\n        </Points>\n      </Scene>\n      <EffectComposer>\n        <RenderPass />\n        <UnrealBloomPass :strength=\"2\" :radius=\"0\" :threshold=\"0\" />\n        <ZoomBlurPass :strength=\"zoomStrength\" />\n      </EffectComposer>\n    </Renderer>\n    <a href=\"#\" @click=\"updateColors\" @mouseenter=\"targetTimeCoef = 100\" @mouseleave=\"targetTimeCoef = 1\">Random Colors</a>\n  ",
  components: {
    BufferGeometry: _troisModuleCdnMin.BufferGeometry,
    Camera: _troisModuleCdnMin.Camera,
    EffectComposer: _troisModuleCdnMin.EffectComposer,
    Points: _troisModuleCdnMin.Points,
    Renderer: _troisModuleCdnMin.Renderer,
    RenderPass: _troisModuleCdnMin.RenderPass,
    Scene: _troisModuleCdnMin.Scene,
    ShaderMaterial: _troisModuleCdnMin.ShaderMaterial,
    Texture: _troisModuleCdnMin.Texture,
    UnrealBloomPass: _troisModuleCdnMin.UnrealBloomPass,
    ZoomBlurPass: _troisModuleCdnMin.ZoomBlurPass
  },
  setup: function setup() {
    var POINTS_COUNT = 50000;
    var palette = niceColors[83];
    var positions = new Float32Array(POINTS_COUNT * 3);
    var colors = new Float32Array(POINTS_COUNT * 3);
    var sizes = new Float32Array(POINTS_COUNT);
    var v3 = new _threeModule.Vector3(),
        color = new _threeModule.Color();

    for (var i = 0; i < POINTS_COUNT; i++) {
      v3.set(rndFS(200), rndFS(200), rndFS(300));
      v3.toArray(positions, i * 3);
      color.set(palette[Math.floor(rnd(0, palette.length))]);
      color.toArray(colors, i * 3);
      sizes[i] = rnd(5, 20);
    }

    var attributes = [{
      name: "position",
      array: positions,
      itemSize: 3
    }, {
      name: "color",
      array: colors,
      itemSize: 3
    }, {
      name: "size",
      array: sizes,
      itemSize: 1
    }];
    var uniforms = {
      uTime: {
        value: 0
      }
    };
    var clock = new _threeModule.Clock();
    var timeCoef = 1,
        targetTimeCoef = 1;
    return {
      POINTS_COUNT: POINTS_COUNT,
      attributes: attributes,
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      clock: clock,
      timeCoef: timeCoef,
      targetTimeCoef: targetTimeCoef
    };
  },
  data: function data() {
    return {
      zoomStrength: 0
    };
  },
  mounted: function mounted() {
    var _this = this;

    var renderer = this.$refs.renderer;
    var positionN = renderer.three.pointer.positionN;
    var points = this.$refs.points.points;
    renderer.onBeforeRender(function () {
      _this.timeCoef = (0, _troisModuleCdnMin.lerp)(_this.timeCoef, _this.targetTimeCoef, 0.02);
      _this.uniforms.uTime.value += _this.clock.getDelta() * _this.timeCoef * 4;
      _this.zoomStrength = _this.timeCoef * 0.004;
      var da = 0.05;
      var tiltX = (0, _troisModuleCdnMin.lerp)(points.rotation.x, positionN.y * da, 0.02);
      var tiltY = (0, _troisModuleCdnMin.lerp)(points.rotation.y, -positionN.x * da, 0.02);
      points.rotation.set(tiltX, tiltY, 0);
    });
  },
  methods: {
    updateColors: function updateColors() {
      var colorAttribute = this.$refs.points.geometry.attributes.color;
      var ip = randInt(0, 99);
      var palette = niceColors[ip];
      console.log(ip);
      var color = new _threeModule.Color();

      for (var i = 0; i < this.POINTS_COUNT; i++) {
        color.set(palette[randInt(0, palette.length)]);
        color.toArray(colorAttribute.array, i * 3);
      }

      colorAttribute.needsUpdate = true;
    }
  }
}).mount("#app");