module.exports = async function (page, limit, model) {
  // Pagination
  const total = await model.countDocuments();
  const pagesCount = Math.ceil(total / limit);
  const start = (page - 1) * limit + 1;
  let end = start + limit - 1 || total;
  if (end > total) end = total;

  const pagination = { total, pagesCount, start, end, limit };

  if (page < pagesCount) pagination.nextPage = page + 1;
  if (page > 1) pagination.prevPage = page - 1;

  return pagination;
};
