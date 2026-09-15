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
