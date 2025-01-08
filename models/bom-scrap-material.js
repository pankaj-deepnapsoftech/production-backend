const { Schema, model } = require("mongoose");

const BOMScrapMaterialSchema = new Schema(
  {
    bom: {
      type: Schema.Types.ObjectId,
      ref: "BOM",
      required: [true, "BOM is a required field"]
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is a required field']
    },
    total_part_cost: {
      type: Number,
    },
    is_production_started: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const BOMScrapMaterial = model("BOM-Scrap-Material", BOMScrapMaterialSchema);
module.exports = BOMScrapMaterial;