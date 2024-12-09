const Item = require("../models/Item");

async function paginateItems(page = 1, limit = 3, query = {}) {
  try {
    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
    };

    return await Item.paginate(query, options);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { paginateItems };
