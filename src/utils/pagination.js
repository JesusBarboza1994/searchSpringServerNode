export default function pagination({itemsPerPage, page, items}){
  const totalItems = items.length
  const totalPages = Math.ceil(totalItems/itemsPerPage)
  const paginatedItems = items.slice((page-1)*itemsPerPage, page*itemsPerPage)
  return {
    paginatedItems,
    totalPages,
    totalItems,
  }
}