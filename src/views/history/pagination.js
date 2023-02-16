import { useState } from "react"

const usePagination = ({inArr}) => {
    const[currentPage, setCurrentPage] = useState(1)
    const [txPerPage] = useState(10)
    const lastTxId = currentPage * txPerPage
    const firstTxId = lastTxId - txPerPage
    const currentTx = inArr.slice(firstTxId, lastTxId)
    const pageNum = []
    for (let i=1; i <= Math.ceil(inArr.length/txPerPage); i++){
      pageNum.push(i)
    }
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    const pages = pageNum.map(page => <p onClick={() => paginate(page)} key={page} 
    >{page}</p>)
    const length = pageNum.length
    return {pages, currentTx, currentPage, setCurrentPage, length};
}
 
export default usePagination;