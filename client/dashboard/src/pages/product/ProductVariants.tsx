import { useState } from "react";

type Variant = {
  name: string;
  price: number;
  stock: number;
  sku: string;
};

export default function ProductVariants() {
  const [attributes, setAttributes] = useState<{ [key: string]: string[] }>({});
  const [variants, setVariants] = useState<Variant[]>([]);
  const [attrName, setAttrName] = useState("");
  const [attrValue, setAttrValue] = useState("");

  // Add a new attribute (e.g., Color)
  const addAttribute = () => {
    if (!attrName.trim()) return;
    setAttributes((prev) => ({ ...prev, [attrName]: [] }));
    setAttrName("");
  };

  // Add value to attribute (e.g., Red)
  const addValue = (name: string) => {
    if (!attrValue.trim()) return;
    setAttributes((prev) => ({
      ...prev,
      [name]: [...(prev[name] || []), attrValue],
    }));
    setAttrValue("");
  };

  // Generate variants from attributes
  const generateVariants = () => {
    const keys = Object.keys(attributes);
    if (keys.length === 0) return;

    // Cartesian product of attribute values
    const combos = keys.reduce<string[][]>(
      (acc, key) => {
        const values = attributes[key];
        return acc
          .map((combo) => values.map((val) => [...combo, `${key}: ${val}`]))
          .flat();
      },
      [[]]
    );

    setVariants(
      combos.map((combo, i) => ({
        name: combo.join(" / "),
        price: 0,
        stock: 0,
        sku: `SKU-${i + 1}`,
      }))
    );
  };

  return (
    <div className="p-4 space-y-6">
      {/* Add Attribute */}
      <div className="space-x-2">
        <input
          type="text"
          placeholder="Attribute name (e.g. Color)"
          value={attrName}
          onChange={(e) => setAttrName(e.target.value)}
          className="border rounded p-2"
        />
        <button
          onClick={addAttribute}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Attribute
        </button>
      </div>

      {/* Attribute Values */}
      {Object.keys(attributes).map((name) => (
        <div key={name} className="space-y-2">
          <h3 className="font-semibold">{name}</h3>
          <div className="space-x-2">
            <input
              type="text"
              placeholder={`Add ${name} value`}
              value={attrValue}
              onChange={(e) => setAttrValue(e.target.value)}
              className="border rounded p-2"
            />
            <button
              onClick={() => addValue(name)}
              className="px-3 py-2 bg-green-500 text-white rounded"
            >
              Add Value
            </button>
          </div>
          <div className="flex gap-2 flex-wrap">
            {attributes[name].map((val) => (
              <span
                key={val}
                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
              >
                {val}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* Generate Variants */}
      <button
        onClick={generateVariants}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        Generate Variants
      </button>

      {/* Variants Table */}
      {variants.length > 0 && (
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Variant</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">SKU</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((v, i) => (
              <tr key={i}>
                <td className="p-2 border">{v.name}</td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={v.price}
                    onChange={(e) => {
                      const newVariants = [...variants];
                      newVariants[i].price = +e.target.value;
                      setVariants(newVariants);
                    }}
                    className="border p-1 w-20"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="number"
                    value={v.stock}
                    onChange={(e) => {
                      const newVariants = [...variants];
                      newVariants[i].stock = +e.target.value;
                      setVariants(newVariants);
                    }}
                    className="border p-1 w-20"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="text"
                    value={v.sku}
                    onChange={(e) => {
                      const newVariants = [...variants];
                      newVariants[i].sku = e.target.value;
                      setVariants(newVariants);
                    }}
                    className="border p-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
