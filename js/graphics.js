// Small, data-driven SVG drawings. No external images or drawing libraries.
const MathGraphics = (() => {
  const ns = "http://www.w3.org/2000/svg";
  const ink = "#174b82", blue = "#237dcc", light = "#d6eaff", accent = "#a85b08";
  function node(tag, attributes = {}, text) {
    const element = document.createElementNS(ns, tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function render(data) {
    const svg = node("svg", { viewBox: "0 0 320 180", role: "img", "aria-label": data.alt, focusable: "false" });
    svg.append(node("title", {}, data.alt));
    const add = (tag, attrs, text) => { const el = node(tag, attrs, text); svg.append(el); return el; };
    const line = (x1, y1, x2, y2, extra = {}) => add("line", { x1, y1, x2, y2, stroke: ink, "stroke-width": 2, ...extra });
    const label = (x, y, text, extra = {}) => add("text", { x, y, fill: ink, "font-size": 18, "font-weight": 650, "text-anchor": "middle", ...extra }, text);
    if (data.type === "fraction") {
      // Each row is a separate whole of exactly the same size.
      data.rows.forEach((row, index) => {
        const y = data.rows.length === 1 ? 62 : 27 + index * 76;
        const width = 240 / row.parts;
        for (let i = 0; i < row.parts; i++) {
          add("rect", { x: 40 + i * width, y, width, height: 42, fill: i < row.filled ? blue : "#fff", stroke: ink, "stroke-width": 2 });
          if (i < row.filled) label(40 + (i + .5) * width, y + 28, "●", { fill: "#fff", "font-size": 13 });
        }
        if (row.label) label(160, y + 64, row.label);
      });
    } else if (data.type === "numberLine") {
      const x = (value) => 28 + (value - data.min) / (data.max - data.min) * 264;
      line(20, 95, 300, 95);
      add("path", { d: "M26 89L20 95L26 101 M294 89L300 95L294 101", fill: "none", stroke: ink, "stroke-width": 2 });
      for (let value = data.min; value <= data.max; value++) {
        line(x(value), 88, x(value), 102);
        label(x(value), 125, value < 0 ? `−${Math.abs(value)}` : value);
      }
      (data.points || []).forEach((point) => {
        add("circle", { cx: x(point.value), cy: 95, r: 7, fill: accent, stroke: "#fff", "stroke-width": 2 });
        label(x(point.value), 69, point.label, { fill: accent });
      });
      if (data.arrow) {
        const a = x(data.arrow.from), b = x(data.arrow.to), direction = Math.sign(b - a);
        line(a, 43, b, 43, { stroke: accent, "stroke-width": 3 });
        add("path", { d: `M${b - direction * 8} 36L${b} 43L${b - direction * 8} 50`, stroke: accent, fill: "none", "stroke-width": 3 });
      }
    } else if (data.type === "angle") {
      const angle = data.degrees * Math.PI / 180;
      const cx = 130, cy = 133, length = 100, r = 32;
      const ex = cx + length * Math.cos(angle), ey = cy - length * Math.sin(angle);
      add("path", { d: `M${cx} ${cy}L${cx+r} ${cy}A${r} ${r} 0 0 0 ${cx+r*Math.cos(angle)} ${cy-r*Math.sin(angle)}Z`, fill: light });
      line(cx, cy, cx + length, cy, { "stroke-width": 4 });
      line(cx, cy, ex, ey, { "stroke-width": 4 });
      if (data.degrees === 90) add("path", { d: `M${cx+18} ${cy}v-18h-18`, stroke: accent, "stroke-width": 2, fill: "none" });
      else add("path", { d: `M${cx+r} ${cy}A${r} ${r} 0 0 0 ${cx+r*Math.cos(angle)} ${cy-r*Math.sin(angle)}`, stroke: accent, "stroke-width": 3, fill: "none" });
      add("circle", { cx, cy, r: 4, fill: ink });
      if (data.label) label(160, 165, data.label);
    } else if (data.type === "triangle") {
      // Right triangle with legs a, b and hypotenuse c, drawn to a 3:4:5 ratio.
      const A = [92, 138], B = [228, 138], C = [92, 36];
      add("polygon", { points: `${A} ${B} ${C}`, fill: light });
      line(...A, ...B, { "stroke-width": data.emphasis === "leg" ? 5 : 3, stroke: data.emphasis === "leg" ? accent : ink });
      line(...A, ...C, { "stroke-width": 3 });
      line(...B, ...C, { "stroke-width": data.emphasis === "hypotenuse" ? 5 : 3, stroke: data.emphasis === "hypotenuse" ? accent : ink });
      add("path", { d: "M92 122h16v16", fill: "none", stroke: ink, "stroke-width": 2 });
      label(76, 90, "a"); label(160, 161, "b"); label(174, 74, "c");
    } else if (data.type === "rectangleGrid") {
      const size = 32, left = (320 - data.columns * size) / 2, top = 30;
      for (let row = 0; row < data.rows; row++) {
        for (let col = 0; col < data.columns; col++) {
          add("rect", { x: left + col * size, y: top + row * size, width: size, height: size, fill: light, stroke: ink, "stroke-width": 2 });
        }
      }
      label(160, top + data.rows * size + 26, "Varje ruta: 1 cm²", { "font-size": 16 });
    } else if (data.type === "barChart") {
      const bottom = 142, step = 24;
      label(46, 17, "Antal", { "font-size": 15 });
      for (let value = 0; value <= 4; value++) {
        const y = bottom - value * step;
        line(62, y, 286, y, { stroke: "#aac7e1", "stroke-width": 1 });
        label(47, y + 5, value, { "font-size": 15 });
      }
      line(62, 34, 62, bottom); line(62, bottom, 286, bottom);
      data.values.forEach((value, index) => {
        const x = 88 + index * 70;
        add("rect", { x, y: bottom - value * step, width: 34, height: value * step, fill: blue, stroke: ink });
        label(x + 17, 164, data.labels[index]);
      });
    } else if (data.type === "functionGraph") {
      // Fixed teaching window: x = 0..4 and y = 0..8. Read the numbers,
      // since one y-grid step is two units, unlike the x-grid step.
      const x = (v) => 64 + 48 * v, y = (v) => 144 - 15 * v;
      for (let v = 0; v <= 4; v++) {
        line(x(v), y(8), x(v), y(0), { stroke: "#aac7e1", "stroke-width": 1 });
        label(x(v), 165, v, { "font-size": 15 });
      }
      for (let v = 2; v <= 8; v += 2) {
        line(x(0), y(v), x(4), y(v), { stroke: "#aac7e1", "stroke-width": 1 });
        label(47, y(v) + 5, v, { "font-size": 15 });
      }
      line(x(0), 17, x(0), y(0)); line(x(0), y(0), 274, y(0));
      label(286, 150, "x"); label(48, 17, "y");
      data.lines.forEach((graph, index) => {
        const color = index === 0 ? blue : accent;
        // Clip each line mathematically to the window before drawing it.
        let from = 0, to = 4;
        if (graph.k !== 0) {
          const edges = [(0 - graph.m) / graph.k, (8 - graph.m) / graph.k].sort((a, b) => a - b);
          from = Math.max(from, edges[0]); to = Math.min(to, edges[1]);
        } else if (graph.m < 0 || graph.m > 8) return;
        if (from > to) return;
        line(x(from), y(graph.k * from + graph.m), x(to), y(graph.k * to + graph.m), {
          stroke: color, "stroke-width": 3, ...(index ? { "stroke-dasharray": "7 4" } : {}),
        });
        if (graph.label) {
          const at = from + (to - from) * .83;
          label(x(at) + 5, y(graph.k * at + graph.m) - 9, graph.label, { fill: color, "font-size": 16 });
        }
      });
    } else if (data.type === "coordinates") {
      const x = (v) => 160 + v * 30, y = (v) => 90 - v * 30;
      for (let v = -2; v <= 2; v++) {
        line(x(v), 22, x(v), 158, { stroke: "#aac7e1", "stroke-width": 1 });
        line(92, y(v), 228, y(v), { stroke: "#aac7e1", "stroke-width": 1 });
        if (v !== 0) { label(x(v), 108, v, { "font-size": 14 }); label(146, y(v) + 5, v, { "font-size": 14 }); }
      }
      line(82, 90, 243, 90); line(160, 166, 160, 12);
      add("path", { d: "M236 84L243 90L236 96 M154 19L160 12L166 19", fill: "none", stroke: ink, "stroke-width": 2 });
      label(256, 96, "x"); label(179, 19, "y"); label(147, 109, "0", { "font-size": 14 });
      (data.points || []).forEach((point) => {
        add("circle", { cx: x(point.x), cy: y(point.y), r: 6, fill: accent, stroke: "#fff", "stroke-width": 2 });
        label(x(point.x) + 12, y(point.y) + (point.y >= 2 ? 22 : -9), point.label, { fill: accent, "font-size": 17 });
      });
    } else {
      throw new Error(`Unknown graphic type: ${data.type}`);
    }
    return svg;
  }
  return Object.freeze({ render });
})();
