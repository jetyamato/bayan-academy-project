const Item = require("../models/Item");

async function paginateItems(page = 1, limit = 3, query = {}, sort = { createdAt: -1 }) {
  try {
    const options = {
      page,
      limit,
      sort,
    };

    return await Item.paginate(query, options);
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { paginateItems };
