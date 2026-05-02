// QUAY-SAST-005: prototype pollution via unsafe recursive merge.
function merge(target, source) {
  for (const key in source) {
    const v = source[key];
    if (v && typeof v === "object") {
      if (!target[key]) target[key] = {};
      merge(target[key], v);    // recurses through __proto__
    } else {
      target[key] = v;
    }
  }
  return target;
}

module.exports = merge;
