(() => {
  class AuroraBackground {
    constructor(container, options = {}) {
      this.container = container;
      this.options = {
        colorStops: ["#4CA6EC", "#ABE4FF", "#2E63FF"],
        amplitude: 1.0,
        blend: 0.5,
        speed: 0.6,
        ...options,
      };
      this.program = null;
      this.gl = null;
      this.canvas = null;
      this.ctx2d = null;
      this.mode = "webgl2";
      this.positionBuffer = null;
      this.uniforms = null;
      this.frameId = 0;
      this.handleResize = this.handleResize.bind(this);

      if (!this.container) return;

      try {
        this.mount();
      } catch (error) {
        this.showFallback(error);
      }
    }

    mount() {
      const VERT = `#version 300 es
      in vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }`;

      const FRAG = `#version 300 es
      precision highp float;

      uniform float uTime;
      uniform float uAmplitude;
      uniform vec3 uColorStops[3];
      uniform vec2 uResolution;
      uniform float uBlend;

      out vec4 fragColor;

      vec3 permute(vec3 x) {
        return mod(((x * 34.0) + 1.0) * x, 289.0);
      }

      float snoise(vec2 v){
        const vec4 C = vec4(
            0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439
        );
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod(i, 289.0);

        vec3 p = permute(
            permute(i.y + vec3(0.0, i1.y, 1.0))
          + i.x + vec3(0.0, i1.x, 1.0)
        );

        vec3 m = max(
            0.5 - vec3(
                dot(x0, x0),
                dot(x12.xy, x12.xy),
                dot(x12.zw, x12.zw)
            ),
            0.0
        );
        m = m * m;
        m = m * m;

        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      struct ColorStop {
        vec3 color;
        float position;
      };

      #define COLOR_RAMP(colors, factor, finalColor) {              \
        int index = 0;                                            \
        for (int i = 0; i < 2; i++) {                               \
           ColorStop currentColor = colors[i];                    \
           bool isInBetween = currentColor.position <= factor;    \
           index = int(mix(float(index), float(i), float(isInBetween))); \
        }                                                         \
        ColorStop currentColor = colors[index];                   \
        ColorStop nextColor = colors[index + 1];                  \
        float range = nextColor.position - currentColor.position; \
        float lerpFactor = (factor - currentColor.position) / range; \
        finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;

        ColorStop colors[3];
        colors[0] = ColorStop(uColorStops[0], 0.0);
        colors[1] = ColorStop(uColorStops[1], 0.5);
        colors[2] = ColorStop(uColorStops[2], 1.0);

        vec3 rampColor;
        COLOR_RAMP(colors, uv.x, rampColor);

        float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
        height = exp(height);
        height = (uv.y * 2.0 - height + 0.2);
        float intensity = 0.6 * height;

        float midPoint = 0.20;
        float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

        vec3 auroraColor = intensity * rampColor;

        fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
      }`;

      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2", {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
      });

      if (!gl) {
        this.showFallback(new Error("webgl2 unavailable"));
        return;
      }

      this.canvas = canvas;
      this.gl = gl;
      gl.clearColor(0, 0, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      canvas.style.backgroundColor = "transparent";

      const compileShader = (type, source) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
        }
        return shader;
      };

      const vertexShader = compileShader(gl.VERTEX_SHADER, VERT);
      const fragmentShader = compileShader(gl.FRAGMENT_SHADER, FRAG);
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
      }

      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.useProgram(program);
      this.program = program;

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW
      );
      this.positionBuffer = positionBuffer;

      const positionLocation = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const hexToRgb = (hex) => {
        const value = hex.replace("#", "");
        const normalized =
          value.length === 3
            ? value
                .split("")
                .map((char) => char + char)
                .join("")
            : value;
        const num = Number.parseInt(normalized, 16);
        return [
          ((num >> 16) & 255) / 255,
          ((num >> 8) & 255) / 255,
          (num & 255) / 255,
        ];
      };

      this.uniforms = {
        time: gl.getUniformLocation(program, "uTime"),
        amplitude: gl.getUniformLocation(program, "uAmplitude"),
        colorStops: gl.getUniformLocation(program, "uColorStops"),
        resolution: gl.getUniformLocation(program, "uResolution"),
        blend: gl.getUniformLocation(program, "uBlend"),
      };

      gl.uniform1f(this.uniforms.amplitude, this.options.amplitude);
      gl.uniform1f(this.uniforms.blend, this.options.blend);
      gl.uniform3fv(
        this.uniforms.colorStops,
        new Float32Array(this.options.colorStops.flatMap(hexToRgb))
      );

      this.container.innerHTML = "";
      this.container.appendChild(canvas);
      window.addEventListener("resize", this.handleResize);
      this.handleResize();
      this.update();
    }

    showFallback() {
      if (!this.container) return;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      this.mode = "canvas2d";
      this.canvas = canvas;
      this.ctx2d = ctx;
      canvas.style.backgroundColor = "transparent";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      this.container.innerHTML = "";
      this.container.appendChild(canvas);

      window.addEventListener("resize", this.handleResize);
      this.handleResize();
      this.update();
    }

    handleResize() {
      if (!this.canvas) return;

      const width = Math.max(1, this.container.offsetWidth);
      const height = Math.max(1, this.container.offsetHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      this.canvas.width = Math.round(width * dpr);
      this.canvas.height = Math.round(height * dpr);
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;

      if (this.mode === "canvas2d" && this.ctx2d) {
        this.ctx2d.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx2d.scale(dpr, dpr);
        return;
      }

      if (!this.gl || !this.program) return;
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      this.gl.uniform2f(this.uniforms.resolution, this.canvas.width, this.canvas.height);
    }

    update = (time = 0) => {
      this.frameId = window.requestAnimationFrame(this.update);

      if (this.mode === "canvas2d") {
        this.drawFallbackFrame(time);
        return;
      }

      if (!this.gl || !this.program) return;
      this.gl.useProgram(this.program);
      this.gl.uniform1f(this.uniforms.time, time * 0.01 * this.options.speed * 0.1);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 3);
    };

    drawFallbackFrame(time) {
      if (!this.ctx2d || !this.canvas) return;

      const ctx = this.ctx2d;
      const width = Math.max(1, this.container.offsetWidth);
      const height = Math.max(1, this.container.offsetHeight);
      const t = time * 0.00018 * this.options.speed;

      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "screen";

      const stops = this.options.colorStops;
      const blobs = [
        { x: 0.18, y: 0.14, radius: 0.44, color: stops[0], driftX: 0.06, driftY: 0.04 },
        { x: 0.52, y: 0.08, radius: 0.38, color: stops[1], driftX: 0.08, driftY: 0.03 },
        { x: 0.84, y: 0.18, radius: 0.42, color: stops[2], driftX: 0.05, driftY: 0.05 },
      ];

      blobs.forEach((blob, index) => {
        const cx = width * (blob.x + Math.sin(t * (index + 1.2)) * blob.driftX);
        const cy = height * (blob.y + Math.cos(t * (index + 1.6)) * blob.driftY);
        const radius = Math.max(width, height) * blob.radius;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        gradient.addColorStop(0, `${blob.color}cc`);
        gradient.addColorStop(0.48, `${blob.color}55`);
        gradient.addColorStop(1, `${blob.color}00`);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });

      ctx.globalCompositeOperation = "source-over";
    }
  }

  const container = document.querySelector("[data-home-aurora]");
  if (!container) return;

  const aurora = new AuroraBackground(container, {
    colorStops: ["#4CA6EC", "#ABE4FF", "#2E63FF"],
    blend: 0.5,
    amplitude: 1.0,
    speed: 0.6,
  });

  window.addEventListener(
    "beforeunload",
    () => {
      if (aurora.frameId) {
        window.cancelAnimationFrame(aurora.frameId);
      }
    },
    { once: true }
  );
})();
