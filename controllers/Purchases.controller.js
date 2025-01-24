const { AssinedModel } = require("../models/Assined-to.model");
const { Purchase } = require("../models/Purchase");

class PurchaseController {
  async create(req, res) {
    const data = req.body;
    const newData = { ...data, user_id: req?.user._id };
    await Purchase.create(newData);
    return res.status(201).json({ message: "Purchase Order Gererated" });
  }

  async getAll(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const data = await Purchase.aggregate([
      { $match: {} },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user_id",
          pipeline: [
            {
              $lookup: {
                from: "user roles",
                localField: "role",
                foreignField: "_id",
                as: "role",
              },
            },
            {
              $project: {
                first_name: 1,
                last_name: 1,
                role: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer_id",
          pipeline: [
            {
              $project: {
                full_name: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product_id",
          pipeline: [
            {
              $lookup: {
                from: "production-processes",
                localField: "_id",
                foreignField: "item",
                as: "process",
                pipeline: [
                  {
                    $project: {
                      processes: 1,
                    },
                  },
                ],
              },
            },
            {
              $project: {
                name: 1,
                category: 1,
                item_type: 1,
                process: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "assineds",
          localField: "_id",
          foreignField: "sale_id",
          as: "assinedto",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "assined_to",
                foreignField: "_id",
                as: "assinedto",
                pipeline: [
                  {
                    $lookup: {
                      from: "user-roles",
                      localField: "role",
                      foreignField: "_id",
                      as: "role",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ])
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return res.status(200).json({ message: "all purchases order found", data });
  }

  async getOne(req, res) {
    const id = req.user._id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const data = await Purchase.aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user_id",
          pipeline: [
            {
              $lookup: {
                from: "user roles",
                localField: "role",
                foreignField: "_id",
                as: "role",
              },
            },
            {
              $project: {
                first_name: 1,
                last_name: 1,
                role: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customer_id",
          pipeline: [
            {
              $project: {
                full_name: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product_id",
          pipeline: [
            {
              $lookup: {
                from: "production-processes",
                localField: "_id",
                foreignField: "item",
                as: "process",
                pipeline: [
                  {
                    $project: {
                      processes: 1,
                    },
                  },
                ],
              },
            },
            {
              $project: {
                name: 1,
                category: 1,
                item_type: 1,
                process: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "assineds",
          localField: "_id",
          foreignField: "sale_id",
          as: "assinedto",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "assined_to",
                foreignField: "_id",
                as: "assinedto",
                pipeline: [
                  {
                    $lookup: {
                      from: "user-roles",
                      localField: "role",
                      foreignField: "_id",
                      as: "role",
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    ])
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    return res.status(200).json({ message: "data found by id", data });
  }

  async CustomerGet(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const data = await Purchase.aggregate([
      {
        $match: {
          customer_id: req?.user?._id,
        },
      },
      {
        $lookup: {
          from: "products",
          foreignField: "_id",
          localField: "product_id",
          as: "product_id",
          pipeline: [
            {
              $lookup: {
                from: "production-processes",
                foreignField: "item",
                localField: "_id",
                as: "process",
                pipeline: [
                  {
                    $project: {
                      processes: 1,
                    },
                  },
                ],
              },
            },
            {
              $project: {
                name: 1,
                process: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "assineds",
          localField: "_id",
          foreignField: "sale_id",
          as: "empprocess",
        },
      },
    ])
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
    return res.status(200).json({ message: "customer data found", data });
  }

  async update(req, res) {
    const data = req.body;
    const { id } = req.params;
    const find = await Purchase.findById(id);
    if (!find) {
      return res.status(400).json({ message: "data not found" });
    }
    await Purchase.findByIdAndUpdate(id, data);
    return res.status(201).json({ message: "Purchase Order updated" });
  }

  async Delete(req, res) {
    const { id } = req.params;
    const find = await Purchase.findById(id);
    if (!find) {
      return res.status(400).json({ message: "data not found" });
    }
    await Purchase.findByIdAndDelete(id);
    return res.status(201).json({ message: "Purchase Order deleted" });
  }

  async Imagehandler(req, res) {
    const { assined_to, assinedto_comment } = req.body;
    const { id } = req.params;
    const { filename } = req.file;
    const find = await Purchase.findById(id);
    if (!find) {
      return res.status(404).json({
        message: "data not found try again",
      });
    }

    const path = `https://inventorybackend.deepmart.shop/images/${filename}`;

    await Purchase.findByIdAndUpdate(id, { designFile: path });

    await AssinedModel.findByIdAndUpdate(assined_to, {
      isCompleted: "Completed",
      assinedto_comment,
    });
    return res.status(201).json({
      message: "file uploaded successful",
    });
  }

  async UpdateStatus(req, res) {
    const { Status } = req.body;
    const { id } = req.params;
    const find = await Purchase.findById(id);
    if (!find) {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    await Purchase.findByIdAndUpdate(id, { Status });
    return res.status(201).json({
      message: "Status Approved Successful",
    });
  }

  async updateDesignStatus(req, res) {
    const { customer_approve, customer_design_comment, assined_to } = req.body;
    const { id } = req.params;
    if (!customer_approve) {
      return res.status(400).json({
        message: "customer is required",
      });
    }

    const find = await Purchase.findById(id);
    if (!find) {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    await Purchase.findByIdAndUpdate(id, {
      customer_approve,
      customer_design_comment,
    });
    if (customer_approve !== "Approve") {
      await AssinedModel.findByIdAndUpdate(assined_to, {
        isCompleted: "Design Rejected",
      });
    }
    return res.status(201).json({
      message: "Status Approved Successful",
    });
  }

  async graphData(req, res) {
    try {
      const purchases = await Purchase.find(
        {},
        "price product_qty GST createdAt"
      );

      // Aggregate sales data by month
      const monthlySales = {};

      purchases.forEach((purchase) => {
        const month = new Date(purchase.createdAt).toLocaleString("default", {
          month: "long",
        });

        const totalSale = purchase.price * purchase.product_qty;

        const totalGST =
          (purchase.GST.CGST || 0) +
          (purchase.GST.SGST || 0) +
          (purchase.GST.IGST || 0);

        const totalSaleWithGST = totalSale + totalGST;

        if (!monthlySales[month]) {
          monthlySales[month] = 0;
        }

        monthlySales[month] += totalSaleWithGST;
      });

      const response = {
        months: Object.keys(monthlySales),
        sales: Object.values(monthlySales),
      };

      res.status(200).json(response);
    } catch (error) {
      console.error("Error calculating sales data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async All(req, res) {
    try {
      const totalSales = await Purchase.countDocuments();

      res.status(200).json({
        success: true,
        total: totalSales,
      });
    } catch (error) {
      console.error("Error fetching total customers:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching the total customers.",
      });
    }
  }

  async getNewestSales(req, res) {
    try {
      const limit = 1; // Fetch only the two newest sales
      const salesData = await Purchase.aggregate([
        { $sort: { createdAt: -1 } }, // Sort by creation date in descending order
        { $limit: limit }, // Limit the results to 2
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "product",
            pipeline: [
              {
                $lookup: {
                  from: "production-processes",
                  localField: "_id",
                  foreignField: "item",
                  as: "process",
                  pipeline: [
                    {
                      $project: {
                        processes: 1,
                      },
                    },
                  ],
                },
              },
              {
                $project: {
                  name: 1,
                  category: 1,
                  item_type: 1,
                  process: 1,
                },
              },
            ],
          },
        },
        {
          $project: {
            createdAt: 1,
            product: 1,
          },
        },
      ]);

      return res.status(200).json({
        success: true,
        message: "Newest sales data retrieved successfully",
        data: salesData,
      });
    } catch (error) {
      console.error("Error fetching newest sales data:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching sales data",
      });
    }
  }

  async uploadPDF(req, res) {
    const { filename } = req.file;
    const { id } = req.params;
    if (!filename) {
      return res.status(404).json({
        message: "file not found",
      });
    }

    const data = await Purchase.findById(id);
    if (!data) {
      return res.status(404).json({
        message: "data not found",
      });
    }
    const path = `https://inventorybackend.deepmart.shop/images/${filename}`;
    await Purchase.findByIdAndUpdate(id, {
      invoice: path,
      paymet_status: "Pending",
    });
    return res.status(200).json({
      message: "file uploaded successful",
    });
  }

  async uploadPaymentSS(req, res) {
    const { filename } = req.file;
    const { id } = req.params;

    if (!filename) {
      return res.status(404).json({
        message: "file not found",
      });
    }

    const data = await Purchase.findById(id);
    if (!data) {
      return res.status(404).json({
        message: "data not found",
      });
    }

    const path = `https://inventorybackend.deepmart.shop/images/${filename}`;
    await Purchase.findByIdAndUpdate(id, {
      customer_pyement_ss: path,
      paymet_status: "Paied",
      payment_verify: false,
    });
    return res.status(200).json({
      message: "file uploaded successful",
    });
  }

  async VerifyPayement(req, res) {
    const { id } = req.params;
    const { payment_verify } = req.body;

    const data = await Purchase.findById(id);
    if (!data) {
      return res.status(404).json({
        message: "data not found",
      });
    }
    await Purchase.findByIdAndUpdate(id, { payment_verify });
    return res.status(200).json({
      message: "Payment verified Successful",
    });
  }

  async Dispatch(req, res) {
    const { id } = req.params;
    const { tracking_id, tracking_web } = req.body;

    if (!tracking_web?.trim() || !tracking_id?.trim()) {
      return res.status(404).json({
        message: "Tracking Id and Tracking Website is required",
      });
    }

    const data = await Purchase.findById(id);
    if (!data) {
      return res.status(404).json({
        message: "data not found",
      });
    }
    await Purchase.findByIdAndUpdate(id, {
      tracking_id,
      tracking_web,
      product_status: "Dispatch",
    });
    return res.status(200).json({
      message: "Product Dispatch",
    });
  }

  async Delivered(req,res) {
    const { filename } = req.file;
    const { id } = req.params;

    if (!filename) {
      return res.status(404).json({
        message: "file not found",
      });
    }

    const data = await Purchase.findById(id);
    if (!data) {
      return res.status(404).json({
        message: "data not found",
      });
    }

    const path = `https://inventorybackend.deepmart.shop/images/${filename}`;
    await Purchase.findByIdAndUpdate(id, {
      customer_order_ss: path,
      product_status: "Delivered",
    });
    return res.status(200).json({
      message: "file uploaded successful",
    });
  }
}

exports.purchaseController = new PurchaseController();
