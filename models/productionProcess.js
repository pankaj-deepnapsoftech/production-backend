const { Schema, model } = require("mongoose");

const productionProcessSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator is a required field"],
    },
    item: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Item is a required field"],
    },
    bom: {
      type: Schema.Types.ObjectId,
      ref: "BOM",
      required: [true, "BOM is a required field"],
    },
    quantity: {
      type: Number,
      required: [true],
    },
    rm_store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: [true, "Raw material store is a required field"],
    },
    fg_store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: [true, "Finished good store is a required field"],
    },
    scrap_store: {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
    status: {
      type: String,
      enum: [
        "raw material approval pending",
        "raw materials approved",
        "work in progress",
        "completed",
      ],
      default: "raw material approval pending",
    },
    approved: {
      type: Boolean,
      default: false,
    },
    processes: {
        type: [{
            process: {
                type: String,
                required: [true, 'Process is a required field']
            },
            done: {
                type: Boolean,
                default: false
            }
        }],
        required: [true, 'Processes is a required field']
    },
    raw_materials: {
      type: [
        {
          item: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Item is a required field"],
          },
          estimated_quantity: {
            type: Number,
            required: [true, "Estimated quantity is a required field"],
          },
          used_quantity: {
            type: Number,
            default: 0,
          },
        },
      ],
      required: [true, "Raw materials is a required field"],
    },
    scrap_materials: {
      type: [
        {
          item: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: [true, "Item is a required field"],
          },
          estimated_quantity: {
            type: Number,
            required: [true, "Estimated quantity is a required field"],
          },
          produced_quantity: {
            type: Number,
            default: 0,
          },
        },
      ],
      required: [true, "Raw materials is a required field"],
    },
    finished_good: {
      item: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Item is a required field"],
      },
      estimated_quantity: {
        type: Number,
        required: [true, "Estimated quantity is a required field"],
      },
      produced_quantity: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  }
);

const ProductionProcess = model("Production-Process", productionProcessSchema);
module.exports = ProductionProcess;
