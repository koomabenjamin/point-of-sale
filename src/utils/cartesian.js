// src/utils/cartesian.js
export function cartesianProduct(arrays) {
  console.log('Calculating cartesian product for arrays:', arrays);
  if (!arrays || arrays.length === 0) return [];
  return arrays.reduce((acc, curr) => {
    const res = [];
    acc.forEach(a => {
      curr.forEach(c => {
        res.push([...a, c]);
      });
    });
    return res;
  }, [[]]);
}

export function generateSKUs(specGroups, unitGroups, base = {}) {
  console.log('Generating SKUs with specs:', typeof specGroups, 'and units:', typeof unitGroups);
  const specArrays = specGroups.options;
  const unitArrays = unitGroups.options;
  const combos = [...specArrays, ...unitArrays];

  // return combos.map((combo, idx) => {
  combos.map((combo, idx) => {
    const specsCount = specArrays.length;
    const specValues = combo.slice(0, specsCount);
    const unitValues = combo.slice(specsCount);
    return {
      id: `sku-${Date.now()}-${idx}`,
      skuCode: (base.skuPrefix || 'P') + '-' + idx,
      specs: specArrays.map((g, i) => ({ name: g.name, value: specValues[i] })),
      units: unitArrays.map((g, i) => ({ name: g.name, value: unitValues[i] })),
      price: base.price || 0,
      stock: base.stock || 0,
      ...base
    };
  });
  return combos[0]?.id;
}
