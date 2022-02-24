import React from 'react';

// buat props untuk lastPage dan pageChanged
// page => variable yang didapat dari component yang menggunakan paginator
// lastPage => variable yang didapat dari component yang menggunakan Paginator
// pageChanged => function yang dipanggil ketika ada perubahan page
// video 59
const Paginator = (props: {
    page: number,
    lastPage: number,
    pageChanged: (page: number) => void 
    }) => {

    const next = () => {
        if(props.page < props.lastPage) {
          props.pageChanged(props.page  + 1);
        }
      }

      const prev = () => {
        if(props.page >= 1) {
          props.pageChanged(props.page - 1);
        }
      }

    return (
        <nav>  
            <ul className="pagination">
                <li className="page-item">
                <a className="page-link" href="#" onClick={prev}>Previous</a>
                </li>
                <li className="page-item">
                <a className="page-link" href="#" onClick={next}>Next</a>
                </li>
            </ul>
        </nav>
    );
};

export default Paginator;